import Appointment from "../models/appointmentModel.js";
import Doctor from "../models/doctor/doctorModel.js";
import Patient from "../models/patientModel.js";
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
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    // Get doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }
    // Get selected workplace
    const workplace = doctor.workplaces.id(workplaceId);
    if (!workplace) {
      return res.status(404).json({
        message: "Workplace not found",
      });
    }
    const appointmentDate = normalizeDate(date);
    const currentTime = now();
    // Remove expired temporary reservations
    await Appointment.deleteMany({
      status: "reserved",
      reservedUntil: { $lte: currentTime },
    });
    // Get all active bookings for THIS doctor + THIS workplace + THIS date
    const booked = await Appointment.find({
      doctorId,
      workplaceId,
      appointmentDate,
      $or: [
        {
          status: "reserved",
          reservedUntil: { $gt: currentTime },
        },
        {
          status: {
            $in: ["pending", "confirmed"],
          },
        },
      ],
    });
    //  MAX PATIENTS PER DAY
    const maxPatientsPerDay = workplace.settings?.maxPatientsPerDay ?? 999;
    const bookedCount = booked.length;
    // If daily limit is already reached,
    // don't show any more slots.
    if (bookedCount >= maxPatientsPerDay) {
      return res.json([]);
    }
    const remainingCapacity = maxPatientsPerDay - bookedCount;
    // GET WORKPLACE SLOTS FOR SELECTED DAY
    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });
    const slots = workplace.slots?.[day] || [];
    // CHECK TODAY
    const today = normalizeDate(new Date());
    const isToday = appointmentDate.getTime() === today.getTime();
    // FILTER AVAILABLE SLOTS
    const availableSlots = slots
      .filter((slot) => {
        // Hide already-passed slots if selected date is today
        if (isToday) {
          const [hours, minutes] = slot.startTime.split(":").map(Number);
          const slotDateTime = new Date();
          slotDateTime.setHours(hours, minutes, 0, 0);
          if (slotDateTime <= currentTime) {
            return false;
          }
        }
        // Check whether this slot already has an appointment
        const appointment = booked.find(
          (a) => a.appointmentTime === slot.startTime,
        );
        // No booking → available
        if (!appointment) {
          return true;
        }
        // If this slot is temporarily reserved by current user,
        // keep it visible.
        if (
          appointment.status === "reserved" &&
          appointment.userId?.toString() === req.user?._id?.toString()
        ) {
          return true;
        }
        // Otherwise hide the slot
        return false;
      })
      // Only show slots within remaining daily capacity
      .slice(0, remainingCapacity)
      .map((slot) => {
        const appointment = booked.find(
          (a) => a.appointmentTime === slot.startTime,
        );
        return {
          label: slot.startTime,
          reservedByMe:
            appointment &&
            appointment.status === "reserved" &&
            appointment.userId?.toString() === req.user?._id?.toString(),
        };
      });
    return res.json(availableSlots);
  } catch (error) {
    console.error("Get Available Slots Error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
/* ---------------- RESERVE SLOT ---------------- */
export const reserveSlot = async (req, res) => {
  try {
    const { doctorId, workplaceId, date, time, consultationType } = req.body;

    if (!doctorId || !workplaceId || !date || !time || !consultationType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    const appointmentDate = normalizeDate(date);
    const appointmentTime = normalizeTime(time);
    const currentTime = new Date();
    await Appointment.deleteMany({
      status: "reserved",
      reservedUntil: { $lte: currentTime },
    });

    // Make sure user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    // Get doctor
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    // Get workplace
    const workplace = doctor.workplaces.id(workplaceId);

    if (!workplace) {
      return res.status(404).json({
        success: false,
        message: "Workplace not found.",
      });
    }
    const allowedConsultationType = workplace.settings?.consultationType;

    if (allowedConsultationType === "online" && consultationType !== "online") {
      return res.status(400).json({
        success: false,
        message: "This workplace only supports online appointments.",
      });
    }

    if (
      allowedConsultationType === "physical" &&
      consultationType !== "physical"
    ) {
      return res.status(400).json({
        success: false,
        message: "This workplace only supports physical appointments.",
      });
    }

    if (
      allowedConsultationType === "online_physical" &&
      !["online", "physical"].includes(consultationType)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid consultation type.",
      });
    }
    // Get patient profile
    const patient = await Patient.findOne({
      userId: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Please complete your patient profile first.",
      });
    }
    // Check if this patient already has an appointment with this doctor on this date
    const existingAppointment = await Appointment.findOne({
      patientId: patient._id,
      doctorId,
      appointmentDate,
      status: {
        $in: ["pending", "confirmed"],
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message:
          "You already have an appointment with this doctor on this date.",
      });
    }
    // Appointment duration
    const durationObj = workplace.settings?.appointmentDuration;

    let durationInMinutes = 30;

    if (durationObj) {
      durationInMinutes =
        durationObj.unit === "hours"
          ? durationObj.value * 60
          : durationObj.value;
    }

    const [hours, minutes] = appointmentTime.split(":").map(Number);

    const endDate = new Date();
    endDate.setHours(hours, minutes, 0, 0);
    endDate.setMinutes(endDate.getMinutes() + durationInMinutes);

    const endTime = endDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const existing = await Appointment.findOne({
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime,
      $or: [
        {
          status: "reserved",
          reservedUntil: { $gt: currentTime },
        },
        {
          status: { $in: ["pending", "confirmed"] },
        },
      ],
    });
    if (existing && !existing.patientId.equals(patient._id)) {
      return res.status(400).json({
        success: false,
        message: "This slot has already been reserved.",
      });
    }
    const previousReservation = await Appointment.findOne({
      patientId: patient._id,
      status: "reserved",
      reservedUntil: { $gt: currentTime },
    });
    if (previousReservation) {
      previousReservation.userId = req.user._id;
      previousReservation.doctorId = doctorId;
      previousReservation.workplaceId = workplaceId;
      previousReservation.appointmentDate = appointmentDate;
      previousReservation.appointmentTime = appointmentTime;
      previousReservation.endTime = endTime;
      previousReservation.consultationType = consultationType;
      previousReservation.reservedUntil = new Date(Date.now() + 10 * 60 * 1000);

      await previousReservation.save();
      const io = getIO();

      io.emit("slot-updated", {
        doctorId,
        workplaceId,
        date,
      });
      return res.status(200).json({
        success: true,
        message: "Slot updated successfully.",
        reservation: previousReservation,
      });
    }
    const reservation = await Appointment.create({
      userId: req.user._id,
      patientId: patient._id,
      doctorId,
      workplaceId,
      appointmentDate,
      appointmentTime,
      endTime,
      consultationType,
      status: "reserved",
      reservedUntil: new Date(Date.now() + 10 * 60 * 1000),
    });
    const io = getIO();

    io.emit("slot-updated", {
      doctorId,
      workplaceId,
      date,
    });
    return res.status(201).json({
      success: true,
      message: "Slot reserved successfully.",
      reservation,
    });
  } catch (error) {
    console.error("Reserve Slot Error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This slot has already been reserved.",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
    const patient = await Patient.findOne({
      userId: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient profile not found",
      });
    }
    const existingAppointment = await Appointment.findOne({
      patientId: patient._id,
      doctorId,
      appointmentDate,
      status: {
        $in: ["pending", "confirmed"],
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message:
          "You already have an appointment with this doctor on this date.",
      });
    }
    const reservation = await Appointment.findOne({
      userId: req.user._id,
      patientId: patient._id,
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
    const io = getIO();

    io.emit("slot-updated", {
      doctorId: reservation.doctorId.toString(),
      workplaceId: reservation.workplaceId.toString(),
      date: reservation.appointmentDate,
    });

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
        populate: {
          path: "userId",
          select: "name email phone avatar",
        },
      })
      .sort({ appointmentDate: -1 })
      .lean();

    // Add workplace details
    const enrichedAppointments = appointments.map((appointment) => {
      const workplace = doctor.workplaces.find(
        (w) => w._id.toString() === appointment.workplaceId?.toString(),
      );

      return {
        ...appointment,
        workplaceName: workplace?.name || "Unknown Workplace",
        workplaceLocation: workplace?.location || "",
      };
    });

    return res.status(200).json(enrichedAppointments);
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
    const patient = await Patient.findOne({
      userId: req.user._id,
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient profile not found",
      });
    }

    const appointments = await Appointment.find({
      userId: req.user._id,
      patientId: patient._id,
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
        (w) => w._id.toString() === a.workplaceId?.toString(),
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
// ----------------- confirm + completed
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    appointment.status = status;
    await appointment.save();

    // SOCKET EMIT ADD HERE
    const io = req.app.get("io");

    io.emit("slot-updated", appointment); // IMPORTANT

    return res.json({
      message: "Status updated successfully",
      appointment,
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

    // ADD THIS BLOCK HERE (VERY IMPORTANT)
    const user = req.user;

    if (user.role === "patient") {
      const appointmentDateTime = new Date(
        `${appointment.appointmentDate} ${appointment.appointmentTime}`,
      );

      const diffMs = appointmentDateTime - new Date();

      if (diffMs < 60 * 60 * 1000) {
        return res.status(400).json({
          message: "You can only cancel at least 1 hour before appointment",
        });
      }

      if (appointment.userId.toString() !== user._id.toString()) {
        return res.status(403).json({
          message: "Not allowed",
        });
      }
    }
    // update appointment status
    appointment.status = "cancelled";
    appointment.cancelledAt = new Date();
    await appointment.save();

    // FREE SLOT AGAIN
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

    req.io.emit("slot-updated", {
      doctorId: appointment.doctorId,
      workplaceId: appointment.workplaceId,
      date: appointment.appointmentDate,
    });

    return res.json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("doctorId")
      .populate("patientId")
      .populate("userId");

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getDoctorPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    // console.log("Patient ID:", patientId);
    // console.log("User ID:", req.user._id);

    const doctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    // console.log("Doctor ID:", doctor._id);

    const appointments = await Appointment.find({
      doctorId: doctor._id,
      patientId: patientId,
    })
      .populate("patientId")
      .sort({
        appointmentDate: -1,
        appointmentTime: -1,
      })
      .lean();

    // console.log("Appointments Found:", appointments.length);
    // console.log(appointments);

    const enrichedAppointments = appointments.map((appointment) => {
      const workplace = doctor.workplaces.find(
        (w) => w._id.toString() === appointment.workplaceId?.toString(),
      );

      return {
        ...appointment,
        workplaceName: workplace?.name || "Unknown Workplace",
        workplaceLocation: workplace?.location || "",
      };
    });

    return res.status(200).json(enrichedAppointments);
  } catch (error) {
    // console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
