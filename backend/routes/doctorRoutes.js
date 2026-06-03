import express from "express";
import {
  getDoctorProfile,
  updateDoctorProfile,
  addDoctorEducation,
  updateDoctorEducation,
  deleteDoctorEducation,
  addDoctorExperience,
  updateDoctorExperience,
  deleteDoctorExperience,
} from "../controllers/doctorController.js";
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
import { updateWorkplaceSettings } from "../controllers/doctor/workplaceSettingsController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

// Get logged-in doctor profile
router.get("/profile", protect, getDoctorProfile);
// Update profile (AUTO-SAVE USE)
router.put("/profile", protect, updateDoctorProfile);

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
  "/workplaces/:workplaceId/settings",
  protect,
  updateWorkplaceSettings,
);
// --------------------------------------------------Education
// Update doctor education
router.post("/education", protect, addDoctorEducation);
router.put("/education/:id", protect, updateDoctorEducation);
router.delete("/education/:id", protect, deleteDoctorEducation);
// --------------------------------------------------- Experience
// Update doctor experience
router.post("/experience", protect, addDoctorExperience);
router.put("/experience/:id", protect, updateDoctorExperience);
router.delete("/experience/:id", protect, deleteDoctorExperience);

// ---------------------------Consultation Hours (Per Day) according to Place
router.get("/consultant", protect, getConsultantHours);
router.post("/consultant", protect, addConsultantHours);
router.put("/consultant/:workplaceId", protect, updateConsultantHours);
router.delete("/consultant/:workplaceId", protect, deleteConsultantHours);
router.get("/consultant/slots", protect, getConsultantSlots);

export default router;
