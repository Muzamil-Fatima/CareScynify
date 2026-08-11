import express from "express";
import { globalSearch } from "../../controllers/doctor/globalSearchController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", protect, globalSearch);

export default router;
