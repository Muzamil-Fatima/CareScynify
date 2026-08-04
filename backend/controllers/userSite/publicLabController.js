import Laboratory from "../../models/laboratory/labModel.js";

// Get all laboratories with pagination, search and filters
export const getLaboratories = async (req, res) => {
  try {
    console.log("getLaboratories called");
    let { page = 1, limit = 12, search, city, labType } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const matchStage = {
      verificationStatus: "verified",

      ...(city && {
        city: {
          $regex: city,
          $options: "i",
        },
      }),

      ...(labType && {
        labType,
      }),

      ...(search && {
        $or: [
          {
            labName: {
              $regex: search,
              $options: "i",
            },
          },

          {
            city: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      }),
    };

    const result = await Laboratory.aggregate([
      {
        $match: matchStage,
      },

      {
        $lookup: {
          from: "users",

          localField: "userId",

          foreignField: "_id",

          as: "userId",
        },
      },

      {
        $unwind: {
          path: "$userId",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $facet: {
          data: [
            {
              $sort: {
                createdAt: -1,
              },
            },

            {
              $skip: skip,
            },

            {
              $limit: limit,
            },
          ],

          total: [
            {
              $count: "count",
            },
          ],
        },
      },
    ]);

    const laboratories = result[0]?.data.map((lab) => ({
      _id: lab._id,

      labId: lab.labId,

      labName: lab.labName,

      city: lab.city,

      address: lab.address,

      labType: lab.labType,

      homeSampleCollection: lab.homeSampleCollection,

      onlineReports: lab.onlineReports,

      isOpen: lab.isOpen,

      user: lab.userId,
    }));

    const total = result[0]?.total[0]?.count || 0;

    res.json({
      success: true,

      laboratories,

      pagination: {
        total,

        page,

        limit,

        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get laboratory by id
export const getLaboratoryById = async (req, res) => {
  try {
    const laboratory = await Laboratory.findById(req.params.id).populate(
      "userId",
      "name email phone avatar"
    );

    if (!laboratory) {
      return res.status(404).json({
        success: false,
        message: "Laboratory not found",
      });
    }

    return res.status(200).json({
      success: true,
      laboratory: {
        _id: laboratory._id,
        labId: laboratory.labId,
        labName: laboratory.labName,
        description: laboratory.description,
        verificationStatus: laboratory.verificationStatus,

        // Contact
        alternatePhone: laboratory.alternatePhone,
        website: laboratory.website,
        whatsapp: laboratory.whatsapp,
        supportPhone: laboratory.supportPhone,

        // Address
        address: laboratory.address,
        city: laboratory.city,
        province: laboratory.province,
        country: laboratory.country,
        postalCode: laboratory.postalCode,
        mapLink: laboratory.mapLink,

        // Lab Information
        labType: laboratory.labType,
        homeSampleCollection: laboratory.homeSampleCollection,
        onlineReports: laboratory.onlineReports,
        emergencyTesting: laboratory.emergencyTesting,
        onlineBooking: laboratory.onlineBooking,
        digitalReports: laboratory.digitalReports,
        isOpen: laboratory.isOpen,
        operatingHours: laboratory.operatingHours,

        // Dates
        createdAt: laboratory.createdAt,
        updatedAt: laboratory.updatedAt,

        // Owner/User
        user: laboratory.userId,
      },
    });
  } catch (error) {
    console.error("Get Laboratory By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch laboratory.",
      error: error.message,
    });
  }
};

// Search laboratories
export const searchLaboratories = async (req, res) => {
  try {
    const { query } = req.query;

    const laboratories = await Laboratory.find({
      $or: [
        {
          labName: {
            $regex: query,
            $options: "i",
          },
        },

        {
          city: {
            $regex: query,
            $options: "i",
          },
        },

        {
          labType: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    }).populate("userId", "name avatar");

    const formattedLabs = laboratories.map((lab) => ({
      ...lab.toObject(),

      user: lab.userId,
    }));

    res.json({
      success: true,

      laboratories: formattedLabs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Filter laboratories
export const filterLaboratories = async (req, res) => {
  try {
    const {
      city,

      labType,

      homeCollection,

      available,
    } = req.query;

    let filter = {};

    if (city) {
      filter.city = {
        $regex: city,

        $options: "i",
      };
    }

    if (labType) {
      filter.labType = labType;
    }

    if (homeCollection === "true") {
      filter.homeSampleCollection = true;
    }

    if (available === "true") {
      filter.isOpen = true;
    }

    const laboratories = await Laboratory.find(filter).populate(
      "userId",
      "name avatar",
    );

    const formattedLabs = laboratories.map((lab) => ({
      ...lab.toObject(),

      user: lab.userId,
    }));

    res.json({
      success: true,

      laboratories: formattedLabs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
