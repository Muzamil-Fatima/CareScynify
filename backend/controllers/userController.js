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

  const { name, email, phone, address, cnic, dob, avatar } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (phone !== undefined) user.phone = phone;
  if (address !== undefined) user.address = address;
  if (cnic !== undefined) user.cnic = cnic;
  if (dob !== undefined) user.dob = dob;
  if (avatar !== undefined) user.avatar = avatar;

  // ---------------- AVATAR UPLOAD ----------------
  if (req.file && req.file.buffer) {
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

    user.avatar = result.secure_url;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export { updateUserProfile };
