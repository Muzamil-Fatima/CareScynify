import LabTest from "../../models/laboratory/LabTest.js";
import Laboratory from "../../models/laboratory/labModel.js";

// CREATE LAB TEST

export const createLabTest = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user._id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory profile not found",
      });
    }

    const { name, category, price, turnAround } = req.body;

    const code = `T-${name.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const test = await LabTest.create({
      laboratoryId: laboratory._id,

      code,

      name,

      category,

      price,

      turnAround,
    });

    res.status(201).json({
      success: true,
      message: "Lab test created successfully",
      test,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET LAB TESTS

export const getLabTests = async (req, res) => {
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

    const tests = await LabTest.find({
      laboratoryId: laboratory._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      tests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TEST

export const deleteLabTest = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user._id,
    });

    await LabTest.findOneAndDelete({
      _id: req.params.id,

      laboratoryId: laboratory._id,
    });

    res.json({
      success: true,
      message: "Test deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// UPDATE LAB TEST

export const updateLabTest = async (req, res) => {
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

    const { name, category, price, turnAround, status } = req.body;

    const updatedTest = await LabTest.findOneAndUpdate(
      {
        _id: req.params.id,
        laboratoryId: laboratory._id,
      },
      {
        name,
        category,
        price,
        turnAround,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTest) {
      return res.status(404).json({
        success: false,
        message: "Lab test not found",
      });
    }

    res.json({
      success: true,
      message: "Lab test updated successfully",
      test: updatedTest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
