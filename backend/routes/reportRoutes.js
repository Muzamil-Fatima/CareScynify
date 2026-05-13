import express from "express";
import { createReport } from "../controllers/reportController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/upload", upload.single("file"), createReport);

export default router;