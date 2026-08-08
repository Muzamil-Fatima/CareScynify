import express from "express";
import {protect} from "../../middleware/auth.js";

import { getDoctorDashboard } from "../../controllers/doctor/doctorDashboard.js";

const router = express.Router();

router.get("/", protect, getDoctorDashboard);

export default router;
