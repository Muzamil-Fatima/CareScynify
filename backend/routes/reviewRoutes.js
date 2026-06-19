import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createReview,
  getDoctorReviews,
  getMyReviews,
  getReviewByAppointment 
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/my", protect, getMyReviews);
router.get("/doctor/me", protect, getDoctorReviews);
router.get("/appointment/:appointmentId", getReviewByAppointment);
export default router;
