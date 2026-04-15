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
import authRouter from "./router/authRoutes.js";
import patientsRoutes from "./router/patientsRoutes.js";
import doctorRouter from "./router/doctorRouter.js";
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
app.use("/api/auth", authRouter);

// use patient routes
app.use("/api/patients", patientsRoutes);
// dr router
app.use("/api/doctor", doctorRouter);
// server listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
