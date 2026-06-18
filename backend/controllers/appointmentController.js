import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";
import { getIO } from "../config/socket.js";
/* ---------------- HELPERS ---------------- */

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};
const normalizeTime = (t) => {
  if (!t) return "";
  return t.length === 4 ? `0${t}` : t; // 9:00 → 09:00
};

const now = () => new Date();
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

    const appointmentDate = normalizeDate(date);
    const currentTime = now();

    // remove expired reservations (cleanup)
    await Appointment.deleteMany({
      status: "reserved",
      reservedUntil: { $lte: currentTime },
    });

    const booked = await Appointment.find({
      doctorId,
      workplaceId,
      appointmentDate,
      status: { $in: ["reserved", "confirmed"] },
      reservedUntil: { $gt: currentTime },
    });

    const bookedTimes = booked.map((b) => b.appointmentTime);

    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });

    const slots = workplace.slots?.[day] || [];

    const availableSlots = slots
      .filter((slot) => !bookedTimes.includes(slot.startTime))
      .map((slot) => ({ label: slot.startTime }));

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

    const appointmentDate = normalizeDate(date);
    const appointmentTime = normalizeTime(time);
    const currentTime = new Date();

    const existing = await Appointment.findOne({
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime,
      status: { $in: ["reserved", "confirmed"] },
      reservedUntil: { $gt: currentTime },
    });

    if (existing) {
      if (existing.patientId.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: "Already reserved" });
      }
      return res.status(400).json({ message: "Slot already taken" });
    }

    const reservation = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime,
      appointmentType,
      status: "reserved",
      reservedUntil: new Date(Date.now() + 10 * 60 * 1000),
    });

    return res.status(201).json({
      message: "Slot reserved successfully",
      reservation,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/* ---------------- CREATE APPOINTMENT ---------------- */
export const createAppointment = async (req, res) => {
  try {
    const { doctorId, workplaceId, date, time } = req.body;

    if (!doctorId || !workplaceId || !date || !time) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const appointmentDate = normalizeDate(date);
    const appointmentTime = normalizeTime(time);
    const currentTime = new Date();

    await Appointment.deleteMany({
      status: "reserved",
      reservedUntil: { $lte: currentTime },
    });

    const reservation = await Appointment.findOne({
      patientId: req.user._id,
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime,
      status: "reserved",
      reservedUntil: { $gt: currentTime },
    });

    if (!reservation) {
      return res.status(400).json({
        message: "Reservation expired or not found",
      });
    }

    reservation.status = "pending";
    reservation.reservedUntil = null;

    await reservation.save();

    return res.status(201).json({
      message: "Appointment is now pending approval",
      appointment: reservation,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
      .sort({ createdAt: -1 })
      .lean();

    const enriched = appointments.map((a) => {
      const doctor = a.doctorId;

      const workplace = doctor?.workplaces?.find(
        (w) => w._id.toString() === a.workplaceId?.toString()
      );

      return {
        ...a,
        workplace,
      };
    });

    return res.status(200).json({
      success: true,
      appointments: enriched,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
