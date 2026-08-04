import express from "express";

import {
  getAllMedicines,
  getMedicineById,
  searchMedicine,
  filterMedicine,
  getMedicinesByPharmacy,
} from "../../controllers/userSite/publicMedicineController.js";

const router = express.Router();

// All medicines
router.get("/", getAllMedicines);

// Search medicines
router.get("/search", searchMedicine);

// Filter medicines
router.get("/filter", filterMedicine);

// All medicines of a pharmacy
router.get("/pharmacy/:pharmacyId", getMedicinesByPharmacy);

// Medicine details
router.get("/:id", getMedicineById);

export default router;