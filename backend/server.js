import cors from "cors";
import path from "path";
import http from "http";
import express from "express";
import passport from "passport";
import { fileURLToPath } from "url";
import cookiesParser from "cookie-parser";

import "dotenv/config";
import "./config/passport.js";
import { initSocket } from "./config/socket.js";
//Files connection
import connectDB from "./config/database.js";
import connectCloudinary from "./config/cloudinary.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// import { removeUnverifiedAccount } from "./auto/removeUnverifiedAccounts.js";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { sendAppointmentReminders } from "./controllers/appointmentController.js";
// patient routes
import reportRoutes from "./routes/reportRoutes.js";
import patientsRoutes from "./routes/patientsRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import patientChatbotRoutes from "./routes/../routes/chatbot/patientChatbotRoutes.js";
// doctor routes
import doctorRoutes from "./routes/doctor/doctorRoutes.js";
import prescriptionRoutes from "./routes/doctor/prescriptionRoutes.js";
import doctorPatientRoutes from "./routes/doctor/doctorPatientRoutes.js";
import doctorDashboardRoutes from "./routes/doctor/doctorDashboardRoutes.js";
import videoRoutes from "./routes/doctor/videoRoutes.js";
import globalSearchRoutes from "./routes/doctor/globalSearchRoutes.js";
import doctorChatbotRoutes from "./routes/chatbot/doctorChatbotRoutes.js";
// pharmacy
import medicineRoutes from "./routes/pharmacy/medicineRoutes.js";
import profileRoutes from "./routes/pharmacy/profileRoutes.js";
import cartRoutes from "./routes/pharmacy/cartRoutes.js";
import pharmacyOrderRoutes from "./routes/pharmacy/pharmacyOrderRoutes.js";
import pharmacyDashboardRoutes from "./routes/pharmacy/pharmacyDashboardRoutes.js";
import directSaleRoutes from "./routes/pharmacy/directSaleRoutes.js";
// website
import publicDoctorRoutes from "./routes/userSite/publicDoctorRoutes.js";
import publicPharmacyRoutes from "./routes/userSite/publicPharmacyRoutes.js";
import publicMedicineRoutes from "./routes/userSite/publicMedicineRoutes.js";
import publicLabRoutes from "./routes/userSite/publicLabRoutes.js";
import publicLabTestRoutes from "./routes/userSite/publicLabTestRoutes.js";
import bookLabTestRoutes from "./routes/laboratory/bookLabTestRoutes.js";
// laboratory
import labProfileRoutes from "./routes/laboratory/labProfileRoutes.js";
import labTestRoutes from "./routes/laboratory/labTestRoutes.js";
import labAddPatientRoutes from "./routes/laboratory/labAddPatientRoutes.js";
import labSampleRoutes from "./routes/laboratory/labSampleRoutes.js";
import labReportRoutes from "./routes/laboratory/labReportRoutes.js";
import labDashboardRoutes from "./routes/laboratory/labDashboardRoutes.js";
// admin
import adminRoutes from "./routes/admin/adminRoutes.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js"
import adminVerificationRoutes from "./routes/admin/adminVerificationRoutes.js"
//Configuration
connectDB();
connectCloudinary();
//Building Server
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
// removeUnverifiedAccount();
app.use(passport.initialize());

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
// Serve locally uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      if (filePath.toLowerCase().endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      }
    },
  }),
);
// allow request
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
};
// ====================
app.use(cors(corsOptions));
setInterval(() => {
  sendAppointmentReminders();
}, 60 * 1000);
// ======================================= website
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notifications", notificationRoutes);
//  user routes
app.use("/api/user", userRouter);
// use patient routes
app.use("/api/patient", patientsRoutes);
app.use("/api/pharmacies", publicPharmacyRoutes);
app.use("/api/medicine", publicMedicineRoutes);
// public doctor routes
app.use("/api/doctors", publicDoctorRoutes);
// public lab routes
app.use("/api/labs", publicLabRoutes);
app.use("/api/lab/test", publicLabTestRoutes);
// chatbot
app.use("/api/patient/chatbot", patientChatbotRoutes);
// ========================================= dr router
app.use("/api/doctor", doctorRoutes);
// report router
app.use("/api/report", reportRoutes);
// book lab test
app.use("/api/lab-booking", bookLabTestRoutes);
// appointment routes
app.use("/api/appointments", appointmentRoutes);
// prescription routes
app.use("/api/prescription", prescriptionRoutes);
// review routes
app.use("/api/review", reviewRoutes);
// symptom Analysis
app.use("/api/symptomAnalysis", symptomRoutes);
app.use("/api/doctor-patients", doctorPatientRoutes);
app.use("/api/doctor/dashboard", doctorDashboardRoutes);
app.use("/api/doctor/video/call", videoRoutes);
app.use("/api/global/search", globalSearchRoutes);
app.use("/api/doctor/chatbot", doctorChatbotRoutes);
// ================================================== pharmacy
app.use("/api/medicineRoutes", medicineRoutes);
app.use("/api/pharmacy", profileRoutes);
app.use("/api/cart", cartRoutes);
// Pharmacy Order Routes
app.use("/api/pharmacy/orders", pharmacyOrderRoutes);
app.use("/api/pharmacy/dashboard", pharmacyDashboardRoutes);
app.use("/api/direct-sales", directSaleRoutes);
// =======================================================Lab
app.use("/api/laboratory", labProfileRoutes);
app.use("/api/lab-tests", labTestRoutes);
app.use("/api/lab/patients", labAddPatientRoutes);
app.use("/api/lab-samples", labSampleRoutes);
app.use("/api/lab-reports", labReportRoutes);
app.use("/api/lab/dashboard", labDashboardRoutes);
// ======================================================== Admin
app.use("/api/admin", adminRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/verified", adminVerificationRoutes);
// server listen
const server = http.createServer(app);

//  INIT SOCKET FIRST
const io = initSocket(server);

//  NOW ATTACH IO TO APP
app.set("io", io);
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
