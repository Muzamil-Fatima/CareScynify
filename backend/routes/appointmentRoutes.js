import express from "express";
import {
  createAppointment,
  getDoctorAppointments,
  getUserAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  deleteAppointment,
  getAvailableSlots,
  reserveSlot,
} from "../controllers/appointmentController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/slots", protect, getAvailableSlots);
router.post("/reserve", protect, reserveSlot);

router.post("/", protect, createAppointment);

router.get("/", protect, getUserAppointments);
router.get("/doctor/:doctorId", protect, getDoctorAppointments);
router.get("/:id", protect, getAppointmentById);

router.patch("/:id/status", protect, updateAppointmentStatus);
router.patch("/:id/cancel", protect, cancelAppointment);

router.delete("/:id", protect, deleteAppointment);

export default router;