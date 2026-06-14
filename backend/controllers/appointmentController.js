import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";

/* ---------------- HELPERS ---------------- */

// consistent time format: "HH:MM"
const normalizeTime = (t) => {
  if (!t) return "";

  const [h, m] = t.split(":");

  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
};

/* ---------------- GET AVAILABLE SLOTS ---------------- */

export const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, workplaceId, date } = req.query;

    if (!doctorId || !workplaceId || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const selectedDate = new Date(date + "T00:00:00Z");

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const workplace = doctor.workplaces.id(workplaceId);
    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }

    // clean expired reservations (IMPORTANT)
    await Appointment.deleteMany({
      status: "reserved",
      reservedUntil: { $lte: new Date() },
    });

    const start = new Date(selectedDate);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setUTCHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: { $gte: start, $lte: end },
      status: { $in: ["reserved", "confirmed"] },
      reservedUntil: { $gt: new Date() },
    });

    const bookedTimes = appointments.map((a) =>
      normalizeTime(a.appointmentTime),
    );

    const day = selectedDate.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });

    const availability = workplace.availability?.[day];

    if (!availability) return res.json([]);

    const [sh, sm] = availability.start.split(":").map(Number);
    const [eh, em] = availability.end.split(":").map(Number);

    const getDurationInMinutes = (settings) => {
      const d = settings?.appointmentDuration;
      if (!d) return 30;

      if (d.unit === "hours") return Number(d.value) * 60;

      return Number(d.value);
    };

    const duration = getDurationInMinutes(workplace.settings);

    let current = new Date(selectedDate);
    current.setUTCHours(sh, sm, 0, 0);

    const endTime = new Date(selectedDate);
    endTime.setUTCHours(eh, em, 0, 0);

    const slots = [];

    while (current.getTime() + duration * 60000 <= endTime.getTime()) {
      const slotStart = new Date(current);

      current.setMinutes(current.getMinutes() + duration);

      const label = `${slotStart
        .getHours()
        .toString()
        .padStart(2, "0")}:${slotStart
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      if (!bookedTimes.includes(label)) {
        slots.push({ label });
      }
    }

    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while fetching slots",
    });
  }
};
/* ---------------- RESERVE SLOT ---------------- */

export const reserveSlot = async (req, res) => {
  try {
    const { doctorId, workplaceId, date, time } = req.body;

    if (!doctorId || !workplaceId || !date || !time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const appointmentDate = new Date(date + "T00:00:00Z");

    // clean expired reservations first
    await Appointment.deleteMany({
      status: "reserved",
      reservedUntil: { $lte: new Date() },
    });

    const existing = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime: time,
      status: { $in: ["reserved", "confirmed"] },
      reservedUntil: { $gt: new Date() },
    });

    if (existing) {
      return res.status(400).json({
        message: "Slot already reserved",
      });
    }

    const reservation = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime: time,
      status: "reserved",
      reservedUntil: new Date(Date.now() + 10 * 60 * 1000),
    });

    res.json({
      message: "Slot reserved for 10 minutes",
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/* ---------------- CREATE APPOINTMENT ---------------- */

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, workplaceId, date, time } = req.body;

    if (!doctorId || !workplaceId || !date || !time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const appointmentDate = new Date(`${date}T00:00:00Z`);

    /* ---------------- RULE 1: ONE APPOINTMENT PER DOCTOR ---------------- */
    const existingDoctorBooking = await Appointment.findOne({
      patientId: req.user._id,
      doctorId,
      status: { $in: ["reserved", "confirmed"] },
    });

    if (existingDoctorBooking) {
      return res.status(400).json({
        message: "You already have an appointment with this doctor",
      });
    }

    /* ---------------- RULE 2: MAX 3 PER DAY ---------------- */
    const startOfDay = new Date(appointmentDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(appointmentDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const dailyCount = await Appointment.countDocuments({
      patientId: req.user._id,
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ["reserved", "confirmed"] },
    });

    if (dailyCount >= 3) {
      return res.status(400).json({
        message: "Daily limit reached (max 3 appointments per day)",
      });
    }

    /* ---------------- RULE 3: SLOT CHECK ---------------- */
    const existingSlot = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime: time,
      status: { $in: ["reserved", "confirmed"] },
      reservedUntil: { $gt: new Date() },
    });

    if (existingSlot) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    /* ---------------- CREATE APPOINTMENT ---------------- */
    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime: time,
      status: "confirmed",
    });

    /* ---------------- CLEAN RESERVED ---------------- */
    await Appointment.deleteMany({
      doctorId,
      appointmentDate,
      appointmentTime: time,
      status: "reserved",
      patientId: req.user._id,
    });

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);

    return res.status(500).json({
      message: error.message || "Server error while booking appointment",
    });
  }
};

/* ---------------- OTHER FUNCTIONS (UNCHANGED BUT SAFE) ---------------- */

export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "name email")
      .sort({ appointmentDate: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user._id,
    })
      .populate("doctorId", "name specialization")
      .sort({ appointmentDate: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json({ message: "Appointment cancelled", appointment });
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
