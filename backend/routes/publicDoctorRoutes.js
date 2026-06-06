import express from "express";
import { getDoctors } from "../controllers/publicDoctorController.js";
const router = express.Router();

router.get("/", getDoctors);
export default router;
