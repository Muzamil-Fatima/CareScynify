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

    if (req.files?.length) {
      uploadedImages = await Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                {
                  folder: "medicine-images",
                },
                (err, result) => {
                  if (err) return reject(err);

                  resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                  });
                },
              );

              streamifier.createReadStream(file.buffer).pipe(stream);
            }),
        ),
      );
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
// getMedicineById
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

    res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    console.error("Get Medicine By Id Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medicine.",
    });
  }
};
// updateMedicine
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

    const updatedMedicine = await Medicine.findOneAndUpdate(
      {
        _id: medicineId,
        pharmacyId: pharmacy._id,
      },
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
      }
    );

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
