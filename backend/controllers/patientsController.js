import mongoose from "mongoose";
import Patient from "../models/patientModel.js";
import User from "../models/user.js";
import Report from "../models/reportModel.js";
// GET PATIENT PROFILE
export const getPatientProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "name email avatar phone cnic dob",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findOne({
      userId: req.user._id,
    });

    return res.json({
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        cnic: user.cnic,
        dob: user.dob,
      },
      patient: patient || {
        patientId: null,
        gender: "",
        bloodGroup: "",
        address: "",
        allergies: [],
        medications: [],
        medicalHistory: {},
        emergencyContact: {},
        chronicDiseases: [],
        notes: "",
        status: "active",
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  UPDATE PATIENT + USER PROFILE
export const updatePatientProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let patient = await Patient.findOne({ userId });

    if (!patient) {
      patient = new Patient({ userId });
    }

    const {
      // USER
      name,
      email,
      phone,
      dob,
      cnic,
      // PATIENT

      gender,
      bloodGroup,
      address,
      allergies,
      medications,
      medicalHistory,
      emergencyContact,
      chronicDiseases,
      notes,
      status,
    } = req.body;

    // Avatar (if using multer)
    if (req.file) {
      user.avatar = req.file.path;
    }

    // ---------------- USER ----------------
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (dob !== undefined) user.dob = dob;
    if (cnic !== undefined) user.cnic = cnic;
    // ---------------- PATIENT ----------------
    if (gender !== undefined && gender !== "") {
      patient.gender = gender;
    }

    if (bloodGroup !== undefined && bloodGroup !== "") {
      patient.bloodGroup = bloodGroup;
    }
    if (address !== undefined) patient.address = address;

    if (allergies !== undefined) {
      patient.allergies = allergies;
    }

    if (medications !== undefined) {
      patient.medications = medications;
    }

    if (medicalHistory !== undefined) {
      patient.medicalHistory = {
        ...(patient.medicalHistory || {}),
        ...(medicalHistory || {}),
      };
    }

    if (emergencyContact !== undefined) {
      patient.emergencyContact = {
        ...(patient.emergencyContact || {}),
        ...(emergencyContact || {}),
      };
    }

    if (chronicDiseases !== undefined) {
      patient.chronicDiseases = chronicDiseases;
    }

    if (notes !== undefined) {
      patient.notes = notes;
    }

    if (status !== undefined && status !== null) {
      patient.status = status;
    }

    await user.save();
    await patient.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
      patient,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PATIENTS
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).populate(
      "userId",
      "name email avatar phone",
    );

    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET PATIENT PROFILE BY ID (Doctor/Admin)
// GET PATIENT PROFILE BY ID (Doctor/Admin)
export const getPatientById = async (req, res) => {
  try {
    const { patientId } = req.params;

    // console.log("Request Params:", req.params);
    // console.log("Patient ID:", patientId);

    // Check if ID exists
    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required.",
      });
    }

    // Check if ObjectId is valid
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Patient ID.",
      });
    }

    // Find patient
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found.",
      });
    }

    // Find user
    const user = await User.findById(patient.userId).select(
      "name email avatar phone cnic dob"
    );

    // Find reports
    const reports = await Report.find({
      userId: patient.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      user,
      patient,
      reports,
    });
  } catch (error) {
    console.error("getPatientById Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
