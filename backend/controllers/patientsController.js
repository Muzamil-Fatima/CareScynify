import Patient from "../models/patientModel.js";
import User from "../models/user.js";
// get patient profile
export const getPatientProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "name email avatar dob phone address",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patient = await Patient.findOne({ userId: req.user._id });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        address: user.address,
        dob: user.dob,
      },

      patient: patient
        ? {
            patientId: patient._id,
            allergies: patient.allergies,
            medications: patient.medications,
            emergencyContact: patient.emergencyContact,
            medicalHistory: patient.medicalHistory,
            status: patient.status,
          }
        : {
            patientId: null,
            allergies: [],
            medications: [],
            emergencyContact: {},
            medicalHistory: {},
            status: null,
          },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update Patient Profile
// export const updatePatientProfile = async (req, res) => {
//   try {
//     // not only update improving performance
//     const patient = await Patient.findOne({ userId: req.user._id });
//     const user = await User.findById(req.user._id);

//     if (!patient || !user)
//       return res.status(404).json({ message: "User/Patient not found" });

//     const updates = req.body;
//     //  UPDATE USER FIELDS
//     const userFields = ["name", "email", "phone", "address", "avatar"];
//     userFields.forEach((field) => {
//       if (updates[field] !== undefined) {
//         user[field] = updates[field];
//       }
//     });
//     // UPDATE PATIENT FIELDS

//     const patientFields = [
//       "age",
//       "allergies",
//       "medications",
//       "emergencyContact",
//       "status",
//       "medicalHistory",
//     ];

//     patientFields.forEach((field) => {
//       if (updates[field] !== undefined) {
//         patient[field] = updates[field];
//       }
//     });

//     await user.save();
//     await patient.save();

//     const populated = await Patient.findById(patient._id).populate(
//       "userId",
//       "name email avatar dob phone address",
//     );

//     res.json({
//       profile: {
//         name: populated.userId.name,
//         email: populated.userId.email,
//         avatar: populated.userId.avatar,
//         dob: populated.userId.dob,
//         phone: populated.userId.phone,
//         address: populated.userId.address,

//         allergies: populated.allergies,
//         medications: populated.medications,
//         emergencyContact: populated.emergencyContact,
//         medicalHistory: populated.medicalHistory,
//         status: populated.status,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
export const updatePatientProfile = async (req, res) => {
  try {
    let patient = await Patient.findOne({ userId: req.user._id });
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // CREATE IF NOT EXISTS
    if (!patient) {
      patient = new Patient({
        userId: req.user._id,
        allergies: [],
        medications: [],
        emergencyContact: {},
        medicalHistory: {},
        status: "active",
      });
    }

    const updates = req.body;

    // UPDATE USER
    const userFields = ["name", "email", "phone", "address", "avatar"];
    userFields.forEach((field) => {
      if (updates[field] !== undefined) {
        user[field] = updates[field];
      }
    });

    // UPDATE PATIENT
    const patientFields = [
      "age",
      "allergies",
      "medications",
      "emergencyContact",
      "status",
      "medicalHistory",
    ];

    patientFields.forEach((field) => {
      if (updates[field] !== undefined) {
        patient[field] = updates[field];
      }
    });

    await user.save();
    await patient.save();

    const populated = await Patient.findById(patient._id).populate(
      "userId",
      "name email avatar dob phone address",
    );

    return res.json({
      profile: {
        name: populated.userId.name,
        email: populated.userId.email,
        avatar: populated.userId.avatar,
        dob: populated.userId.dob,
        phone: populated.userId.phone,
        address: populated.userId.address,
        allergies: populated.allergies,
        medications: populated.medications,
        emergencyContact: populated.emergencyContact,
        medicalHistory: populated.medicalHistory,
        status: populated.status,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).populate(
      "userId",
      "name email avatar",
    );
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
