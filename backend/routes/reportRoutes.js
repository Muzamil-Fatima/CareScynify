import express from "express";
import { addReport, getReports } from "../controllers/reportController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/add-report", protect, upload.single("file"), addReport);
router.get("/get-report", protect, getReports);

export default router;
