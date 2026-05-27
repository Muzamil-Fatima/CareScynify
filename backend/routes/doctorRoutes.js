import express from "express";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import {
  updateDoctorLanguages,
  updateDoctorExperience,
} from "../controllers/doctor/doctorSettingsController.js";
import { updateDoctorEducation } from "../controllers/doctor/doctorEducationController.js";
import {
  addSchedule,
  deleteSchedule,
  getDoctorSchedule,
  getAvailableSlots,
  updateWorkplaceSchedule,
} from "../controllers/doctor/doctorScheduleController.js";
import {
  addWorkplace,
  updateWorkplace,
  deleteWorkplace,
  getWorkplaces,
} from "../controllers/doctor/doctorWorkPlacesController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

// Get logged-in doctor profile
router.get("/profile", protect, getDoctorProfile);
// Update profile (AUTO-SAVE USE)
router.put("/profile", protect, updateDoctorProfile);
// Update doctor education
router.put("/education", protect, updateDoctorEducation);
// add work places
router.post("/workplaces", protect, addWorkplace);
// update work places by id
router.put("/workplaces/:id", protect, updateWorkplace);
// delete work places by id
router.delete("/workplaces/:id", protect, deleteWorkplace);
// get doctor workplaces
router.get("/workplaces", protect, getWorkplaces);

// Update doctor languages
router.put("/languages", protect, updateDoctorLanguages);
// Update doctor experience
router.put("/experience", protect, updateDoctorExperience);
// Get doctor schedule
router.get("/schedule", protect, getDoctorSchedule);
// Add single workplace schedule
router.post("/schedule", protect, addSchedule);
router.put("/schedule/:workplaceId", protect, updateWorkplaceSchedule);
// Delete single workplace schedule
router.delete("/schedule/:workplaceId", protect, deleteSchedule);
// Get available slots for a workplace and day
router.get("/schedule/slots", protect, getAvailableSlots);

export default router;
