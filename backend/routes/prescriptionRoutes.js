import express from "express";
import {
createPrescription,
updatePrescription,
getPrescriptionByAppointment,
getPatientPrescriptions,
getPrescriptionById,
deletePrescription,


  getMyPrescriptions,
  getMyPrescriptionById,
} from "../controllers/doctor/prescriptionController.js";

import { protect } from "../middleware/auth.js";
const router = express.Router();

// Create
router.post("/", protect, createPrescription);

// Patient History
router.get("/patient/:patientId", protect, getPatientPrescriptions);

// Appointment Prescription
router.get(
  "/appointment/:appointmentId",
  protect,
  getPrescriptionByAppointment
);

// Patient routes
router.get("/getMyPrescriptions", protect, getMyPrescriptions);

router.get(
  "/getMyPrescriptionById/:prescriptionId",
  protect,
  getMyPrescriptionById
);

// Single Prescription
router.get("/:prescriptionId", protect, getPrescriptionById);

// Update
router.put("/:prescriptionId", protect, updatePrescription);

// Delete
router.delete("/:prescriptionId", protect, deletePrescription);

export default router;