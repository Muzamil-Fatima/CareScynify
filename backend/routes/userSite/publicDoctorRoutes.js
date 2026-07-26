import express from "express";

import {
  getDoctors,
  getDoctorById,
  searchDoctors,
  filterDoctors,
} from "../../controllers/userSite/publicDoctorController.js";

const router = express.Router();

// all doctors
router.get("/", getDoctors);

// search doctors
router.get("/search", searchDoctors);

// filter doctors
router.get("/filter", filterDoctors);

// doctor profile
router.get("/:id", getDoctorById);

export default router;
