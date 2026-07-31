import LabTest from "../../models/laboratory/LabTest.js";

// Get All Lab Tests
export const getLabTest = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 12,
      search = "",
      category,
      status,
      laboratoryId,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          code: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category Filter
    if (category) {
      filter.category = category;
    }

    // Status Filter
    if (status) {
      filter.status = status;
    }

    // Laboratory Filter
    if (laboratoryId) {
      filter.laboratoryId = laboratoryId;
    }

    const total = await LabTest.countDocuments(filter);

    const tests = await LabTest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      tests,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get Lab Tests Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get lab test by id
export const getLabTestById = async (req, res) => {
  try {
    const test = await LabTest.findById(req.params.id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Lab Test not found",
      });
    }

    res.status(200).json({
      success: true,
      test,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search lab Test
export const searchLabTest = async (req, res) => {
  try {
    const { query } = req.query;

    const tests = await LabTest.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { code: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
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
// Filter lab Test
export const filterLabTest = async (req, res) => {
  try {
    const { category, status, laboratoryId } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (laboratoryId) filter.laboratoryId = laboratoryId;

    const tests = await LabTest.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
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
