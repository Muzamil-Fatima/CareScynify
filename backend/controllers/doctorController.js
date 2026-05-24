import Doctor from "../models/doctorModel.js";
import User from "../models/user.js";

// GET DOCTOR PROFILE
export const getDoctorProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "UserId not found" });
    }

    const user = await User.findById(userId).select(
      "name email avatar phone address cnic dob",
    );

    const doctor = await Doctor.findOne({ userId });

    return res.json({
      user,
      doctor: doctor || {},
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// UPDATE DOCTOR PROFILE
export const updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "UserId not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      doctor = new Doctor({ userId });
    }

    // USER FIELDS (ONLY USED)
    const { name, email, phone, address, avatar, dob, cnic } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (avatar !== undefined) user.avatar = avatar;
    if (dob !== undefined) user.dob = dob;
    if (cnic !== undefined) user.cnic = cnic;

    await user.save();

    // DOCTOR FIELDS (ONLY UI USED)
    const {
      specialization,
      experience,
      qualifications,
      licenseNo,
      workplaces,
      education,
    } = req.body;
    if (education !== undefined) {
      doctor.education = education;
    }
    if (workplaces !== undefined) {
      doctor.workplaces = workplaces;
    }
    if (specialization !== undefined) {
      doctor.specialization = specialization;
    }

    if (qualifications !== undefined) {
      doctor.qualifications = qualifications;
    }

    if (experience !== undefined) {
      doctor.experience = experience;
    }

    if (licenseNo !== undefined) {
      const exists = await Doctor.findOne({ licenseNo });

      if (exists && exists.userId.toString() !== userId.toString()) {
        return res.status(400).json({
          message: "License number already exists",
        });
      }

      doctor.licenseNo = licenseNo;
    }

    await doctor.save();

    return res.json({
      success: true,
      message: "Doctor profile updated successfully",
    });
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
//  update doctor workplaces
export const updateWorkplaces = async (req, res) => {
  try {
    const userId = req.userId;
    const { workplaces } = req.body;

    let doctor = await Doctor.findOne({ userId });
    if (!doctor) doctor = new Doctor({ userId });

    doctor.workplaces = workplaces || [];

    await doctor.save();

    return res.json({
      success: true,
      message: "Workplaces updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// search Doctor
export const searchDoctor = async (req, res) => {
  try {
    let doctor = await Doctor.findOne({ userId, email, name, location });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get all doctor is specfic clinic
export const clinicAllDoctor = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
