import express from "express";

import {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} from "../../controllers/pharmacy/medicineController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Add Medicine
router.post("/addMedicine", protect, addMedicine);

// Get Medicines
router.get("/getMedicine", protect, getMedicines);

// Update Medicine
router.put("/:medicineId", protect, updateMedicine);

// Delete Medicine
router.delete("/:medicineId", protect, deleteMedicine);

export default router;