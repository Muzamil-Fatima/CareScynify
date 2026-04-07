import express from "express";
import { addDr } from "../controllers/doctorController.js";

const router = express.Router();

// Route to add a new doctor
router.post("/addDr", addDr);

export default router;
