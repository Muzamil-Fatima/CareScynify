import express from "express";
import {
  getDoctorProfile,
  updateDoctorProfile,
  updateEducation,
  updateWorkplaces,
} from "../controllers/doctorController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

// Get logged-in doctor profile
router.get("/profile", protect, getDoctorProfile);
// Update profile (AUTO-SAVE USE)
router.put("/profile", protect, updateDoctorProfile);
// Update doctor education
router.put("/education", protect, updateEducation);
// Update doctor workplaces
router.put("/workplaces", protect, updateWorkplaces);

export default router;
