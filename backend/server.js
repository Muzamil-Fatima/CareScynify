import "dotenv/config";
import "./config/passport.js";
import passport from "passport";
import express from "express";
import cors from "cors";
import cookiesParser from "cookie-parser";
//Files
import connectDB from "./config/database.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoutes from "./router/userRoutes.js";
import authRoutes from "./router/authRoutes.js";
import patientsRoutes from "./router/patientsRoutes.js";
import doctorRoutes from "./router/doctorRoutes.js";
import reportRoutes from "./router/reportRoutes.js";
import { removeUnverifiedAccount } from "./auto/removeUnverifiedAccounts.js";

//Configuration
connectDB();
connectCloudinary();
//Building Server
const app = express();
removeUnverifiedAccount();
app.use(passport.initialize());

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
// removeUnverifiedAccounts();

// allow request
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// use patient routes
app.use("/api/patient", patientsRoutes);
// dr router
app.use("/api/doctor", doctorRoutes);
// report router
app.use("/api/report", reportRoutes);
// server listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
