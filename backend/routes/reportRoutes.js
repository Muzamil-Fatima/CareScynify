import express from "express";
import { addReport, getReports } from "../controllers/reportController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/add-report", protect, addReport);
router.get("/get-report", protect, getReports);

export default router;
