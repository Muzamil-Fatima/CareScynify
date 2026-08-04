import express from "express";
import {
  getAllPharmacies,
  getPharmacyById,
  filterPharmacies,
  searchPharmacies,
} from "../../controllers/userSite/publicPharmacyController.js";

const router = express.Router();

// Get all pharmacies
router.get("/", getAllPharmacies);

// Search pharmacies
router.get("/search", searchPharmacies);

// Filter pharmacies
router.get("/filter", filterPharmacies);

// Get pharmacy by ID
router.get("/:id", getPharmacyById);

export default router;
