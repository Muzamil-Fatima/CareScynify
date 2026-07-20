import express from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../controllers/pharmacy/profileController.js";
import { protect } from "../../middleware/auth.js";

const route = express.Router();