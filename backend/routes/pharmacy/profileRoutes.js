import express from "express";

import {
  getPharmacyProfile,
  updatePharmacyProfile,
} from "../../controllers/pharmacy/profileController.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Get Pharmacy Profile
router.get("/profile", protect, getPharmacyProfile);

// Update Pharmacy Profile
router.put("/profile", protect, updatePharmacyProfile);

export default router;