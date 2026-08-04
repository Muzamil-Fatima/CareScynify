import Medicine from "../../models/pharmacy/Medicine.js";

// Get All Medicines
export const getAllMedicines = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 12,
      search = "",
      category,
      pharmacyId,
      isActive,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { genericName: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { manufacturer: { $regex: search, $options: "i" } },
        { batchNumber: { $regex: search, $options: "i" } },
      ];
    }

    // Category Filter
    if (category) {
      filter.category = category;
    }

    // Pharmacy Filter
    if (pharmacyId) {
      filter.pharmacyId = pharmacyId;
    }

    // Active Filter
    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    const total = await Medicine.countDocuments(filter);

    const medicines = await Medicine.find(filter)
      .populate("pharmacyId", "pharmacyName city province homeDelivery isOpen")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      medicines,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get Medicines Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Medicine By ID
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate({
      path: "pharmacyId",
      populate: {
        path: "userId",
        select: "name email phone avatar",
      },
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      medicine: {
        _id: medicine._id,
        name: medicine.name,
        genericName: medicine.genericName,
        brand: medicine.brand,
        category: medicine.category,
        strength: medicine.strength,
        manufacturer: medicine.manufacturer,
        batchNumber: medicine.batchNumber,
        stock: medicine.stock,
        unitPrice: medicine.unitPrice,
        expiryDate: medicine.expiryDate,
        description: medicine.description,
        images: medicine.images,
        isActive: medicine.isActive,
        createdAt: medicine.createdAt,
        updatedAt: medicine.updatedAt,

        pharmacyId: {
          _id: medicine.pharmacyId?._id,
          pharmacyName: medicine.pharmacyId?.pharmacyName,
          ownerName: medicine.pharmacyId?.ownerName,
          description: medicine.pharmacyId?.description,

          verificationStatus: medicine.pharmacyId?.verificationStatus,

          address: medicine.pharmacyId?.address,
          city: medicine.pharmacyId?.city,
          province: medicine.pharmacyId?.province,
          country: medicine.pharmacyId?.country,
          postalCode: medicine.pharmacyId?.postalCode,
          mapLink: medicine.pharmacyId?.mapLink,

          pharmacyType: medicine.pharmacyId?.pharmacyType,
          homeDelivery: medicine.pharmacyId?.homeDelivery,
          emergencyService: medicine.pharmacyId?.emergencyService,
          onlineConsultationSupport:
            medicine.pharmacyId?.onlineConsultationSupport,
          acceptPrescription: medicine.pharmacyId?.acceptPrescription,
          cashOnDelivery: medicine.pharmacyId?.cashOnDelivery,
          isOpen: medicine.pharmacyId?.isOpen,
          operatingHours: medicine.pharmacyId?.operatingHours,

          logo: medicine.pharmacyId?.logo,
          coverImage: medicine.pharmacyId?.coverImage,

          user: medicine.pharmacyId?.userId,
        },
      },
    });
  } catch (error) {
    console.error("Get Medicine By ID Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Medicines
export const searchMedicine = async (req, res) => {
  try {
    const { query } = req.query;

    const medicines = await Medicine.find({
      isActive: true,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { genericName: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { manufacturer: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Filter Medicines
export const filterMedicine = async (req, res) => {
  try {
    const { category, pharmacyId, isActive } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (pharmacyId) filter.pharmacyId = pharmacyId;
    if (isActive !== undefined) filter.isActive = isActive === "true";

    const medicines = await Medicine.find(filter)
      .populate("pharmacyId", "pharmacyName city homeDelivery")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Medicines of Specific Pharmacy
export const getMedicinesByPharmacy = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      pharmacyId: req.params.pharmacyId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      medicines,
    });
  } catch (error) {
    console.error("Get Pharmacy Medicines Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
