import Doctor from "../../models/doctorModel.js";
export const updateWorkplaceSettings = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const { workplaceId } = req.params;
    const { settings } = req.body;

    const workplace = doctor.workplaces.id(workplaceId);

    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }

    // merge settings safely
    workplace.settings = {
      ...workplace.settings.toObject(),
      ...settings,
    };

    await doctor.save();

    return res.json({
      success: true,
      message: "Workplace settings updated",
      workplace,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};