import express from "express";

import { getPharmacyDashboard } from "../../controllers/pharmacy/pharmacyDashboard.js";;

import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getPharmacyDashboard);

export default router;
