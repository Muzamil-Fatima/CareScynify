

import Doctor from "../../models/doctorModel.js";
//  update education
export const updateDoctorEducation = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user._id },
      { education: req.body.education },
      { new: true }
    );

    return res.json({ success: true, doctor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// update doctor education
export const updateEducation = async (req, res) => {
  try {
    const userId = req.userId;
    const { education } = req.body;

    let doctor = await Doctor.findOne({ userId });
    if (!doctor) doctor = new Doctor({ userId });

    doctor.education = education || [];

    await doctor.save();

    return res.json({
      success: true,
      message: "Education updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};