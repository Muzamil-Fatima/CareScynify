import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  bookLabSample,
  getMyLabTests,
  getMyLabTestById,
} from "../../controllers/laboratory/bookLabTest.js";

const router = express.Router();

router.post("/book-test", protect, bookLabSample);
router.get("/my-tests", protect, getMyLabTests);
// Get a single booked lab test by ID
router.get("/my-tests/:id", protect, getMyLabTestById);
export default router;
