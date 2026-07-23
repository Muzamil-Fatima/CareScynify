import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createReview,
  getDoctorReviews,
  getMyReviews,
  getReviewByAppointment,
  getPublicDoctorReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/my", protect, getMyReviews);
router.get("/doctor/me", protect, getDoctorReviews);
router.get("/appointment/:appointmentId", getReviewByAppointment);
router.get("/doctor/:doctorId", getPublicDoctorReviews);
export default router;
