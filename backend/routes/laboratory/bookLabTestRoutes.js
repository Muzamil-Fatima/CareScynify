import express from "express";
import { protect } from "../../middleware/auth.js";
import { bookLabSample } from "../../controllers/laboratory/bookLabTest.js";

const router = express.Router();

router.post("/book-test", protect, bookLabSample);

export default router;
