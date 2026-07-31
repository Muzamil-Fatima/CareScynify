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

// Get Lab Test by ID
// Get Lab Test by ID
export const getLabTestById = async (req, res) => {
  try {
    const test = await LabTest.findById(req.params.id).populate({
      path: "laboratoryId",
      populate: {
        path: "userId",
        select: "name email phone avatar",
      },
    });

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Lab Test not found",
      });
    }

    res.status(200).json({
      success: true,
      test: {
        _id: test._id,
        name: test.name,
        code: test.code,
        category: test.category,
        description: test.description,
        sampleType: test.sampleType,
        preparation: test.preparation,
        turnAround: test.turnAround,
        price: test.price,
        status: test.status,
        createdAt: test.createdAt,
        updatedAt: test.updatedAt,

        laboratoryId: {
          _id: test.laboratoryId?._id,
          labId: test.laboratoryId?.labId,
          labName: test.laboratoryId?.labName,
          description: test.laboratoryId?.description,

          verificationStatus: test.laboratoryId?.verificationStatus,

          alternatePhone: test.laboratoryId?.alternatePhone,
          supportPhone: test.laboratoryId?.supportPhone,
          whatsapp: test.laboratoryId?.whatsapp,
          website: test.laboratoryId?.website,

          address: test.laboratoryId?.address,
          city: test.laboratoryId?.city,
          province: test.laboratoryId?.province,
          country: test.laboratoryId?.country,
          postalCode: test.laboratoryId?.postalCode,
          mapLink: test.laboratoryId?.mapLink,

          labType: test.laboratoryId?.labType,
          homeSampleCollection: test.laboratoryId?.homeSampleCollection,
          onlineReports: test.laboratoryId?.onlineReports,
          emergencyTesting: test.laboratoryId?.emergencyTesting,
          onlineBooking: test.laboratoryId?.onlineBooking,
          digitalReports: test.laboratoryId?.digitalReports,
          isOpen: test.laboratoryId?.isOpen,
          operatingHours: test.laboratoryId?.operatingHours,

          user: test.laboratoryId?.userId,
        },
      },
    });
  } catch (error) {
    console.error("Get Lab Test By ID Error:", error);

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
// Get all tests of a specific laboratory
export const getLabTestsByLaboratory = async (req, res) => {
  try {
    const tests = await LabTest.find({
      laboratoryId: req.params.labId,
      status: "Active",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      tests,
    });
  } catch (error) {
    console.error("Get Laboratory Tests Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};