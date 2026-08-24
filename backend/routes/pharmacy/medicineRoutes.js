import express from "express";

import {
  addMedicine,
  getMedicines,
  searchMedicines,
  updateMedicine,
  deleteMedicine,
  getMedicineById,
  getMedicineStats,
} from "../../controllers/pharmacy/medicineController.js";

import { protect } from "../../middleware/auth.js";
import upload from "../../middleware/upload.js";

const router = express.Router();

// Add Medicine
router.post("/addMedicine", protect, upload.array("images", 4), addMedicine);

// Get All Medicines
router.get("/getMedicine", protect, getMedicines);

// Search Medicines
router.get("/search", protect, searchMedicines);

// Medicine Stats
router.get("/stats", protect, getMedicineStats);

// Get Single Medicine
// IMPORTANT: keep this AFTER /search and /stats
router.get("/:medicineId", protect, getMedicineById);

// Update Medicine
router.put("/:medicineId", protect, upload.array("images", 4), updateMedicine);

// Delete Medicine
router.delete("/:medicineId", protect, deleteMedicine);

export default router;
