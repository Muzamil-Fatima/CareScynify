// authRoutes.js
import express from "express";
import passport from "passport";
import generateToken from "../utils/sendToken.js";
import { protect } from "../middleware/auth.js";
import {
  signup,
  login,
  logoutCurrentUser,
  forgotPassword,
  verifyEmail,
  verifyOtp,
  resetPassword,
  // resendVerification,
  resendResetPasswordOTP,
} from "../controllers/authController.js";
const router = express.Router();

// routes
router.post("/", signup);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);
router.get("/logout", logoutCurrentUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/resend-reset-otp", resendResetPasswordOTP);
// router.post("/resend-verification", resendVerification);
// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    try {
      // use generateToken to create JWT and set Cookie
      const token = generateToken(res, req.user._id);
      // redirect to frontend
      res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
    } catch (error) {
      console.log("Google Login error:", error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=google_failed`);
    }
  }
);
// Current user info
router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});
// your routes here
export default router;
