import express from "express";
import { getAdminDashboard } from "../../controllers/admin/adminDashboardController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", protect, getAdminDashboard);

export default router;
