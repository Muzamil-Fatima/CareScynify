import Medicine from "../../models/pharmacy/Medicine.js";
//  get all medicines
export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      isActive: true,
    })
      .populate(
        "pharmacyId",
        "pharmacyName city homeDelivery"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//  get all medicines by pharmacy id
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      isActive: true,
    }).populate(
      "pharmacyId",
      "pharmacyName city address homeDelivery"
    );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};