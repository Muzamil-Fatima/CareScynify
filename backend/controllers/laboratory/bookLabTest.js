import Laboratory from "../../models/laboratory/labModel.js";
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

    // Lab Test
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

    // Create Sample
    const sample = await LabSample.create({
      laboratoryId: laboratory._id, // Always Laboratory document ID
      patientId: patient._id,
      labPatientId: null,
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