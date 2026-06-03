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
    const { specialization, experience, qualifications, licenseNo, education } =
      req.body;

    doctor.specialization = specialization ?? doctor.specialization;
    doctor.qualifications = qualifications ?? doctor.qualifications;
    doctor.experience = experience ?? doctor.experience;
    doctor.education = education ?? doctor.education;

    if (licenseNo !== undefined && licenseNo !== doctor.licenseNo) {
      const exists = await Doctor.findOne({
        licenseNo,
      });

      if (exists && exists.userId.toString() !== userId.toString()) {
        return res.status(400).json({
          success: false,
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
// -------------------------------------Education
// ADD EDUCATION
export const addDoctorEducation = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    doctor.education.push(req.body);

    await doctor.save();

    res.json({
      success: true,
      education: doctor.education,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE EDUCATION
export const updateDoctorEducation = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    const edu = doctor.education.id(req.params.id);
    if (!edu) return res.status(404).json({ message: "Not found" });

    Object.assign(edu, req.body);

    await doctor.save();

    res.json({
      success: true,
      education: doctor.education,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE EDUCATION
export const deleteDoctorEducation = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    doctor.education = doctor.education.filter(
      (e) => e._id.toString() !== req.params.id
    );

    await doctor.save();

    res.json({
      success: true,
      education: doctor.education,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------------------Experience
// ADD EXPERIENCE
export const addDoctorExperience = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    doctor.experienceDetails.push(req.body);

    await doctor.save();

    res.json({
      success: true,
      experience: doctor.experienceDetails,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE EXPERIENCE
export const updateDoctorExperience = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    const exp = doctor.experienceDetails.id(req.params.id);
    if (!exp) return res.status(404).json({ message: "Not found" });

    Object.assign(exp, req.body);

    await doctor.save();

    res.json({
      success: true,
      experience: doctor.experienceDetails,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE EXPERIENCE
export const deleteDoctorExperience = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user._id });

    doctor.experienceDetails = doctor.experienceDetails.filter(
      (e) => e._id.toString() !== req.params.id
    );

    await doctor.save();

    res.json({
      success: true,
      experience: doctor.experienceDetails,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
