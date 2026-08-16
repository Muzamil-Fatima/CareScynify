import express from "express";
import { protect } from "../middleware/auth.js";

import {
  getAvailableSlots,
  reserveSlot,
  createAppointment,
  getUserAppointments,
  getDoctorAppointments,
  getDoctorPatientAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  deleteAppointment,
  doctorCreateAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

/*  SLOT SYSTEM  */
router.get("/slots", protect, getAvailableSlots);
router.post("/reserve", protect, reserveSlot);

/*  APPOINTMENTS  */
router.post("/", protect, createAppointment);
router.get("/", protect, getUserAppointments);

router.get("/doctor", protect, getDoctorAppointments);
router.get("/:id", protect, getAppointmentById);
router.get("/doctor/patient/:patientId", protect, getDoctorPatientAppointments);
/*  UPDATE / CANCEL  */
router.patch("/:id/status", protect, updateAppointmentStatus);
router.patch("/:id/cancel", protect, cancelAppointment);

/*  DELETE  */
router.delete("/:id", protect, deleteAppointment);
router.post("/doctor/create", protect, doctorCreateAppointment);
export default router;
