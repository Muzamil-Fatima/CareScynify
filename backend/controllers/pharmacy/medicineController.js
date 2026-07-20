import Medicine from "../../models/pharmacy/Medicine.js";
import Pharmacy from "../../models/pharmacy/pharmacyModel.js";
import cloudinary from "../../utils/cloudinary.js";
import streamifier from "streamifier";
export const addMedicine = async (req, res) => {
  try {
    const {
      name,
      genericName,
      brand,
      category,
      strength,
      manufacturer,
      stock,
      unitPrice,
      expiryDate,
      description,
    } = req.body;

    const existingMedicine = await Medicine.findOne({
      name: name?.trim(),
      strength: strength?.trim(),
    });

    if (existingMedicine) {
      return res.status(400).json({
        success: false,
        message: "Medicine already exists.",
      });
    }
    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "medicine-images",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });

        uploadedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }
    const pharmacy = await Pharmacy.findOne({
      userId: req.user._id,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy profile not found",
      });
    }
    const medicine = await Medicine.create({
      pharmacyId: pharmacy._id,
      name,
      genericName,
      brand,
      category,
      strength,
      manufacturer,
      stock,
      unitPrice,
      expiryDate,
      description,
      images: uploadedImages,
    });

    res.status(201).json({
      success: true,
      message: "Medicine added successfully.",
      medicine,
    });
  } catch (error) {
    console.error("Add Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add medicine.",
    });
  }
};
// getMedicines
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    console.error("Get Medicines Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines.",
    });
  }
};

// updateMedicine
export const updateMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      medicineId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully.",
      medicine: updatedMedicine,
    });
  } catch (error) {
    console.error("Update Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update medicine.",
    });
  }
};
// deleteMedicine

export const deleteMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found.",
      });
    }

    medicine.isActive = false;

    await medicine.save();

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Medicine Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete medicine.",
    });
  }
};
