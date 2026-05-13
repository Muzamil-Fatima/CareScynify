import express from "express";
import {
  getAllPatients,
  getPatientProfile,
  updatePatientProfile,
} from "../controllers/patientsController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all patients (admin use)
router.get("/", getAllPatients);

// Get logged-in patient profile
router.get("/profile", protect, getPatientProfile);

// Update profile (AUTO-SAVE USE)
router.put("/profile", protect, updatePatientProfile);

export default router;
