import Medicine from "../../models/pharmacy/Medicine.js";

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

    const medicine = await Medicine.create({
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
      }
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