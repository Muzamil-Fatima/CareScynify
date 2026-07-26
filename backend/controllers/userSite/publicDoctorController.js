import Doctor from "../../models/doctorModel.js";

// Get all doctors with pagination, search, and filters
export const getDoctors = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 12,
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
        "workplaces.settings.consultationType": consultationType,
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
      treatableConditions: d.treatableConditions,
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
// get doctor by id
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("userId");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const experienceDetails = doctor.experienceDetails?.map((exp) => {
      const startYear = Number(exp.startYear);

      const endYear = exp.currentlyWorking
        ? new Date().getFullYear()
        : Number(exp.endYear);

      return {
        ...exp.toObject(),
        duration: `${endYear - startYear} years`,
      };
    });

    res.json({
      success: true,
      doctor: {
        ...doctor._doc,
        experienceDetails,
        user: doctor.userId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
