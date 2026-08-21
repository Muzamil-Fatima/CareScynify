import express from "express";

import {
  getUsers,
  getUserById,
  verifyUser,
  rejectUser,
  suspendUser,
  activateUser,
  toggleUserStatus,
  deleteUser,
  restoreUser,
  getUserStats,
} from "../../controllers/admin/adminUsersController.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/stats", getUserStats);

router.get("/:id", getUserById);

router.patch("/:id/verify", verifyUser);

router.patch("/:id/reject", rejectUser);

router.patch("/:id/suspend", suspendUser);

router.patch("/:id/activate", activateUser);

router.patch("/:id/status", toggleUserStatus);

router.delete("/:id", deleteUser);

router.patch("/:id/restore", restoreUser);

export default router;
