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
// UPDATE DOCTOR PROFILE (FIXED + MATCH FRONTEND)
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

    // USER FIELDS
    const { name, email, phone, address, avatar, dob, cnic } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (avatar !== undefined) user.avatar = avatar;
    if (dob !== undefined) user.dob = dob;
    if (cnic !== undefined) user.cnic = cnic;

    await user.save();

    // DOCTOR FIELDS
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
      appointmentDuration,
      durationUnit,
    } = req.body;

    if (appointmentDuration !== undefined) {
      doctor.appointmentDuration = {
        value: Number(appointmentDuration) || 30,
        unit: durationUnit || "minutes",
      };
    }

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
      doctor.experience = Number(experience);
    }

    if (fee !== undefined && fee !== "") {
      doctor.fee = Number(fee);
    }

  if (availableDays !== undefined) {
  doctor.availableDays = availableDays;
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
