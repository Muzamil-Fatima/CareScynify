import express from "express";
import {
  createPrescription,
  updatePrescription,
  deletePrescription,
  getPrescriptionById,
  getPrescriptionByAppointment,
  getPatientPrescriptions,
} from "../../controllers/doctor/prescriptionController.js";

import protect from "../../middleware/authMiddleware.js";

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

// Single Prescription
router.get("/:prescriptionId", protect, getPrescriptionById);

// Update
router.put("/:prescriptionId", protect, updatePrescription);

// Delete
router.delete("/:prescriptionId", protect, deletePrescription);

export default router;
import express from "express";
import {
  getMyPrescriptions,
  getMyPrescriptionById,
} from "../../controllers/patient/prescriptionController.js";

import protect from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMyPrescriptions);

router.get("/:prescriptionId", protect, getMyPrescriptionById);

export default router;