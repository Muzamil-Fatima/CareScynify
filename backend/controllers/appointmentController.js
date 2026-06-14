import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";

/* ---------------- GET AVAILABLE SLOTS ---------------- */
export const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, workplaceId, date } = req.query;

    const doctor = await Doctor.findById(doctorId);
    const workplace = doctor.workplaces.id(workplaceId);

    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });

    const availability = workplace.availability[day];

    if (!availability) return res.json([]);

    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: new Date(date),
      status: { $ne: "cancelled" },
    });

    const booked = appointments.map((a) => a.appointmentTime);

    const slots = [];
    let [sh, sm] = availability.start.split(":").map(Number);
    let [eh, em] = availability.end.split(":").map(Number);

    const duration = workplace.settings?.appointmentDuration?.value || 30;

    const current = new Date();
    current.setHours(sh, sm, 0, 0);

    const end = new Date();
    end.setHours(eh, em, 0, 0);

    while (current < end) {
      const slotStart = new Date(current);
      current.setMinutes(current.getMinutes() + duration);

      const label = slotStart.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      if (!booked.includes(label)) {
        slots.push({ label });
      }
    }

    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const reserveSlot = async (req, res) => {
  try {
    const { doctorId, workplaceId, date, time } = req.body;

    const existing = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(date),
      appointmentTime: time,
      status: { $in: ["reserved", "confirmed"] },
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
      appointmentDate: new Date(date),
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

    const appointmentDate = new Date(date);

    // 🔥 CHECK EXISTING SLOT (correct fields)
    const existing = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime: time,
      status: { $in: ["reserved", "confirmed"] },
    });

    if (existing) {
      return res.status(400).json({
        message: "Slot already booked",
      });
    }

    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime: time,
      status: "confirmed",
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET DOCTOR APPOINTMENTS ---------------- */
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

/* ---------------- GET USER APPOINTMENTS ---------------- */
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

/* ---------------- GET SINGLE APPOINTMENT ---------------- */
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

/* ---------------- UPDATE STATUS ---------------- */
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      message: "Status updated",
      appointment,
    });
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

    if (appointment.status === "cancelled") {
      return res.status(400).json({
        message: "Already cancelled",
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.json({
      message: "Appointment cancelled",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- DELETE APPOINTMENT ---------------- */
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
