

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