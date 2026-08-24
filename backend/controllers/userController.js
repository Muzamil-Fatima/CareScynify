import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import User from "../models/user.js";
import asyncHandler from "../middleware/catchAsyncError.js";

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized - no userId from token",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { name, email, phone, address, cnic, dob } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (phone !== undefined) user.phone = phone;
  if (address !== undefined) user.address = address;
  if (cnic !== undefined) user.cnic = cnic;
  if (dob !== undefined) user.dob = dob;

  //  AVATAR UPLOAD 
  if (req.file && req.file.buffer) {
    // Delete old avatar
    if (user.avatar?.publicId) {
      try {
        await cloudinary.uploader.destroy(user.avatar.publicId);
      } catch (error) {
        console.error("Failed to delete old avatar:", error.message);
      }
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "avatars" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    user.avatar = {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export { updateUserProfile };
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// verify Mobile number
export const verifyMobileNumber = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// ------Languages
// add language
export const addLanguage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.languages.push(req.body);

    await user.save();

    res.json({
      success: true,
      languages: user.languages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//  update languages
export const updateLanguage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const lang = user.languages.id(req.params.id);

    if (!lang) {
      return res.status(404).json({ message: "Language not found" });
    }

    Object.assign(lang, req.body);

    await user.save();

    res.json({
      success: true,
      languages: user.languages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete language
export const deleteLanguage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.languages = user.languages.filter(
      (l) => l._id.toString() !== req.params.id,
    );

    await user.save();

    res.json({
      success: true,
      languages: user.languages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
