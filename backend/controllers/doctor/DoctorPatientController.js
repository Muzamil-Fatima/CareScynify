import DoctorPatient from "../../models/doctor/doctorAddPatientModel.js";
import Doctor from "../../models/doctor/doctorModel.js";
import User from "../../models/user.js";
import Patient from "../../models/patientModel.js";
import Appointment from "../../models/appointmentModel.js";
// Add Doctor Patient
export const addDoctorPatient = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      userId: req.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const { name, phone, gender, dob, address, notes } = req.body;

    const cleanPhone = phone?.trim();

    if (!name || !cleanPhone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required.",
      });
    }

    // Find existing user by phone
    let user = await User.findOne({
      phone: cleanPhone,
    });

    // Create user if doesn't exist
    if (!user) {
      user = await User.create({
        name,
        phone: cleanPhone,
        email: `${cleanPhone}@patient.com`,
        password: `${cleanPhone.slice(-4)}Patient@123`,
        role: "patient",
        createdByDoctor: true,
        isProfileCompleted: false,
      });
    }

    // Find patient profile
    let patientProfile = await Patient.findOne({
      userId: user._id,
    });

    // Create patient profile if doesn't exist
    if (!patientProfile) {
      patientProfile = await Patient.create({
        userId: user._id,
        gender: gender || "other",
        dob: dob || null,
        address: address || "",
        notes: notes || "",
      });
    }

    // Check whether THIS doctor already added this patient
    const existingDoctorPatient = await DoctorPatient.findOne({
      doctorId: doctor._id,
      patientId: patientProfile._id,
    });

    if (existingDoctorPatient) {
      return res.status(400).json({
        success: false,
        message: "Patient already added.",
      });
    }

    // Create doctor-patient relationship
    const doctorPatient = await DoctorPatient.create({
      doctorId: doctor._id,
      patientId: patientProfile._id,
      notes: notes || "",
      createdByDoctor: true,
    });

    return res.status(201).json({
      success: true,
      message: "Patient added successfully.",
      patient: {
        _id: patientProfile._id,
        patientCode: patientProfile.patientCode,
        doctorPatientId: doctorPatient._id,
        userId: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        avatar: user.avatar?.url || "",
      },
    });
  } catch (error) {
    console.error("Add Doctor Patient Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get patients who booked an appointment with this doctor
export const getDoctorPatient = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      userId: req.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const appointments = await Appointment.find({
      doctorId: doctor._id,
    })
      .populate({
        path: "patientId",
        select: "patientCode userId gender dob address notes status",
        populate: {
          path: "userId",
          select: "name email phone avatar dob cnic",
        },
      })
      .sort({ createdAt: -1 });

    // Remove duplicate patients if they booked multiple appointments
    const uniquePatients = Array.from(
      new Map(
        appointments
          .filter((appointment) => appointment.patientId)
          .map((appointment) => [
            appointment.patientId._id.toString(),
            appointment.patientId,
          ]),
      ).values(),
    );

    return res.status(200).json({
      success: true,
      patients: uniquePatients,
    });
  } catch (error) {
    console.error("getDoctorPatient Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Doctor Patient
export const updateDoctorPatient = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.userId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const doctorId = doctor._id;
    const patient = await DoctorPatient.findOneAndUpdate(
      {
        _id: req.params.id,
        doctorId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully.",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getManualDoctorPatients = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      userId: req.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const patients = await DoctorPatient.find({
      doctorId: doctor._id,
      createdByDoctor: true,
    })
      .populate({
        path: "patientId",
        select: "patientCode userId gender dob address notes status",
        populate: {
          path: "userId",
          select: "name email phone avatar dob cnic",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      patients,
    });
  } catch (error) {
    console.error("getManualDoctorPatients Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Doctor Patient
export const deleteDoctorPatient = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.userId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const doctorId = doctor._id;
    const patient = await DoctorPatient.findOneAndDelete({
      _id: req.params.id,
      doctorId,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
