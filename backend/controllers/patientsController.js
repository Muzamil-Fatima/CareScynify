import Patient from "../models/patientModel.js";
import User from "../models/user.js";
// get patient profile
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.userId }).populate(
      "userId",
      "name email avatar",
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json({
      name: patient.userId.name,
      email: patient.userId.email,
      avatar: patient.userId.avatar,
      age: patient.age,
      phone: patient.phone,
      address: patient.address,
      allergies: patient.address,
      allergies: patient.allergies || [],
      medications: patient.medications || [],
      emergencyContact: patient.emergencyContact || {},
      status: patient.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update Patient Profile
export const updatePatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.userId });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    // only update patient-specific fields
    const updates = req.body;
    const allowedFields = [
      "age",
      "phone",
      "address",
      "allergies",
      "medications",
      "emergencyContact",
      "status",
    ];
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) {
        patient[field] = updates[field];
      }
    });
    await patient.save();
    // return Update profile with user info
    const populatedPatient = await patient.populate(
      "userId",
      "name email avatar",
    );
    res.json({
      name: populatedPatient.userId.name,
      email: populatedPatient.userId.email,
      avatar: populatedPatient.userId.avatar,
      age: populatedPatient.age,
      phone: populatedPatient.phone,
      address: populatedPatient.address,
      allergies: populatedPatient.allergies || [],
      medications: populatedPatient.medications || [],
      emergencyContact: populatedPatient.emergencyContact || {},
      status: populatedPatient.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).populate(
      "userId",
      "name email avatar"
    );
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};