import express from "express";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import {
  updateDoctorEducation,
  updateDoctorWorkplaces,
  updateDoctorLanguages,
  updateDoctorExperience,
} from "../controllers/doctor/doctorSettingsController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

// Get logged-in doctor profile
router.get("/profile", protect, getDoctorProfile);
// Update profile (AUTO-SAVE USE)
router.put("/profile", protect, updateDoctorProfile);
// Update doctor education
router.put("/education", protect, updateDoctorEducation);
// Update doctor workplaces
router.put("/workplaces", protect, updateDoctorWorkplaces);

// Update doctor languages
router.put("/languages", protect, updateDoctorLanguages);
// Update doctor experience
router.put("/experience", protect, updateDoctorExperience);

export default router;
