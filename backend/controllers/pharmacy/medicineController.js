import Medicine from "../../models/pharmacy/Medicine.js";
import Pharmacy from "../../models/pharmacy/pharmacyModel.js";
import cloudinary from "../../utils/cloudinary.js";
import streamifier from "streamifier";

// Upload one image to Cloudinary
const uploadMedicineImage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file?.buffer) {
      return reject(new Error("Invalid image file"));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "medicine-images",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Add Medicine
export const addMedicine = async (req, res) => {
  try {
    const {
      name,
      genericName,
      brand,
      category,
      strength,
      manufacturer,
      batchNumber,
      stock,
      unitPrice,
      expiryDate,
      description,
    } = req.body;

    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy profile not found",
      });
    }

    const existingMedicine = await Medicine.findOne({
      pharmacyId: pharmacy._id,
      name: name?.trim(),
      strength: strength?.trim(),
      batchNumber: batchNumber?.trim(),
    });

    if (existingMedicine) {
      return res.status(400).json({
        success: false,
        message: "Medicine already exists.",
      });
    }

    let uploadedImages = [];

    // Upload images
    if (req.files?.length) {
      // Upload images one by one.
      // This avoids putting too much pressure on the connection.
      for (const file of req.files) {
        const uploadedImage = await uploadMedicineImage(file);
        uploadedImages.push(uploadedImage);
      }
    }

    const medicine = await Medicine.create({
      pharmacyId: pharmacy._id,
      name,
      genericName,
      brand,
      category,
      strength,
      manufacturer,
      batchNumber,
      stock,
      unitPrice,
      expiryDate,
      description,
      images: uploadedImages,
    });

    return res.status(201).json({
      success: true,
      message: "Medicine added successfully.",
      medicine,
    });
  } catch (error) {
    console.error("Add Medicine Error:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to add medicine.",
    });
  }
};

// Get Medicines
export const getMedicines = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy profile not found",
      });
    }

    const medicines = await Medicine.find({
      pharmacyId: pharmacy._id,
      isActive: true,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    console.error("Get Medicines Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch medicines.",
    });
  }
};

// Get Medicine By ID
export const getMedicineById = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy profile not found",
      });
    }

    const medicine = await Medicine.findOne({
      _id: medicineId,
      pharmacyId: pharmacy._id,
      isActive: true,
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    return res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    console.error("Get Medicine By Id Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch medicine.",
    });
  }
};

// Update Medicine
export const updateMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy profile not found",
      });
    }

    const medicine = await Medicine.findOne({
      _id: medicineId,
      pharmacyId: pharmacy._id,
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    // Existing images from frontend
    let existingImages = [];

    try {
      existingImages = JSON.parse(req.body.existingImages || "[]");

      if (!Array.isArray(existingImages)) {
        existingImages = [];
      }
    } catch (error) {
      existingImages = [];
    }

    // Find removed images
    const deletedImages = medicine.images.filter(
      (oldImage) =>
        !existingImages.some(
          (newImage) => newImage.public_id === oldImage.public_id,
        ),
    );

    // Delete removed images from Cloudinary
    if (deletedImages.length > 0) {
      await Promise.all(
        deletedImages.map(async (image) => {
          if (image?.public_id) {
            try {
              await cloudinary.uploader.destroy(image.public_id);
            } catch (error) {
              console.error("Failed to delete medicine image:", error.message);
            }
          }
        }),
      );
    }

    // Upload new images
    let uploadedImages = [];

    if (req.files?.length) {
      for (const file of req.files) {
        const uploadedImage = await uploadMedicineImage(file);
        uploadedImages.push(uploadedImage);
      }
    }

    // Merge images
    const finalImages = [...existingImages, ...uploadedImages];

    // Maximum 4 images
    if (finalImages.length > 4) {
      return res.status(400).json({
        success: false,
        message: "Maximum 4 images are allowed.",
      });
    }

    const updatedMedicine = await Medicine.findOneAndUpdate(
      {
        _id: medicineId,
        pharmacyId: pharmacy._id,
      },
      {
        name: req.body.name,
        genericName: req.body.genericName,
        brand: req.body.brand,
        category: req.body.category,
        strength: req.body.strength,
        manufacturer: req.body.manufacturer,
        batchNumber: req.body.batchNumber,
        stock: req.body.stock,
        unitPrice: req.body.unitPrice,
        expiryDate: req.body.expiryDate,
        description: req.body.description,
        images: finalImages,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Medicine updated successfully.",
      medicine: updatedMedicine,
    });
  } catch (error) {
    console.error("Update Medicine Error:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to update medicine.",
    });
  }
};

// Delete Medicine
export const deleteMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy profile not found",
      });
    }

    const medicine = await Medicine.findOne({
      _id: medicineId,
      pharmacyId: pharmacy._id,
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    await Medicine.findByIdAndUpdate(
      medicineId,
      {
        isActive: false,
      },
      {
        runValidators: false,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Medicine deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Medicine Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete medicine.",
    });
  }
};
// Get Medicine Stats
export const getMedicineStats = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy profile not found",
      });
    }

    const now = new Date();

    const next30Days = new Date();
    next30Days.setDate(now.getDate() + 30);

    // Change this value if your project uses another low-stock limit
    const LOW_STOCK_LIMIT = 10;

    const totalMedicines = await Medicine.countDocuments({
      pharmacyId: pharmacy._id,
      isActive: true,
    });

    const lowStock = await Medicine.countDocuments({
      pharmacyId: pharmacy._id,
      isActive: true,
      stock: { $lte: LOW_STOCK_LIMIT },
    });

    const expiringSoon = await Medicine.countDocuments({
      pharmacyId: pharmacy._id,
      isActive: true,
      expiryDate: {
        $gte: now,
        $lte: next30Days,
      },
    });

    return res.status(200).json({
      success: true,
      stats: {
        total: totalMedicines,
        lowStock,
        expiringSoon,
      },
    });
  } catch (error) {
    console.error("Get Medicine Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch medicine statistics.",
    });
  }
};
// Search Medicines
export const searchMedicines = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy profile not found",
      });
    }

    const searchText = search.trim();

    // Empty search = return all active medicines
    if (!searchText) {
      const medicines = await Medicine.find({
        pharmacyId: pharmacy._id,
        isActive: true,
      }).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: medicines.length,
        medicines,
      });
    }

    const medicines = await Medicine.find({
      pharmacyId: pharmacy._id,
      isActive: true,
      $or: [
        {
          name: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          genericName: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          brand: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          category: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          strength: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          manufacturer: {
            $regex: searchText,
            $options: "i",
          },
        },
        {
          batchNumber: {
            $regex: searchText,
            $options: "i",
          },
        },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    console.error("Search Medicines Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to search medicines.",
    });
  }
};