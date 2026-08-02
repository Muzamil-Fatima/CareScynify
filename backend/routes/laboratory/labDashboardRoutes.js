import express from "express";
import {
  getLabDashboardStats,
  getRecentSamples,
  getTestPerformance,
  getMonthlyReports,
  getPendingSamples,
} from "../../controllers/laboratory/labDashboardController.js";

import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.get("/stats", protect, getLabDashboardStats);

router.get("/recent-samples", protect, getRecentSamples);

router.get("/test-performance", protect, getTestPerformance);

router.get("/monthly-reports", protect, getMonthlyReports);

router.get("/pending-samples", protect, getPendingSamples);

export default router;
