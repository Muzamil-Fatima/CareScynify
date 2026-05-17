import Doctor from "../models/doctorModel.js";
import User from "../models/user.js";

// GET DOCTOR PROFILE
export const getDoctorProfile = async (req, res) => {
  try {
    const userId = req.userId || req.user?.id || req.user;

    if (!userId) {
      return res.status(401).json({ message: "UserId not found" });
    }

    const user = await User.findById(userId).select(
      "name email avatar phone address",
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

// UPDATE DOCTOR PROFILE (FIXED + MATCH FRONTEND)
export const updateDoctorProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      doctor = new Doctor({ userId });
    }

    // ================= USER FIELDS =================
    const { name, email, phone, address } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    await user.save();

    // ================= DOCTOR FIELDS =================
    const {
      specialization,
      experience,
      qualifications,
      licenseNo,
      fee,
      availableDays,
      consultStart,
      consultEnd,
      drRoomNo,
      status,
      note,
      drCnic,
    } = req.body;

    if (specialization) doctor.specialization = specialization;
    if (qualifications) doctor.qualifications = qualifications;
    if (licenseNo && licenseNo !== doctor.licenseNo) {
      const exists = await Doctor.findOne({ licenseNo });

      if (exists) {
        return res.status(400).json({
          message: "License number already exists",
        });
      }

      doctor.licenseNo = licenseNo;
    }
    if (experience !== undefined && experience !== "") {
      const exp = Number(experience);
      if (!isNaN(exp)) doctor.experience = exp;
    }
    if (drCnic !== undefined && drCnic !== "") {
      const cleanCnic = String(drCnic).trim();
      doctor.drCnic = cleanCnic;
    }

    if (fee !== undefined && fee !== "") {
      const f = Number(fee);
      if (!isNaN(f)) doctor.fee = f;
    }
    if (availableDays !== undefined) {
      doctor.availableDays = Array.isArray(availableDays)
        ? availableDays.map((d) =>
            typeof d === "string" ? { day: d, startTime: "", endTime: "" } : d,
          )
        : doctor.availableDays;
    }

    if (consultStart && consultEnd) {
      doctor.consultationTime = `${consultStart}-${consultEnd}`;
    }
    if (drRoomNo !== undefined) doctor.drRoomNo = drRoomNo;
    if (status) doctor.status = status.toLowerCase();
    if (note) doctor.note = note;

    await doctor.save();

    return res.json({
      success: true,
      message: "Doctor profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
