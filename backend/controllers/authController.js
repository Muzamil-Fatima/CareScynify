import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Appointment from "../models/appointmentModel.js";
import asyncHandler from "../middleware/catchAsyncError.js";
import generateToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import {
  verificationEmail,
  forgotPasswordEmail,
} from "../utils/emailTemplates.js";
//  signup
const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    throw new Error("Please provide all required fields");
  }

  const existingUser = await User.findOne({
    email,
    isDeleted: false,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role: role || "patient", // default role
    verificationToken,
    verificationCodeExpire: Date.now() + 15 * 60 * 1000,
    authProvider: "manual",
  });

  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify/${verificationToken}`;

  await sendEmail({
    to: newUser.email,
    subject: "Verify your email for CareScynify",
    html: verificationEmail(newUser.name, verifyUrl),
  });

  res.status(201).json({
    success: true,
    message: "Signup successful! Check email to verify account.",
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  // console.log("VERIFY TOKEN:", token);

  const user = await User.findOne({
    verificationToken: token,
  });

  // console.log("USER FOUND:", user?._id);
  // console.log("ACCOUNT VERIFIED:", user?.accountVerified);
  // console.log("TOKEN EXPIRE:", user?.verificationCodeExpire);
  // console.log("NOW:", new Date());

  if (!user) {
    return res.status(400).json({
      message: "Invalid or already used verification link",
    });
  }

  const dashboardRoles = ["doctor", "laboratory", "pharmacy", "admin"];

  const frontendUrl = dashboardRoles.includes(user.role)
    ? process.env.DASHBOARD_URL
    : process.env.FRONTEND_URL;

  // console.log("USER ROLE:", user.role);
  // console.log("DASHBOARD_URL:", process.env.DASHBOARD_URL);
  // console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
  // console.log("SELECTED FRONTEND URL:", frontendUrl);

  if (!frontendUrl) {
    return res.status(500).json({
      message: "Frontend URL is not configured",
    });
  }

  // Already verified
  if (user.accountVerified) {
    return res.redirect(`${frontendUrl}/?verified=already`);
  }

  // Expired
  if (
    !user.verificationCodeExpire ||
    user.verificationCodeExpire < Date.now()
  ) {
    return res.status(400).json({
      message: "Verification link has expired",
    });
  }

  // Verify account
  user.accountVerified = true;
  user.verificationToken = undefined;
  user.verificationCodeExpire = undefined;

  await user.save({ validateBeforeSave: false });

  console.log("ACCOUNT VERIFIED SUCCESSFULLY");

  return res.redirect(`${frontendUrl}/?verified=true`);
});
// -------------------- Resend Verification Email
const resendVerification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.accountVerified) {
    return res.status(400).json({
      message: "Account is already verified",
    });
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");

  user.verificationToken = verificationToken;
  user.verificationCodeExpire = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify/${verificationToken}`;

  await sendEmail({
    to: user.email,
    subject: "Verify your email for CareScynify",
    html: verificationEmail(user.name, verifyUrl),
  });

  res.status(200).json({
    success: true,
    message: "Verification email sent successfully",
  });
});

// - login
// const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const existingUsr = await User.findOne({ email });

//   if (!existingUsr) {
//     return res.status(401).json({ message: "User not found" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, existingUsr.password);

//   if (!isPasswordValid) {
//     return res.status(401).json({ message: "Invalid Password" });
//   }
//   if (existingUsr.isDeleted) {
//     return res.status(403).json({
//       message: "Account is deleted",
//     });
//   }

//   const token = generateToken(res, existingUsr._id);

//   res.status(200).json({
//     _id: existingUsr._id,
//     name: existingUsr.name,
//     email: existingUsr.email,
//     role: existingUsr.role,
//     accountVerified: existingUsr.accountVerified,
//     token,
//   });
// });
// -------------------- Login --------------------
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUsr = await User.findOne({ email });

  if (!existingUsr) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUsr.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  if (existingUsr.isDeleted) {
    return res.status(403).json({
      message: "Account is deleted",
    });
  }

  // -------------------- 2FA --------------------
  if (existingUsr.twoFactorEnabled) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    existingUsr.twoFactorOTP = otp;
    existingUsr.twoFactorOTPExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await existingUsr.save({
      validateBeforeSave: false,
    });

    try {
      await sendEmail({
        to: existingUsr.email,
        subject: "CareScynify - Two-Factor Authentication Code",
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Two-Factor Authentication</h2>

            <p>Hello ${existingUsr.name},</p>

            <p>
              Someone is trying to log in to your CareScynify account.
            </p>

            <p>Your verification code is:</p>

            <h1 style="letter-spacing: 8px;">
              ${otp}
            </h1>

            <p>
              This code will expire in 10 minutes.
            </p>

            <p>
              If you did not try to log in, please secure your account.
            </p>
          </div>
        `,
      });
    } catch (error) {
      existingUsr.twoFactorOTP = undefined;
      existingUsr.twoFactorOTPExpire = undefined;

      await existingUsr.save({
        validateBeforeSave: false,
      });

      return res.status(500).json({
        message: "Failed to send 2FA OTP",
      });
    }

    // IMPORTANT:
    // Do NOT generate JWT here.
    // User must verify OTP first.

    return res.status(200).json({
      success: true,
      twoFactorRequired: true,
      message: "2FA OTP sent to your email",
      email: existingUsr.email,
    });
  }

  // -------------------- Normal Login --------------------
  // If 2FA is disabled, login normally.

  const token = generateToken(res, existingUsr._id);

  return res.status(200).json({
    _id: existingUsr._id,
    name: existingUsr.name,
    email: existingUsr.email,
    role: existingUsr.role,
    accountVerified: existingUsr.accountVerified,
    twoFactorRequired: false,
    token,
  });
});
// ---------------------------- logout user
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({
    message: "Logout Successfully",
  });
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
// 2 factor authentication
const toggleTwoFactor = async (req, res) => {
  try {
    // console.log("REQ USER:", req.user);

    const user = await User.findById(req.user._id);

    // console.log("DB USER BEFORE:", user.twoFactorEnabled);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.twoFactorEnabled = !user.twoFactorEnabled;

    await user.save();

    // console.log("DB USER AFTER:", user.twoFactorEnabled);

    res.status(200).json({
      success: true,
      message: "2FA updated successfully",
      twoFactorEnabled: user.twoFactorEnabled,
    });
  } catch (error) {
    // console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// -------------------- Verify 2FA OTP --------------------
const verifyTwoFactorOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
  }

  const user = await User.findOne({
    email,
    twoFactorOTP: otp.toString(),
    twoFactorOTPExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired 2FA OTP",
    });
  }

  // OTP is valid, so remove it
  user.twoFactorOTP = undefined;
  user.twoFactorOTPExpire = undefined;

  await user.save({
    validateBeforeSave: false,
  });

  // Now authentication is completely successful.
  // Generate the real JWT only after 2FA verification.
  const token = generateToken(res, user._id);

  return res.status(200).json({
    success: true,
    message: "2FA verification successful",
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accountVerified: user.accountVerified,
    token,
  });
});
const deleteAccount = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated",
      });
    }

    const userId = req.user._id;

    // console.log("User ID:", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // console.log("User found:", user.email);

    // Cancel user's appointments
    await Appointment.updateMany(
      { user: userId },
      {
        $set: {
          status: "cancelled",
          cancelledBy: "user_deleted_account",
          cancelledAt: new Date(),
        },
      },
    );

    // console.log("Appointments updated");

    // Soft delete user
    user.isDeleted = true;
    user.deletedAt = new Date();
    user.status = "inactive";

    await user.save();

    // console.log("User soft deleted successfully");

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
// change password
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Current password is incorrect",
    });
  }

  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
// -------------------- Google Authentication Handle
// -------------------- Continue with Google --------------------

const googleLogin = asyncHandler(async (req, res) => {
  try {
    // Google profile should be available from Google authentication middleware
    const googleUser = req.user;

    if (!googleUser) {
      return res.status(401).json({
        success: false,
        message: "Google authentication failed",
      });
    }

    // Get Google account information
    const googleId = googleUser.id || googleUser.sub || googleUser.googleId;

    const email = googleUser.email || googleUser.emails?.[0]?.value;

    const name =
      googleUser.name ||
      googleUser.displayName ||
      `${googleUser.given_name || ""} ${googleUser.family_name || ""}`.trim();

    const avatar = googleUser.picture || googleUser.photos?.[0]?.value || null;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google account email is required",
      });
    }

    // Find existing user

    let user = await User.findOne({ email });

    // Existing account

    if (user) {
      // Deleted account cannot login
      if (user.isDeleted) {
        return res.status(403).json({
          success: false,
          message: "Account is deleted",
        });
      }

      // If this is an existing manual account,
      // connect Google authentication to it.
      if (!user.authProvider) {
        user.authProvider = "google";
      }

      // If user already has a manual account,
      // don't overwrite their password.
      if (user.authProvider === "manual") {
        return res.status(400).json({
          success: false,
          message:
            "An account already exists with this email. Please login with your email and password.",
        });
      }

      // Update Google ID if you have this field
      if (googleId && !user.googleId) {
        user.googleId = googleId;
      }

      // Keep account verified because Google verified the email
      user.accountVerified = true;

      // Update avatar only if your schema supports it
      // and your avatar field expects a string.
      //
      // If your avatar field is an object, don't use this directly.
      // user.avatar = avatar;

      await user.save({
        validateBeforeSave: false,
      });

      // Generate JWT
      const token = generateToken(res, user._id);

      return res.status(200).json({
        success: true,
        message: "Google login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountVerified: user.accountVerified,
        twoFactorRequired: false,
        token,
      });
    }

    // New Google account

    user = await User.create({
      name: name || "Google User",
      email,
      role: "patient",

      // IMPORTANT:
      // Do NOT provide password here.
      authProvider: "google",

      // Google already verified the email
      accountVerified: true,

      ...(googleId ? { googleId } : {}),
    });

    // Generate JWT
    const token = generateToken(res, user._id);

    return res.status(201).json({
      success: true,
      message: "Google account created successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accountVerified: user.accountVerified,
      twoFactorRequired: false,
      token,
    });
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error: error.message,
    });
  }
});
// export controllers
export {
  signup,
  login,
  logoutCurrentUser,
  forgotPassword,
  verifyEmail,
  verifyOtp,
  resetPassword,
  resendResetPasswordOTP,
  toggleTwoFactor,
  deleteAccount,
  changePassword,
  resendVerification,
  verifyTwoFactorOTP,
  googleLogin,
};
