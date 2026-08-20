import mongoose from "mongoose";

import User from "../../models/user.js";
import Doctor from "../../models/doctor/doctorModel.js";
import Pharmacy from "../../models/pharmacy/pharmacyModel.js";
import Laboratory from "../../models/laboratory/labModel.js";
import Patient from "../../models/patientModel.js";

/* 
   Helper Functions
 */

/**
 * Convert role-specific verification data into
 * one common verificationStatus for frontend.
 *
 * Patient:
 *    User.accountVerified
 *
 * Doctor:
 *    Doctor.identityVerification.status
 *
 * Pharmacy:
 *    Pharmacy.verificationStatus
 *
 * Laboratory:
 *    Laboratory.verificationStatus
 */
const getVerificationStatus = (user, profile = null) => {
  const role = user.role?.toLowerCase();

  // Doctor
  if (role === "doctor") {
    const status = profile?.identityVerification?.status;

    if (status === "Verified") return "verified";
    if (status === "Rejected") return "rejected";

    return "pending";
  }

  // Pharmacy
  if (role === "pharmacy") {
    const status = profile?.verificationStatus?.toLowerCase();

    if (status === "verified") return "verified";
    if (status === "rejected") return "rejected";

    return "pending";
  }

  // Laboratory
  if (role === "laboratory") {
    const status = profile?.verificationStatus?.toLowerCase();

    if (status === "verified") return "verified";
    if (status === "rejected") return "rejected";

    return "pending";
  }

  // Patient / Admin
  return user.accountVerified ? "verified" : "pending";
};

/**
 * Get role-specific profile.
 */
const getUserProfile = async (user) => {
  if (!user) return null;

  switch (user.role?.toLowerCase()) {
    case "doctor":
      return Doctor.findOne({ userId: user._id }).lean();

    case "patient":
      return Patient.findOne({ userId: user._id }).lean();

    case "pharmacy":
      return Pharmacy.findOne({ userId: user._id }).lean();

    case "laboratory":
      return Laboratory.findOne({ userId: user._id }).lean();

    default:
      return null;
  }
};

/**
 * Normalize user for frontend.
 */
const normalizeUser = async (user, profile = null) => {
  const plainUser = user.toObject ? user.toObject() : user;

  const verificationStatus = getVerificationStatus(plainUser, profile);

  return {
    ...plainUser,

    // Never expose password
    password: undefined,

    // Frontend-compatible ID
    userId: plainUser.userId || plainUser._id,

    // Frontend expects this field
    verificationStatus,

    // Existing frontend uses isVerified
    isVerified: verificationStatus === "verified",

    // Keep accountVerified available
    accountVerified: plainUser.accountVerified,

    // Profile data
    profile: profile || null,

    // Useful common fields
    dateOfBirth: plainUser.dob || null,
  };
};

/**
 * Get all role profiles in parallel.
 */
const getProfilesForUsers = async (users) => {
  if (!users.length) return new Map();

  const userIds = users.map((user) => user._id);

  const [doctors, patients, pharmacies, laboratories] = await Promise.all([
    Doctor.find({
      userId: { $in: userIds },
    }).lean(),

    Patient.find({
      userId: { $in: userIds },
    }).lean(),

    Pharmacy.find({
      userId: { $in: userIds },
    }).lean(),

    Laboratory.find({
      userId: { $in: userIds },
    }).lean(),
  ]);

  const profileMap = new Map();

  doctors.forEach((profile) => {
    profileMap.set(profile.userId.toString(), profile);
  });

  patients.forEach((profile) => {
    profileMap.set(profile.userId.toString(), profile);
  });

  pharmacies.forEach((profile) => {
    profileMap.set(profile.userId.toString(), profile);
  });

  laboratories.forEach((profile) => {
    profileMap.set(profile.userId.toString(), profile);
  });

  return profileMap;
};

/* 
   GET ALL USERS
   GET /api/admin/users
 */

export const getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      role = "all",
      verificationStatus = "all",
      status = "all",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.min(Math.max(Number(limit), 1), 100);

    const query = {
      isDeleted: false,
    };

    /* -----------------------------------------
       Role Filter
    ----------------------------------------- */

    if (role !== "all") {
      query.role = role.toLowerCase();
    }

    /* -----------------------------------------
       Status Filter
    ----------------------------------------- */

    if (status !== "all") {
      query.status = status.toLowerCase();
    }

    /* -----------------------------------------
       Search
    ----------------------------------------- */

    if (search.trim()) {
      const searchRegex = new RegExp(
        search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );

      const searchConditions = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
      ];

      // Search numeric userId when possible
      if (!Number.isNaN(Number(search.trim()))) {
        searchConditions.push({
          userId: Number(search.trim()),
        });
      }

      // Mongo ObjectId search
      if (mongoose.Types.ObjectId.isValid(search.trim())) {
        searchConditions.push({
          _id: search.trim(),
        });
      }

      query.$or = searchConditions;
    }

    /* -----------------------------------------
       Get Users
    ----------------------------------------- */

    const totalUsers = await User.countDocuments(query);

    const sort = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const users = await User.find(query)
      .select("-password -resetToken -resetPasswordOTP")
      .sort(sort)
      .skip((currentPage - 1) * perPage)
      .limit(perPage)
      .lean();

    /* -----------------------------------------
       Get Role Profiles
    ----------------------------------------- */

    const profileMap = await getProfilesForUsers(users);

    let normalizedUsers = users.map((user) => {
      const profile = profileMap.get(user._id.toString()) || null;

      const verification = getVerificationStatus(user, profile);

      return {
        ...user,

        userId: user.userId || user._id,

        verificationStatus: verification,

        isVerified: verification === "verified",

        dateOfBirth: user.dob || null,

        profile,
      };
    });

    /* -----------------------------------------
       Verification Filter
       
       Verification depends on role-specific
       profile, so filter AFTER normalization.
    ----------------------------------------- */

    if (verificationStatus !== "all") {
      normalizedUsers = normalizedUsers.filter(
        (user) => user.verificationStatus === verificationStatus.toLowerCase(),
      );
    }

    const totalPages = Math.max(
      1,
      Math.ceil(
        (verificationStatus === "all" ? totalUsers : normalizedUsers.length) /
          perPage,
      ),
    );

    /*
      Important:
      If verification filter is used, the database pagination
      happened before role-specific verification filtering.

      For accurate pagination with verification filtering,
      we fetch all matching users and paginate after filtering.
    */

    if (verificationStatus !== "all") {
      const allUsers = await User.find(query)
        .select("-password -resetToken -resetPasswordOTP")
        .sort(sort)
        .lean();

      const allProfileMap = await getProfilesForUsers(allUsers);

      const filteredUsers = allUsers
        .map((user) => {
          const profile = allProfileMap.get(user._id.toString()) || null;

          const verification = getVerificationStatus(user, profile);

          return {
            ...user,
            userId: user.userId || user._id,
            verificationStatus: verification,
            isVerified: verification === "verified",
            dateOfBirth: user.dob || null,
            profile,
          };
        })
        .filter(
          (user) =>
            user.verificationStatus === verificationStatus.toLowerCase(),
        );

      const filteredTotal = filteredUsers.length;

      const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage,
      );

      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: paginatedUsers,
        pagination: {
          currentPage,
          rowsPerPage: perPage,
          totalItems: filteredTotal,
          totalPages: Math.max(1, Math.ceil(filteredTotal / perPage)),
          hasNextPage: currentPage < Math.ceil(filteredTotal / perPage),
          hasPreviousPage: currentPage > 1,
        },
      });
    }

    /* -----------------------------------------
       Normal Pagination Response
    ----------------------------------------- */

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: normalizedUsers,
      pagination: {
        currentPage,
        rowsPerPage: perPage,
        totalItems: totalUsers,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });
  } catch (error) {
    console.error("getUsers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

/* 
   GET SINGLE USER
   GET /api/admin/users/:id
 */

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    let user = null;

    /* -----------------------------------------
       Find by Mongo _id
    ----------------------------------------- */

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findOne({
        _id: id,
        isDeleted: false,
      }).select("-password -resetToken -resetPasswordOTP");
    }

    /* -----------------------------------------
       Find by custom numeric userId
    ----------------------------------------- */

    if (!user && !Number.isNaN(Number(id))) {
      user = await User.findOne({
        userId: Number(id),
        isDeleted: false,
      }).select("-password -resetToken -resetPasswordOTP");
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profile = await getUserProfile(user);

    const normalizedUser = await normalizeUser(user, profile);

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: normalizedUser,
    });
  } catch (error) {
    console.error("getUserById error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};

/* 
   VERIFY USER
   PATCH /api/admin/users/:id/verify
 */

export const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findOne({
        _id: id,
        isDeleted: false,
      });
    }

    if (!user && !Number.isNaN(Number(id))) {
      user = await User.findOne({
        userId: Number(id),
        isDeleted: false,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* -----------------------------------------
       User account verification
    ----------------------------------------- */

    user.accountVerified = true;

    await user.save();

    /* -----------------------------------------
       Role-specific verification
    ----------------------------------------- */

    switch (user.role) {
      case "doctor": {
        await Doctor.findOneAndUpdate(
          { userId: user._id },
          {
            $set: {
              "identityVerification.status": "Verified",
              "identityVerification.verifiedAt": new Date(),
            },
          },
          { new: true },
        );

        break;
      }

      case "pharmacy": {
        await Pharmacy.findOneAndUpdate(
          { userId: user._id },
          {
            $set: {
              verificationStatus: "verified",
            },
          },
          { new: true },
        );

        break;
      }

      case "laboratory": {
        await Laboratory.findOneAndUpdate(
          { userId: user._id },
          {
            $set: {
              verificationStatus: "verified",
            },
          },
          { new: true },
        );

        break;
      }

      case "patient":
        // Patient verification is handled through
        // User.accountVerified
        break;

      default:
        break;
    }

    const profile = await getUserProfile(user);

    const normalizedUser = await normalizeUser(user, profile);

    return res.status(200).json({
      success: true,
      message: "User verified successfully",
      data: normalizedUser,
    });
  } catch (error) {
    console.error("verifyUser error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify user",
      error: error.message,
    });
  }
};

/* 
   REJECT USER
   PATCH /api/admin/users/:id/reject
 */

export const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findOne({
        _id: id,
        isDeleted: false,
      });
    }

    if (!user && !Number.isNaN(Number(id))) {
      user = await User.findOne({
        userId: Number(id),
        isDeleted: false,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* -----------------------------------------
       User account verification
    ----------------------------------------- */

    user.accountVerified = false;

    await user.save();

    /* -----------------------------------------
       Role-specific verification
    ----------------------------------------- */

    switch (user.role) {
      case "doctor": {
        await Doctor.findOneAndUpdate(
          { userId: user._id },
          {
            $set: {
              "identityVerification.status": "Rejected",
            },
            $unset: {
              "identityVerification.verifiedAt": 1,
            },
          },
        );

        break;
      }

      case "pharmacy": {
        await Pharmacy.findOneAndUpdate(
          { userId: user._id },
          {
            $set: {
              verificationStatus: "rejected",
            },
          },
        );

        break;
      }

      case "laboratory": {
        await Laboratory.findOneAndUpdate(
          { userId: user._id },
          {
            $set: {
              verificationStatus: "rejected",
            },
          },
        );

        break;
      }

      case "patient":
        break;

      default:
        break;
    }

    const profile = await getUserProfile(user);

    const normalizedUser = await normalizeUser(user, profile);

    return res.status(200).json({
      success: true,
      message: "User verification rejected",
      data: normalizedUser,
    });
  } catch (error) {
    console.error("rejectUser error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject user",
      error: error.message,
    });
  }
};

/* 
   SUSPEND USER
   PATCH /api/admin/users/:id/suspend
 */

export const suspendUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findOne({
        _id: id,
        isDeleted: false,
      });
    }

    if (!user && !Number.isNaN(Number(id))) {
      user = await User.findOne({
        userId: Number(id),
        isDeleted: false,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = "suspended";

    await user.save();

    const profile = await getUserProfile(user);

    const normalizedUser = await normalizeUser(user, profile);

    return res.status(200).json({
      success: true,
      message: "User suspended successfully",
      data: normalizedUser,
    });
  } catch (error) {
    console.error("suspendUser error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to suspend user",
      error: error.message,
    });
  }
};

/* 
   ACTIVATE USER
   PATCH /api/admin/users/:id/activate
 */

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findOne({
        _id: id,
        isDeleted: false,
      });
    }

    if (!user && !Number.isNaN(Number(id))) {
      user = await User.findOne({
        userId: Number(id),
        isDeleted: false,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.status = "active";

    await user.save();

    const profile = await getUserProfile(user);

    const normalizedUser = await normalizeUser(user, profile);

    return res.status(200).json({
      success: true,
      message: "User activated successfully",
      data: normalizedUser,
    });
  } catch (error) {
    console.error("activateUser error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to activate user",
      error: error.message,
    });
  }
};

/* 
   TOGGLE USER STATUS
   PATCH /api/admin/users/:id/status
 */

export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findOne({
        _id: id,
        isDeleted: false,
      });
    }

    if (!user && !Number.isNaN(Number(id))) {
      user = await User.findOne({
        userId: Number(id),
        isDeleted: false,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newStatus = user.status === "active" ? "suspended" : "active";

    user.status = newStatus;

    await user.save();

    const profile = await getUserProfile(user);

    const normalizedUser = await normalizeUser(user, profile);

    return res.status(200).json({
      success: true,
      message:
        newStatus === "active"
          ? "User activated successfully"
          : "User suspended successfully",
      data: normalizedUser,
    });
  } catch (error) {
    console.error("toggleUserStatus error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user status",
      error: error.message,
    });
  }
};

/* 
   SOFT DELETE USER
   DELETE /api/admin/users/:id
 */

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findOne({
        _id: id,
        isDeleted: false,
      });
    }

    if (!user && !Number.isNaN(Number(id))) {
      user = await User.findOne({
        userId: Number(id),
        isDeleted: false,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isDeleted = true;
    user.deletedAt = new Date();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("deleteUser error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

/* 
   RESTORE USER
   PATCH /api/admin/users/:id/restore
 */

export const restoreUser = async (req, res) => {
  try {
    const { id } = req.params;

    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findOne({
        _id: id,
        isDeleted: true,
      });
    }

    if (!user && !Number.isNaN(Number(id))) {
      user = await User.findOne({
        userId: Number(id),
        isDeleted: true,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Deleted user not found",
      });
    }

    user.isDeleted = false;
    user.deletedAt = null;

    await user.save();

    const profile = await getUserProfile(user);

    const normalizedUser = await normalizeUser(user, profile);

    return res.status(200).json({
      success: true,
      message: "User restored successfully",
      data: normalizedUser,
    });
  } catch (error) {
    console.error("restoreUser error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to restore user",
      error: error.message,
    });
  }
};

/* 
   USER STATISTICS
   GET /api/admin/users/stats
 */

export const getUserStats = async (req, res) => {
  try {
    const baseQuery = {
      isDeleted: false,
    };

    const [
      totalUsers,
      activeUsers,
      suspendedUsers,
      inactiveUsers,
      doctors,
      patients,
      pharmacies,
      laboratories,
      admins,
    ] = await Promise.all([
      User.countDocuments(baseQuery),

      User.countDocuments({
        ...baseQuery,
        status: "active",
      }),

      User.countDocuments({
        ...baseQuery,
        status: "suspended",
      }),

      User.countDocuments({
        ...baseQuery,
        status: "inactive",
      }),

      User.countDocuments({
        ...baseQuery,
        role: "doctor",
      }),

      User.countDocuments({
        ...baseQuery,
        role: "patient",
      }),

      User.countDocuments({
        ...baseQuery,
        role: "pharmacy",
      }),

      User.countDocuments({
        ...baseQuery,
        role: "laboratory",
      }),

      User.countDocuments({
        ...baseQuery,
        role: "admin",
      }),
    ]);

    /* -----------------------------------------
       Get users for verification statistics
    ----------------------------------------- */

    const users = await User.find(baseQuery)
      .select("_id role accountVerified")
      .lean();

    const profileMap = await getProfilesForUsers(users);

    let verifiedUsers = 0;
    let pendingUsers = 0;
    let rejectedUsers = 0;

    users.forEach((user) => {
      const profile = profileMap.get(user._id.toString()) || null;

      const verificationStatus = getVerificationStatus(user, profile);

      if (verificationStatus === "verified") {
        verifiedUsers++;
      } else if (verificationStatus === "rejected") {
        rejectedUsers++;
      } else {
        pendingUsers++;
      }
    });

    return res.status(200).json({
      success: true,
      message: "User statistics fetched successfully",
      data: {
        totalUsers,
        activeUsers,
        suspendedUsers,
        inactiveUsers,

        verifiedUsers,
        pendingUsers,
        rejectedUsers,

        byRole: {
          doctor: doctors,
          patient: patients,
          pharmacy: pharmacies,
          laboratory: laboratories,
          admin: admins,
        },
      },
    });
  } catch (error) {
    console.error("getUserStats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user statistics",
      error: error.message,
    });
  }
};
