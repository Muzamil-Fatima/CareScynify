import Laboratory from "../../models/laboratory/labModel.js";
import LabPatient from "../../models/laboratory/labAddPatient.js";
import LabSample from "../../models/laboratory/LabSample.js";
import LabTest from "../../models/laboratory/LabTest.js";
import Patient from "../../models/patientModel.js";

export const bookLabSample = async (req, res) => {
  try {
    const {
      laboratoryId,
      testId,
      priority = "Normal",
      notes = "",
    } = req.body;

    // Logged-in patient
    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // Laboratory
    const laboratory = await Laboratory.findById(laboratoryId);

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    // Test
    const test = await LabTest.findById(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Lab test not found",
      });
    }

    if (test.status !== "Active") {
      return res.status(400).json({
        success: false,
        message: "This test is not available.",
      });
    }

    // Find existing Lab Patient
    let labPatient = await LabPatient.findOne({
      laboratoryId: laboratory._id,
      patientId: patient._id,
    });

    // Create Lab Patient if not exists
    if (!labPatient) {
      labPatient = await LabPatient.create({
        laboratoryId: laboratory._id,
        patientId: patient._id,
        patientName: patient.fullName,
        phone: patient.phone,
        gender: patient.gender,
        age: patient.age,
      });
    }

    // Create Sample
    const sample = await LabSample.create({
      laboratoryId: laboratory._id,
      patientId: patient._id,
      labPatientId: labPatient._id,
      priority,
      notes,
      tests: [
        {
          testId: test._id,
          testName: test.name,
          price: test.price,
          status: "Pending",
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Lab test booked successfully.",
      sample,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};