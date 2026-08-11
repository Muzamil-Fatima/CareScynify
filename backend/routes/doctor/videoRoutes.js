import express from "express";
import { joinVideoConsultation } from "../../controllers/doctor/videoController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

// Join an online video consultation
router.post("/join/:appointmentId", protect, joinVideoConsultation);

export default router;
