import Doctor from "../models/doctorModel.js";
import asyncHandler from "../middleware/catchAsyncError.js";

export const addDr = asyncHandler(async (req, res) => {
  try {
    const {
      drImage,
      drName,
      drCNIC,
      drEmail,
      drDOB,
      drPhone,
      drAddress,
      drId,
      drSpecialization,
      drExperience,
      drQualifications,
      drUserName,
      drPassword,
      drLicenseNo,
      drAvailableDays,
      drConsultationTime,
      drRoomNo,
      drAppointmentDuration,
      drStatus,
      drNote,
      drFee,
    } = req.body;

    const existingDoctor = await Doctor.findOne({
      $or: [
        { drCNIC },
        { drEmail },
        { drPhone },
        { drId },
        { drUserName },
        { drLicenseNo },
      ],
    });

    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor with given credentials already exists!" });
    }

    // Create new doctor
    const newDoctor = new Doctor({
      drImage,
      drName,
      drCNIC,
      drEmail,
      drDOB,
      drPhone,
      drAddress,
      drId,
      drSpecialization,
      drExperience,
      drQualifications,
      drUserName,
      drPassword,
      drLicenseNo,
      drAvailableDays,
      drConsultationTime,
      drRoomNo,
      drAppointmentDuration,
      drStatus,
      drNote,
      drFee,
    });

    await newDoctor.save();

    res.status(201).json({ message: "Doctor added successfully", newDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});
