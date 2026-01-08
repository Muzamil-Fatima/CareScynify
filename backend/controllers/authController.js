import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import asyncHandler from "../middleware/catchAsyncError.js";
import generateToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

import {
  verificationEmail,
  forgotPasswordEmail,
} from "../utils/emailTemplates.js";
// ------------------------------- signup
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please provide all required fields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  //  Generate random token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
    verificationCodeExpire: Date.now() + 15 * 60 * 1000, // 15 minutes
     authProvider: "manual",
  });

  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify/${verificationToken}`;

  await sendEmail({
    to: newUser.email,
    subject: "Verify your email for TecHub",
    html: verificationEmail(newUser.name, verifyUrl),
  });

  //  Do NOT auto-login yet
  res.status(201).json({
    success: true,
    message: "Signup successful! Check your email to verify your account.",
  });
});
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    verificationToken: token,
    verificationCodeExpire: { $gt: Date.now() }, // check expiry
  });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid or expired verification link" });
  }

  user.accountVerified = true;
  user.verificationToken = undefined;
  user.verificationCodeExpire = undefined;

  await user.save();
  //  Redirect to frontend home page
  res.redirect(`${process.env.FRONTEND_URL}/?verified=true`);
});

// -------------------------------- login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUsr = await User.findOne({ email });
  if (existingUsr) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUsr.password
    );

    if (isPasswordValid) {
      generateToken(res, existingUsr._id);

      res.status(201).json({
        _id: existingUsr._id,
        name: existingUsr.name,
        email: existingUsr.email,
        role: existingUsr.role,
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
});
// ---------------------------- logout user
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Successfully" });
});
// -------------------- Forgot Password --------------------
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email, accountVerified: true });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist or account not verified");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetPasswordOTP = otp;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset OTP",
      html: forgotPasswordEmail(user.name, otp),
    });
    res.status(200).json({
      success: true,
      message: `OTP sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error("Failed to send OTP email");
  }
});

// -------------------- Reset Password---------------------
const resetPassword = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) {
    res.status(401);
    throw new Error("Token missing");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  //  Hash the new password before saving
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({ success: true, message: "Password reset successful" });
});
// -------------------- Resend password reset otp
// Resend Reset Password OTP
const resendResetPasswordOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    res.status(404);
    throw new Error("User not found or not verified");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetPasswordOTP = otp;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    to: user.email,
    subject: "Password Reset OTP",
    html: forgotPasswordEmail(user.name, otp),
  });

  res.status(200).json({
    success: true,
    message: `Password reset OTP sent to ${user.email} successfully.`,
  });
});
// -------------------- Verify OTP
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({
    email,
    resetPasswordOTP: otp.toString(),
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }
  // OTP is valid, generate a token or allow password reset
  const token = generateToken(res, user._id); // sets cookies + return token
  res.status(200).json({
    success: true,
    message: "OTP verified successfully.",
    resetToken: token,
  });
});
// -------------------- Google Authentication Handle

// ---------------------------------- export controllers
export {
  signup,
  login,
  logoutCurrentUser,
  forgotPassword,
  verifyEmail,
  verifyOtp,
  resetPassword,
  resendResetPasswordOTP,
  // resendVerification,
};
