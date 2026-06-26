import express from "express";
import {
  analyzeSymptoms,
  getPatientHistory,
} from "../controllers/symptomController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.post("/analyze", protect, analyzeSymptoms);
router.get("/history/:userId", getPatientHistory);

export default router;
