import Patient from "../models/patientModel.js";
import User from "../models/user.js";

// GET PATIENT PROFILE
export const getPatientProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "name email avatar phone",
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
      },
      patient: patient || {
        patientId: null,
        dob: "",
        cnic: "",
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

    let patient = await Patient.findOne({ userId });
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!patient) {
      patient = new Patient({ userId });
    }

    // FILE (AVATAR FROM MULTER)
    const file = req.file;

    const {
      // USER FIELDS
      name,
      email,
      phone,

      // PATIENT FIELDS
      dob,
      cnic,
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

    // UPDATE USER MODEL
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;

    //  AVATAR HANDLING
    if (file) {
      user.avatar = file.path;
    }

    // UPDATE PATIENT MODEL
    if (dob !== undefined) patient.dob = dob;
    if (cnic !== undefined) patient.cnic = cnic;
    if (gender !== undefined) patient.gender = gender;
    if (bloodGroup !== undefined) patient.bloodGroup = bloodGroup;
    if (address !== undefined) patient.address = address;
    if (allergies !== undefined) patient.allergies = allergies;
    if (medications !== undefined) patient.medications = medications;

    if (medicalHistory !== undefined) {
      patient.medicalHistory = {
        ...patient.medicalHistory,
        ...medicalHistory,
      };
    }

    if (emergencyContact !== undefined) {
      patient.emergencyContact = {
        ...patient.emergencyContact,
        ...emergencyContact,
      };
    }

    if (chronicDiseases !== undefined)
      patient.chronicDiseases = chronicDiseases;

    if (notes !== undefined) patient.notes = notes;
    if (status !== undefined) patient.status = status;

    await user.save();
    await patient.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
