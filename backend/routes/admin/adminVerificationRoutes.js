import express from "express";

import {
  getVerificationRequests,
  getVerificationRequestById,
  approveVerification,
  rejectVerification,
  getVerificationStats,
} from "../../controllers/admin/adminVerificationController.js";

const router = express.Router();

// Get all verification requests
router.get("/verification", getVerificationRequests);

// Get verification statistics
router.get("/verification/stats", getVerificationStats);

// Get single verification request by user ID
router.get("/verification/:userId", getVerificationRequestById);

// Approve verification
router.patch("/verification/:userId/approve", approveVerification);

// Reject verification
router.patch("/verification/:userId/reject", rejectVerification);

export default router;