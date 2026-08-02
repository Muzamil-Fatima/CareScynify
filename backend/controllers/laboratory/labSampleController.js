import LabSample from "../../models/laboratory/LabSample.js";
import LabPatient from "../../models/laboratory/labAddPatient.js";
import Laboratory from "../../models/laboratory/labModel.js";


// Create New Sample
export const createLabSample = async (req, res) => {
  try {
    const { labPatientId, tests, priority } = req.body;

    const laboratory = await Laboratory.findOne({ userId: req.user._id });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    const labPatient = await LabPatient.findById(labPatientId);

    if (!labPatient) {
      return res.status(404).json({
        success: false,
        message: "Lab patient not found",
      });
    }

    const sample = await LabSample.create({
      laboratoryId: laboratory._id,
      labPatientId: labPatient._id,
      patientId: labPatient.patientId || null,
      tests,
      priority,
    });

    res.status(201).json({
      success: true,
      message: "Lab sample created successfully",
      sample,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Lab Samples
export const getLabSamples = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({ userId: req.user._id });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    const samples = await LabSample.find({
      laboratoryId: laboratory._id,
    })
      .populate({
        path: "labPatientId",
        select: "name mobile age gender",
      })
     .populate({
  path: "patientId",
  populate: {
    path: "userId",
    select: "name email phone avatar",
  },
})
      .populate("tests.testId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      samples,
    });
  } catch (error) {
    console.error("Get Lab Samples Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Single Sample
export const getLabSampleById = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user._id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    const sample = await LabSample.findOne({
      _id: req.params.id,
      laboratoryId: laboratory._id,
    })
      .populate({
        path: "labPatientId",
        select: "name mobile age gender",
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email phone avatar",
        },
      })
      .populate("tests.testId");

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Sample not found",
      });
    }

    res.status(200).json({
      success: true,
      sample,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Sample Status
export const updateLabSampleStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const sample = await LabSample.findByIdAndUpdate(
      req.params.id,

      {
        sampleStatus: status,
      },

      {
        new: true,
      },
    );

    if (!sample) {
      return res.status(404).json({
        success: false,

        message: "Sample not found",
      });
    }

    res.status(200).json({
      success: true,

      message: "Status updated",

      sample,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
// Update Individual Test Status
export const updateTestStatus = async (req, res) => {
  try {
    const { testId, status } = req.body;

    const laboratory = await Laboratory.findOne({ userId: req.user._id });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    const sample = await LabSample.findOne({
      _id: req.params.id,
      laboratoryId: laboratory._id,
    });

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Sample not found",
      });
    }

    const test = sample.tests.find(
      (item) => item.testId.toString() === testId
    );

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    test.status = status;

    // If all tests are completed, update sample status as well
    const allCompleted = sample.tests.every((item) =>
      item.testId.toString() === testId
        ? status === "Completed"
        : item.status === "Completed"
    );

    if (allCompleted) {
      sample.sampleStatus = "Completed";
    }

    await sample.save();

    res.status(200).json({
      success: true,
      message: "Test status updated successfully",
      sample,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Sample
export const deleteLabSample = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({ userId: req.user._id });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    const sample = await LabSample.findOneAndDelete({
      _id: req.params.id,
      laboratoryId: laboratory._id,
    });

    if (!sample) {
      return res.status(404).json({
        success: false,
        message: "Sample not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sample deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
