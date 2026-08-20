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

/*
|--------------------------------------------------------------------------
| Admin Users Routes
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| GET ALL USERS
| GET /api/admin/users
|
| Supports:
| ?page=1
| ?limit=10
| ?search=muzamil
| ?role=doctor
| ?verificationStatus=verified
| ?status=active
| ?sortBy=createdAt
| ?sortOrder=desc
|--------------------------------------------------------------------------
*/
router.get("/", getUsers);

/*
|--------------------------------------------------------------------------
| USER STATISTICS
| GET /api/admin/users/stats
|
| IMPORTANT:
| Must be before /:id.
|--------------------------------------------------------------------------
*/
router.get("/stats", getUserStats);

/*
|--------------------------------------------------------------------------
| GET SINGLE USER
| GET /api/admin/users/:id
|
| Supports:
| - MongoDB ObjectId
| - Numeric userId
|--------------------------------------------------------------------------
*/
router.get("/:id", getUserById);

/*
|--------------------------------------------------------------------------
| VERIFY USER
| PATCH /api/admin/users/:id/verify
|--------------------------------------------------------------------------
*/
router.patch("/:id/verify", verifyUser);

/*
|--------------------------------------------------------------------------
| REJECT USER
| PATCH /api/admin/users/:id/reject
|--------------------------------------------------------------------------
*/
router.patch("/:id/reject", rejectUser);

/*
|--------------------------------------------------------------------------
| SUSPEND USER
| PATCH /api/admin/users/:id/suspend
|--------------------------------------------------------------------------
*/
router.patch("/:id/suspend", suspendUser);

/*
|--------------------------------------------------------------------------
| ACTIVATE USER
| PATCH /api/admin/users/:id/activate
|--------------------------------------------------------------------------
*/
router.patch("/:id/activate", activateUser);

/*
|--------------------------------------------------------------------------
| TOGGLE USER STATUS
| PATCH /api/admin/users/:id/status
|--------------------------------------------------------------------------
*/
router.patch("/:id/status", toggleUserStatus);

/*
|--------------------------------------------------------------------------
| SOFT DELETE USER
| DELETE /api/admin/users/:id
|--------------------------------------------------------------------------
*/
router.delete("/:id", deleteUser);

/*
|--------------------------------------------------------------------------
| RESTORE USER
| PATCH /api/admin/users/:id/restore
|--------------------------------------------------------------------------
*/
router.patch("/:id/restore", restoreUser);

export default router;