import express from "express";

import {
  getLabProfile,
  updateLabProfile,
} from "../../controllers/laboratory/labProfileController.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Get Laboratory Profile
router.get("/profile", protect, getLabProfile);

// Update Laboratory Profile
router.put("/profile", protect, updateLabProfile);

export default router;