import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addDoctorPatient,
  updateDoctorPatient,
  deleteDoctorPatient,
  getDoctorPatient,
  getDoctorPatients
} from "../controllers/DoctorPatientController.js";

const router = express.Router();

// Add Doctor Patient
router.post("/", protect, addDoctorPatient);

// Get Doctor Patient
router.get("/:id", protect, getDoctorPatient);

// Update Doctor Patient
router.put("/:id", protect, updateDoctorPatient);

// Delete Doctor Patient
router.delete("/:id", protect, deleteDoctorPatient);
router.get("/", protect, getDoctorPatients);
export default router;