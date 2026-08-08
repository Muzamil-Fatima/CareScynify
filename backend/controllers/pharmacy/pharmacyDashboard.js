import Pharmacy from "../../models/pharmacy/pharmacyModel.js";
import PharmacyOrder from "../../models/pharmacy/PharmacyOrder.js";
import Medicine from "../../models/pharmacy/Medicine.js";

export const getPharmacyDashboard = async (req, res) => {
  try {
    // Find pharmacy belonging to logged-in user
    const pharmacy = await Pharmacy.findOne({
      userId: req.user.id,
    }).select("_id pharmacyName");
    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }
    const pharmacyId = pharmacy._id;
    // STATS
    // Total active medicines
    const totalMedicines = await Medicine.countDocuments({
      pharmacyId,
      isActive: true,
    });
    // Total orders
    const totalOrders = await PharmacyOrder.countDocuments({
      pharmacyId,
    });
    // Unique customers
    const customers = await PharmacyOrder.distinct("patientId", {
      pharmacyId,
    });
    // Total revenue
    const revenueResult = await PharmacyOrder.aggregate([
      {
        $match: {
          pharmacyId,
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);
    const revenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
    // WEEKLY SALES
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    const day = startOfWeek.getDay();
    // Monday as first day
    const diff = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(startOfWeek.getDate() + diff);
    const weeklySales = await PharmacyOrder.aggregate([
      {
        $match: {
          pharmacyId,
          createdAt: {
            $gte: startOfWeek,
          },
          orderStatus: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: {
            $dayOfWeek: "$createdAt",
          },
          sales: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);
    const salesMap = {};
    const days = {
      1: "Sun",
      2: "Mon",
      3: "Tue",
      4: "Wed",
      5: "Thu",
      6: "Fri",
      7: "Sat",
    };
    weeklySales.forEach((item) => {
      salesMap[days[item._id]] = item.sales;
    });

    const salesData = [
      {
        name: "Mon",
        sales: salesMap.Mon || 0,
      },
      {
        name: "Tue",
        sales: salesMap.Tue || 0,
      },
      {
        name: "Wed",
        sales: salesMap.Wed || 0,
      },
      {
        name: "Thu",
        sales: salesMap.Thu || 0,
      },
      {
        name: "Fri",
        sales: salesMap.Fri || 0,
      },
      {
        name: "Sat",
        sales: salesMap.Sat || 0,
      },
      {
        name: "Sun",
        sales: salesMap.Sun || 0,
      },
    ];

    // ==========================================
    // INVENTORY
    // ==========================================

    const inventoryData = await Medicine.aggregate([
      {
        $match: {
          pharmacyId,
          isActive: true,
        },
      },

      {
        $group: {
          _id: "$category",

          value: {
            $sum: "$stock",
          },
        },
      },

      {
        $project: {
          _id: 0,
          name: "$_id",
          value: 1,
        },
      },

      {
        $sort: {
          value: -1,
        },
      },
    ]);

    // ==========================================
    // RECENT ORDERS
    // ==========================================

    const recentOrders = await PharmacyOrder.find({
      pharmacyId,
    })
      .populate("items.medicineId", "name")
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .select("orderId items totalAmount orderStatus createdAt");

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      stats: {
        totalMedicines,
        totalOrders,
        customers: customers.length,
        revenue,
      },

      salesData,

      inventoryData,

      recentOrders,
    });
  } catch (error) {
    console.error("Pharmacy Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load pharmacy dashboard",
      error: error.message,
    });
  }
};
