import express from "express";

import {
  createLabSample,
  getLabSamples,
  getLabSampleById,
  updateLabSampleStatus,
  updateTestStatus,
  deleteLabSample,
} from "../../controllers/laboratory/labSampleController.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Create Lab Sample
router.post("/", protect, createLabSample);

// Get All Lab Samples
router.get("/", protect, getLabSamples);

// Get Single Lab Sample
router.get("/:id", protect, getLabSampleById);

// Update Overall Sample Status
router.put("/:id/status", protect, updateLabSampleStatus);

// Update Individual Test Status
router.put("/:id/test-status", protect, updateTestStatus);

// Delete Lab Sample
router.delete("/:id", protect, deleteLabSample);

export default router;
