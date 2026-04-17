import express from "express";
import {
  getAllPatients,
  getPatientProfile,
} from "../controllers/patientsController.js";
const router = express.Router();

// Route to get all patients
router.get("/", getAllPatients);
router.get("/profile", getPatientProfile);
// router.put("/profile", updatePatientProfile);
// Export router
export default router;
