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
  toggleTwoFactor,
  resendVerification,
  resendResetPasswordOTP,
  deleteAccount,
  changePassword,
  verifyTwoFactorOTP,
} from "../controllers/authController.js";
const router = express.Router();

// routes
router.post("/", signup);
router.post("/login", login);
router.post("/verify-2fa", verifyTwoFactorOTP);
router.get("/verify/:token", verifyEmail);
router.get("/logout", logoutCurrentUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/resend-reset-otp", resendResetPasswordOTP);
router.put("/change-password", protect, changePassword);
router.patch("/toggle-2fa", protect, toggleTwoFactor);
router.delete("/delete-account", protect, deleteAccount);
router.post("/resend-verification", protect, resendVerification);
// -------------------- GOOGLE OAUTH --------------------

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
    session: false,
  }),
  (req, res) => {
    try {
      if (!req.user?._id) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=google_failed`,
        );
      }

      // Generate JWT and set cookie
      const token = generateToken(res, req.user._id);

      // Redirect frontend
      return res.redirect(
        `${process.env.FRONTEND_URL}/oauth-success?token=${token}`,
      );
    } catch (error) {
      console.error("Google callback error:", error);

      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=google_failed`,
      );
    }
  },
);

// Current user info
router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});
export default router;
