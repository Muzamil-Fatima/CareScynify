import express from "express";

import {
  createLabTest,
  getLabTests,
  updateLabTest,
  deleteLabTest,
} from "../../controllers/laboratory/labTestController.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Get All Lab Tests
router.get("/", protect, getLabTests);

// Create Lab Test
router.post("/", protect, createLabTest);

// Update Lab Test
router.put("/:id", protect, updateLabTest);

// Delete Lab Test
router.delete("/:id", protect, deleteLabTest);

export default router;
