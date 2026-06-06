import Doctor from "../models/doctorModel.js";

export const getDoctors = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search,
      specialization,
      consultationType,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const matchStage = {
      status: "active",
      ...(specialization && { specialization }),
      ...(consultationType && {
        "settings.consultationType": consultationType,
      }),
      ...(search && {
        "userId.name": {
          $regex: search,
          $options: "i",
        },
      }),
    };

    const result = await Doctor.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: "$userId" },

      { $match: matchStage },

      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          total: [{ $count: "count" }],
        },
      },
    ]);
    const doctors = result[0]?.data.map((d) => ({
      _id: d._id,
      specialization: d.specialization,
      experience: d.experience,
      settings: d.settings,
      user: d.userId,
    }));
    const total = result[0]?.total[0]?.count || 0;

    res.json({
      success: true,
      doctors,
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
