import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  bookLabSample,
  getMyLabTests,
} from "../../controllers/laboratory/bookLabTest.js";

const router = express.Router();

router.post("/book-test", protect, bookLabSample);
router.get("/my-tests", protect, getMyLabTests);
export default router;
