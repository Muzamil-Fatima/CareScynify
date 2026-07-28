import Patient from "../../models/patientModel.js";
import Laboratory from "../../models/laboratory/labModel.js";
import LabPatient from "../../models/laboratory/labAddPatient.js";
import LabTest from "../../models/laboratory/LabTest.js";

// Add Patient
export const addPatient = async (req, res) => {
  try {
    const { patientId, name, mobile, age, gender, testId, notes } = req.body;

    if (!testId) {
      return res.status(400).json({
        success: false,
        message: "Test is required.",
      });
    }

    if (!patientId && (!name || !mobile || !age || !gender)) {
      return res.status(400).json({
        success: false,
        message:
          "Provide either a registered patient or complete patient details.",
      });
    }

    const laboratory = await Laboratory.findOne({
      userId: req.user._id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found.",
      });
    }

    const test = await LabTest.findById(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Lab Test not found.",
      });
    }

    let patientData;

    // Registered Patient
    if (patientId) {
      const patient = await Patient.findById(patientId).populate(
        "userId",
        "name phone dob",
      );

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found.",
        });
      }

      patientData = {
        patientId: patient._id,
        name: patient.userId?.name || "",
        mobile: patient.userId?.phone || "",
        age: patient.userId?.dob
          ? new Date().getFullYear() -
            new Date(patient.userId.dob).getFullYear()
          : age,
        gender: patient.gender,
      };
    } else {
      // Walk-in Patient — create a Patient record too, so it gets a patientCode
      const newPatient = await Patient.create({
        userId: null,
        gender: gender?.toLowerCase() || "other",
      });

      patientData = {
        patientId: newPatient._id,
        name,
        mobile,
        age,
        gender,
      };
    }

    const alreadyExists = await LabPatient.findOne({
      laboratoryId: laboratory._id,
      mobile: patientData.mobile,
      testId,
    });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Patient already registered for this test.",
      });
    }

    const labPatient = await LabPatient.create({
      laboratoryId: laboratory._id,
      patientId: patientData.patientId,
      name: patientData.name,
      mobile: patientData.mobile,
      age: patientData.age,
      gender: patientData.gender,
      testId,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Patient added successfully.",
      patient: labPatient,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Laboratory Patients
export const getPatients = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user._id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found.",
      });
    }

    const patients = await LabPatient.find({
      laboratoryId: laboratory._id,
    })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email phone dob",
        },
      })
      .populate("testId", "name price category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      patients,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Patient
export const updatePatient = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user._id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found.",
      });
    }

    const patient = await LabPatient.findOneAndUpdate(
      {
        _id: req.params.id,
        laboratoryId: laboratory._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email phone dob",
        },
      })
      .populate("testId", "name price category");

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
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Patient
export const deletePatient = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user._id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found.",
      });
    }

    const patient = await LabPatient.findOneAndDelete({
      _id: req.params.id,
      laboratoryId: laboratory._id,
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
