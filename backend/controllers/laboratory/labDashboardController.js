import LabSample from "../../models/laboratory/LabSample.js";
import LabReport from "../../models/laboratory/LabReport.js";
import LabTest from "../../models/laboratory/LabTest.js";
import Laboratory from "../../models/laboratory/labModel.js";

// 1. Dashboard Statistics
export const getLabDashboardStats = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user.id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    // Pending Samples
    const pendingSamples = await LabSample.countDocuments({
      laboratoryId: laboratory._id,
      sampleStatus: {
        $in: ["Pending", "Collected", "Processing"],
      },
    });

    // Completed Samples
    const completedSamples = await LabSample.countDocuments({
      laboratoryId: laboratory._id,
      sampleStatus: "Completed",
    });

    // Urgent Samples
    const urgentCases = await LabSample.countDocuments({
      laboratoryId: laboratory._id,
      priority: "Urgent",
    });

    // Total Samples
    const totalSamples = await LabSample.countDocuments({
      laboratoryId: laboratory._id,
    });

    // Total Tests
    const totalTests = await LabSample.aggregate([
      {
        $match: {
          laboratoryId: laboratory._id,
        },
      },
      {
        $unwind: "$tests",
      },
      {
        $count: "total",
      },
    ]);

    res.status(200).json({
      success: true,

      stats: {
        pendingSamples,
        completedSamples,
        urgentCases,
        totalSamples,
        totalTests: totalTests[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. Recent Samples
// 2. Recent Samples
export const getRecentSamples = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user.id,
    });

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
        select: "name gender mobile age",
      })
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email phone",
        },
      })
      .sort({
        createdAt: -1,
      })
      .limit(5);

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

// 3. Test Performance
export const getTestPerformance = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user.id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    const performance = await LabSample.aggregate([
      {
        $match: {
          laboratoryId: laboratory._id,
        },
      },

      {
        $unwind: "$tests",
      },

      {
        $group: {
          _id: "$tests.testName",

          total: {
            $sum: 1,
          },

          completed: {
            $sum: {
              $cond: [
                {
                  $eq: ["$tests.status", "Completed"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      performance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. Monthly Reports
export const getMonthlyReports = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user.id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    const reports = await LabReport.aggregate([
      {
        $match: {
          laboratoryId: laboratory._id,
        },
      },

      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
            year: {
              $year: "$createdAt",
            },
          },

          total: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 5. Pending / Urgent Samples
export const getPendingSamples = async (req, res) => {
  try {
    const laboratory = await Laboratory.findOne({
      userId: req.user.id,
    });

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    const samples = await LabSample.find({
      laboratoryId: laboratory._id,

      sampleStatus: {
        $ne: "Completed",
      },
    })
      .populate({
        path: "labPatientId",
        select: "name gender",
      })
      .sort({
        priority: -1,
        createdAt: -1,
      })
      .limit(10);

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
