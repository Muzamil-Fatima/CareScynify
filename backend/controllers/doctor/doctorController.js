import Doctor from "../../models/doctor/doctorModel.js";
import User from "../../models/user.js";
import cloudinary from "../../utils/cloudinary.js";
import streamifier from "streamifier";
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
      return res.status(401).json({
        message: "UserId not found",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      doctor = new Doctor({ userId });
    }

    // ---------------- USER FIELDS ----------------
    const { name, email, phone, address, avatar, dob, cnic } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (avatar !== undefined) user.avatar = avatar;
    if (dob !== undefined) user.dob = dob;
    if (cnic !== undefined) user.cnic = cnic;

    await user.save();

    // ---------------- DOCTOR FIELDS ----------------
    const {
      specialization,
      experience,
      qualifications,
      licenseNo,
      education,
      treatableConditions,
      about,
    } = req.body;

    doctor.specialization = specialization ?? doctor.specialization;

    doctor.qualifications = qualifications ?? doctor.qualifications;

    doctor.experience = experience ?? doctor.experience;

    doctor.education = education ?? doctor.education;
    doctor.about = about ?? doctor.about;
    if (treatableConditions !== undefined) {
      doctor.treatableConditions = treatableConditions.slice(0, 4);
    }
    // License check
    if (licenseNo !== undefined) {
      const cleanLicense = licenseNo.trim();
      // Only check duplicate if license number is not empty
      if (cleanLicense !== "" && cleanLicense !== doctor.licenseNo) {
        const exists = await Doctor.findOne({
          licenseNo: cleanLicense,
          _id: { $ne: doctor._id },
        });

        if (exists) {
          return res.status(400).json({
            success: false,
            message: "License number already exists",
          });
        }
      }
      doctor.licenseNo = cleanLicense;
    }
    // ---------------- CNIC FRONT ----------------
    if (req.files?.cnicFront?.[0]) {
      const frontResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "doctor-verification/cnic",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        streamifier
          .createReadStream(req.files.cnicFront[0].buffer)
          .pipe(stream);
      });

      doctor.identityVerification.cnicFront = frontResult.secure_url;

      doctor.identityVerification.status = "Pending";
    }

    // ---------------- CNIC BACK ----------------
    if (req.files?.cnicBack?.[0]) {
      const backResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "doctor-verification/cnic",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        streamifier.createReadStream(req.files.cnicBack[0].buffer).pipe(stream);
      });

      doctor.identityVerification.cnicBack = backResult.secure_url;

      doctor.identityVerification.status = "Pending";
    }

    await doctor.save();

    return res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
      doctor,
    });
  } catch (error) {
    // console.log("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
      (e) => e._id.toString() !== req.params.id,
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
      (e) => e._id.toString() !== req.params.id,
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

// Upload Credential
export const addDoctorCredential = async (req, res) => {
  try {
    const userId = req.userId;
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const resourceType =
      req.file.mimetype === "application/pdf" ? "raw" : "image";

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "doctor-credentials",
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    doctor.credentials.push({
      name: req.file.originalname,
      category,
      fileUrl: result.secure_url,
      mimeType: req.file.mimetype,
      status: "Pending",
    });

    await doctor.save();

    res.status(201).json({
      success: true,
      message: "Credential uploaded successfully",
      credential: doctor.credentials[doctor.credentials.length - 1],
    });
  } catch (error) {
    // console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get Credential
export const getDoctorCredentials = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      userId: req.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      credentials: doctor.credentials || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//  delete Credential
export const deleteDoctorCredential = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      userId: req.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const credential = doctor.credentials.id(req.params.id);

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: "Credential not found",
      });
    }

    credential.deleteOne();

    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Credential deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};