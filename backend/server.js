import cors from "cors";
import "dotenv/config";
import "./config/passport.js";
import passport from "passport";
import express from "express";
import cookiesParser from "cookie-parser";
import http from "http";
import { initSocket } from "./config/socket.js";

//Files
import connectDB from "./config/database.js";
import connectCloudinary from "./config/cloudinary.js";
import authRoutes from "./routes/authRoutes.js";
import patientsRoutes from "./routes/patientsRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import { removeUnverifiedAccount } from "./auto/removeUnverifiedAccounts.js";
import userRouter from "./routes/userRoutes.js";
import publicDoctorRoutes from "./routes/publicDoctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import doctorPatientRoutes from "./routes/doctorPatientRoutes.js";
// pharmacy
import medicineRoutes from "./routes/pharmacy/medicineRoutes.js";
import profileRoutes from "./routes/pharmacy/profileRoutes.js";
// website 
import publicPharmacyRoutes from "./routes/publicPharmacyRoutes.js"
//Configuration
connectDB();
connectCloudinary();
//Building Server
const app = express();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
removeUnverifiedAccount();
app.use(passport.initialize());

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
// removeUnverifiedAccounts();

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
app.use(cors(corsOptions));
// ========================== website
// Routes
app.use("/api/auth", authRoutes);
//  user routes
app.use("/api/user", userRouter);
// use patient routes
app.use("/api/patient", patientsRoutes);
app.use("/api/public/pharmacies", publicPharmacyRoutes);
// dr router
app.use("/api/doctor", doctorRoutes);
// report router
app.use("/api/report", reportRoutes);
// public doctor routes
app.use("/api/doctors", publicDoctorRoutes);
// appointment routes
app.use("/api/appointments", appointmentRoutes);
// prescription routes
app.use("/api/prescription", prescriptionRoutes);
// review routes
app.use("/api/review", reviewRoutes);
// symptom Analysis
app.use("/api/symptomAnalysis", symptomRoutes);
app.use("/api/doctor-patients", doctorPatientRoutes);
// pharmacy
app.use("/api/medicineRoutes", medicineRoutes);
app.use("/api/pharmacy", profileRoutes);
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
