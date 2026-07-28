import LabSample from "../../models/laboratory/LabSample.js";

// Create New Sample
export const createLabSample = async (req, res) => {
  try {
    const { patientId, patientName, tests, priority } = req.body;
    const sample = await LabSample.create({
      laboratoryId: req.user._id,
      patientId,
      patientName,
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
    const samples = await LabSample.find({
      laboratoryId: req.user._id,
    })
      .populate("patientId")
      .populate("tests.testId")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,

      samples,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get Single Sample

export const getLabSampleById = async (req, res) => {
  try {
    const sample = await LabSample.findById(req.params.id)
      .populate("patientId")
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

    const sample = await LabSample.findById(req.params.id);

    if (!sample) {
      return res.status(404).json({
        message: "Sample not found",
      });
    }

    const test = sample.tests.find((item) => item.testId.toString() === testId);

    if (!test) {
      return res.status(404).json({
        message: "Test not found",
      });
    }

    test.status = status;

    await sample.save();

    res.status(200).json({
      success: true,

      message: "Test status updated",

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
    const sample = await LabSample.findByIdAndDelete(req.params.id);

    if (!sample) {
      return res.status(404).json({
        message: "Sample not found",
      });
    }

    res.status(200).json({
      success: true,

      message: "Sample deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
