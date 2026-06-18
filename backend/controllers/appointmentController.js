import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";
import { getIO } from "../config/socket.js";
/* ---------------- HELPERS ---------------- */

// consistent time format: "HH:MM"
const normalizeTime = (t) => {
  if (!t) return "";

  // Case 1: already 24-hour
  if (!t.toLowerCase().includes("am") && !t.toLowerCase().includes("pm")) {
    const [h, m] = t.split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  }

  // Case 2: AM/PM format → convert to 24h
  let [time, modifier] = t.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  modifier = modifier.toLowerCase();

  if (modifier === "pm" && hours !== 12) {
    hours += 12;
  }

  if (modifier === "am" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

/* ---------------- GET AVAILABLE SLOTS ---------------- */

export const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, workplaceId, date } = req.query;

    if (!doctorId || !workplaceId || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const workplace = doctor.workplaces.id(workplaceId);
    if (!workplace)
      return res.status(404).json({ message: "Workplace not found" });

    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });

    const daySlots = workplace.slots?.[day] || [];

    // 🔥 ONLY RETURN NOT BOOKED SLOTS
    const availableSlots = daySlots
      .filter((slot) => slot.isBooked === false)
      .map((slot) => ({
        label: slot.startTime,
      }));

    return res.json(availableSlots);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/* ---------------- RESERVE SLOT ---------------- */
export const reserveSlot = async (req, res) => {
  try {
    const { doctorId, workplaceId, date, time, appointmentType } = req.body;

    if (!doctorId || !workplaceId || !date || !time || !appointmentType) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const appointmentDate = new Date(`${date}T00:00:00Z`);

    const now = new Date();

    //  STEP 1: cleanup expired reservations first
    await Appointment.deleteMany({
      status: "reserved",
      reservedUntil: { $lte: now },
    });

    //  STEP 2: ensure ONLY ONE active reservation per user
    await Appointment.deleteMany({
      patientId: req.user._id,
      status: "reserved",
      reservedUntil: { $gt: now },
    });

    // STEP 3: check if slot is already taken (reserved/confirmed)
    const existing = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime: time,
      $or: [
        { status: "confirmed" },
        { status: "reserved", reservedUntil: { $gt: now } },
      ],
    });

    if (existing) {
      return res.status(400).json({ message: "Slot already reserved" });
    }

    //  STEP 4: create reservation (10 min hold)
    const reservation = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime: time,
      appointmentType,
      status: "reserved",
      reservedUntil: new Date(Date.now() + 10 * 60 * 1000),
    });

    return res.status(201).json({
      message: "Slot reserved successfully",
      reservation,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
/* ---------------- CREATE APPOINTMENT ---------------- */
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, workplaceId, date, time, appointmentType } = req.body;

    if (!doctorId || !workplaceId || !date || !time || !appointmentType) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const appointmentDate = new Date(`${date}T00:00:00Z`);

    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });

    // 🔥 STEP 1: BLOCK USER DOUBLE CONFIRMED BOOKINGS (MAIN FIX)
    const userExisting = await Appointment.findOne({
      patientId: req.user._id,
      status: "confirmed",
    });

    if (userExisting) {
      return res.status(400).json({
        message: "You already have an active appointment",
      });
    }

    // 🔥 STEP 2: CHECK SLOT AVAILABILITY (DOCTOR SIDE)
    const existingSlot = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime: time,
      $or: [
        { status: "confirmed" },
        { status: "reserved", reservedUntil: { $gt: new Date() } },
      ],
    });

    if (existingSlot) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    //  STEP 3: CREATE APPOINTMENT
    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime: time,
      appointmentType,
      status: "confirmed",
    });

    //  STEP 4: UPDATE DOCTOR SLOT
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const workplace = doctor.workplaces.id(workplaceId);

    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }

    const slots = workplace.slots?.[day] || [];

    const slotIndex = slots.findIndex(
      (slot) => slot.startTime.trim() === time.trim(),
    );

    if (slotIndex !== -1) {
      workplace.slots[day][slotIndex].isBooked = true;
      doctor.markModified("workplaces");
      await doctor.save();
    }

    // socket emit
    const io = getIO();
    io.to(doctorId.toString()).emit("slot-updated", {
      doctorId,
      workplaceId,
      date,
      time,
    });

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
/*-------------------- Doctor Get all appointment with patients -------------*/
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    const appointments = await Appointment.find({
      doctorId: doctor._id,
    })
      .populate({
        path: "patientId",
        select: "name email phone avatar",
      })
      .sort({ appointmentDate: -1 })
      .lean();

    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
/* ---------------- get user appointments in website  ---------------- */
export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user._id,
    })
      .populate({
        path: "doctorId",
        select: "specialization userId workplaces",
        populate: {
          path: "userId",
          select: "name avatar",
        },
      })
      .lean(); // important

    const enriched = appointments.map((a) => {
      const doctor = a.doctorId;

      const workplace = doctor?.workplaces?.find(
        (w) => w._id.toString() === a.workplaceId?.toString(),
      );

      return {
        ...a,
        workplace, // 🔥 now frontend can use it easily
      };
    });

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* ---------------- CANCEL APPOINTMENT ---------------- */
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    // ❌ update appointment status
    appointment.status = "cancelled";
    appointment.cancelledAt = new Date();
    await appointment.save();

    // 🔥 FREE SLOT AGAIN
    const doctor = await Doctor.findById(appointment.doctorId);
    const workplace = doctor.workplaces.id(appointment.workplaceId);

    const day = new Date(appointment.appointmentDate).toLocaleDateString(
      "en-US",
      { weekday: "short", timeZone: "UTC" },
    );

    const slots = workplace.slots?.[day] || [];

    const slotIndex = slots.findIndex(
      (s) => s.startTime === appointment.appointmentTime,
    );

    if (slotIndex !== -1) {
      workplace.slots[day][slotIndex].isBooked = false;
    }

    await doctor.save();

    // ⚡ SOCKET EMIT (REAL-TIME UPDATE)
    const io = getIO();

    io.to(appointment.doctorId.toString()).emit("slot-updated", {
      doctorId: appointment.doctorId,
      workplaceId: appointment.workplaceId,
      date: appointment.appointmentDate,
      time: appointment.appointmentTime,
      action: "cancelled",
    });

    return res.json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("doctorId")
      .populate("patientId");

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const allowed = ["pending", "confirmed", "cancelled", "completed"];

    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );

    res.json({ message: "Status updated", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
