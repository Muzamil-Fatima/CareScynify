import express from "express";

import {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
} from "../../controllers/laboratory/labAddPatientController.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.post("/", protect, addPatient);

router.get("/", protect, getPatients);

router.put("/:id", protect, updatePatient);

router.delete("/:id", protect, deletePatient);

export default router;