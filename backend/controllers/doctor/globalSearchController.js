// controllers/doctor/globalSearchController.js

import Patient from "../../models/patient/patientModel.js";
import Appointment from "../../models/appointmentModel.js";
import Doctor from "../../models/doctor/doctorModel.js";

export const globalSearch = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || !query.trim()) {
      return res.status(200).json({
        success: true,
        results: [],
      });
    }

    const search = query.trim();
    const regex = new RegExp(search, "i");

    const doctor = await Doctor.findOne({
      userId: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    // Search patients associated with this doctor
    const patients = await Patient.find({
      $or: [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
        { phone: regex },
      ],
    })
      .select("firstName lastName email phone profileImage")
      .limit(10);

    // Search appointments of this doctor
    const appointments = await Appointment.find({
      doctorId: doctor._id,
      $or: [
        { appointmentId: regex },
        { status: regex },
      ],
    })
      .populate("patientId", "firstName lastName profileImage")
      .limit(10);

    const results = [
      ...patients.map((patient) => ({
        id: patient._id,
        type: "patient",
        name: `${patient.firstName || ""} ${patient.lastName || ""}`.trim(),
        subtitle: patient.email || patient.phone || "Patient",
        image: patient.profileImage || null,
      })),

      ...appointments.map((appointment) => ({
        id: appointment._id,
        type: "appointment",
        name:
          appointment.patientId?.firstName ||
          "Appointment",
        subtitle: appointment.status || "Appointment",
        image: appointment.patientId?.profileImage || null,
      })),
    ];

    return res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Doctor Global Search Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while searching",
      error: error.message,
    });
  }
};