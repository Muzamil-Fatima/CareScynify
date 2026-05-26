import express from "express";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import {
  updateDoctorWorkplaces,
  updateDoctorLanguages,
  updateDoctorExperience,
} from "../controllers/doctor/doctorSettingsController.js";
import { updateDoctorEducation } from "../controllers/doctor/doctorEducationController.js";
import {
  addSchedule,
  updateSchedule,
  deleteSchedule,
  getDoctorSchedule,
  getAvailableSlots,
  updateWorkplaceSchedule,
} from "../controllers/doctor/doctorScheduleController.js";
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
// Get doctor schedule
router.get("/schedule", protect, getDoctorSchedule);
// Add single workplace schedule
router.post("/schedule", protect, addSchedule);
router.put("/schedule/:workplaceId", protect, updateWorkplaceSchedule);
// Update single workplace schedule
router.put("/schedule/:workplaceId", protect, updateSchedule);
// Delete single workplace schedule
router.delete("/schedule/:workplaceId", protect, deleteSchedule);
// Get available slots for a workplace and day
router.get("/schedule/slots", protect, getAvailableSlots);

export default router;
