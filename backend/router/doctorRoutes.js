import express from "express";
import { addDr } from "../controllers/doctorController.js";

const router = express.Router();

// Route to add a new doctor
router.post("/addDr", addDr);
// get doctor by id 
router.get("/getDoctor/:id", getDoctorById);
export default router;
