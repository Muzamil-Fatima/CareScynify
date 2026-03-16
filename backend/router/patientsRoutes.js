import express from "express";
import { getAllPatients } from "../controllers/patientsController.js";
const router = express.Router();

// Route to get all patients
router.get("/", getAllPatients);

// Export router
export default router;
