import Doctor from "../../models/doctor/doctorModel.js";
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

    // SAFE  MERGE
    const current = workplace.settings?.toObject?.() || {};

    workplace.settings = {
      ...current,
      ...settings,

      appointmentDuration: {
        ...current.appointmentDuration,
        ...settings?.appointmentDuration,
      },
    };

    // FORCE MONGOOSE TO RECOGNIZE CHANGE
    workplace.markModified("settings");

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