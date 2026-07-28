import express from "express";
import {
  createLabReport,
  getLabReports,
  getLabReportById,
  updateLabReport,
  deleteLabReport,
} from "../../controllers/laboratory/labReportController.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createLabReport);
router.get("/", protect, getLabReports);
router.get("/:id", protect, getLabReportById);
router.put("/:id", protect, updateLabReport);
router.delete("/:id", protect, deleteLabReport);

export default router;