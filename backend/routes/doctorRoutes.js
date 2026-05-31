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
  addWorkplace,
  updateWorkplace,
  deleteWorkplace,
  getWorkplaces,
} from "../controllers/doctor/doctorWorkPlacesController.js";
import {
  getConsultantHours,
  addConsultantHours,
  updateConsultantHours,
  deleteConsultantHours,
  getConsultantSlots,
} from "../controllers/doctor/doctorConsultantController.js";
import { updateWorkplaceSettings } from "../controllers/doctor/WorkplaceSettingsController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

// Get logged-in doctor profile
router.get("/profile", protect, getDoctorProfile);
// Update profile (AUTO-SAVE USE)
router.put("/profile", protect, updateDoctorProfile);
// Update doctor education
router.put("/education", protect, updateDoctorEducation);
// ------------------------------------------------------ WorkPlace
// add work places
router.post("/workplaces", protect, addWorkplace);
// update work places by id
router.put("/workplaces/:id", protect, updateWorkplace);
// delete work places by id
router.delete("/workplaces/:id", protect, deleteWorkplace);
// get doctor workplaces
router.get("/workplaces", protect, getWorkplaces);
// ------------------------------------------------------workplace setting
router.patch(
  "/workplaces/:workplaceId/settings", protect,
  updateWorkplaceSettings,
);
// --------------------------------------------------- Language
// Update doctor languages
router.put("/languages", protect, updateDoctorLanguages);
// Update doctor experience
router.put("/experience", protect, updateDoctorExperience);
// ---------------------------Consultation Hours (Per Day) according to Place
router.get("/consultant", protect, getConsultantHours);
router.post("/consultant", protect, addConsultantHours);
router.put("/consultant/:workplaceId", protect, updateConsultantHours);
router.delete("/consultant/:workplaceId", protect, deleteConsultantHours);
router.get("/consultant/slots", protect, getConsultantSlots);

export default router;
