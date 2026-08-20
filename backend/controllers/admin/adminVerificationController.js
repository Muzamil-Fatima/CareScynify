import mongoose from "mongoose";

import User from "../../models/user.js";
import Doctor from "../../models/doctor/doctorModel.js";
import Pharmacy from "../../models/pharmacy/pharmacyModel.js";
import Laboratory from "../../models/laboratory/labModel.js";
import Patient from "../../models/patientModel.js";


/**
 * Helper: Build verification request from user + profile
 */
const buildVerificationRequest = async (user) => {
  if (!user) return null;

  const userId = user._id;
  const role = user.role;

  let profile = null;
  let verificationType = "CNIC Verification";
  let status = user.accountVerified ? "approved" : "pending";
  let documents = [];
  let extraData = {};

  
  // DOCTOR
  
  if (role === "doctor") {
    profile = await Doctor.findOne({ userId }).lean();

    if (profile) {
      const identityStatus =
        profile.identityVerification?.status || "Pending";

      const credentials = profile.credentials || [];

      documents = [];

      if (profile.identityVerification?.cnicFront) {
        documents.push({
          _id: "cnic-front",
          name: "CNIC Front",
          url: profile.identityVerification.cnicFront,
        });
      }

      if (profile.identityVerification?.cnicBack) {
        documents.push({
          _id: "cnic-back",
          name: "CNIC Back",
          url: profile.identityVerification.cnicBack,
        });
      }

      credentials.forEach((credential, index) => {
        if (credential.fileUrl) {
          documents.push({
            _id: credential._id || `credential-${index}`,
            name: credential.name || "Professional Document",
            url: credential.fileUrl,
            mimeType: credential.mimeType,
            status: credential.status,
          });
        }
      });

      verificationType =
        credentials.length > 0
          ? "Medical License"
          : "Professional Documents";

      if (identityStatus === "Verified") {
        status = "approved";
      } else if (identityStatus === "Rejected") {
        status = "rejected";
      } else {
        status = "pending";
      }

      extraData = {
        specialization: profile.specialization,
        qualifications: profile.qualifications,
        licenseNo: profile.licenseNo,
        identityVerification: profile.identityVerification,
        credentials: profile.credentials,
      };
    }
  }

  
  // PHARMACY
  
  if (role === "pharmacy") {
    profile = await Pharmacy.findOne({ userId }).lean();

    if (profile) {
      verificationType = "Pharmacy License";

      if (profile.licenseNumber) {
        documents.push({
          _id: "pharmacy-license",
          name: "Pharmacy License",
          url: profile.licenseNumber,
        });
      }

      if (profile.verificationStatus === "verified") {
        status = "approved";
      } else if (profile.verificationStatus === "rejected") {
        status = "rejected";
      } else {
        status = "pending";
      }

      extraData = {
        pharmacyName: profile.pharmacyName,
        ownerName: profile.ownerName,
        registrationNumber: profile.registrationNumber,
        licenseNumber: profile.licenseNumber,
        taxNumber: profile.taxNumber,
        pharmacyType: profile.pharmacyType,
        verificationStatus: profile.verificationStatus,
      };
    }
  }

  
  // LABORATORY
  
  if (role === "laboratory") {
    profile = await Laboratory.findOne({ userId }).lean();

    if (profile) {
      verificationType = "Laboratory License";

      if (profile.licenseNumber) {
        documents.push({
          _id: "laboratory-license",
          name: "Laboratory License",
          url: profile.licenseNumber,
        });
      }

      if (profile.registrationNumber) {
        documents.push({
          _id: "registration-certificate",
          name: "Registration Certificate",
          url: profile.registrationNumber,
        });
      }

      if (profile.verificationStatus === "verified") {
        status = "approved";
      } else if (profile.verificationStatus === "rejected") {
        status = "rejected";
      } else {
        status = "pending";
      }

      extraData = {
        labName: profile.labName,
        ownerName: profile.ownerName,
        registrationNumber: profile.registrationNumber,
        licenseNumber: profile.licenseNumber,
        taxNumber: profile.taxNumber,
        labType: profile.labType,
        verificationStatus: profile.verificationStatus,
      };
    }
  }

  
  // PATIENT
  
  if (role === "patient") {
    profile = await Patient.findOne({ userId }).lean();

    verificationType = "CNIC Verification";

    if (user.cnic) {
      documents.push({
        _id: "cnic",
        name: "CNIC",
        url: null,
      });
    }

    status = user.accountVerified ? "approved" : "pending";

    extraData = {
      gender: profile?.gender,
      bloodGroup: profile?.bloodGroup,
      patientCode: profile?.patientCode,
      patientStatus: profile?.status,
    };
  }

  return {
    _id: user._id,

    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      cnic: user.cnic,
      gender: profile?.gender || extraData.gender,
      address: profile?.address || user.address,
      dob: user.dob,
      dateOfBirth: user.dob,
      avatar: user.avatar,
    },

    role,
    verificationType,
    status,

    submittedAt: profile?.createdAt || user.createdAt,
    createdAt: profile?.createdAt || user.createdAt,

    documents,

    ...extraData,
  };
};

/**
 * GET ALL VERIFICATION REQUESTS
 * GET /api/admin/verification
 */
export const getVerificationRequests = async (req, res) => {
  try {
    const {
      role = "all",
      verificationType = "all",
      status = "all",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      isDeleted: false,
    };

    // Role filter
    if (role !== "all") {
      query.role = role.toLowerCase();
    }

    const users = await User.find(query)
      .select("-password -resetToken -verificationToken -resetPasswordOTP")
      .sort({ createdAt: -1 })
      .lean();

    const requests = [];

    for (const user of users) {
      const request = await buildVerificationRequest(user);

      if (!request) continue;

      // Verification type filter
      if (verificationType !== "all") {
        const normalizedType = verificationType
          .toLowerCase()
          .replaceAll("_", " ");

        const requestType = request.verificationType
          .toLowerCase()
          .replaceAll("_", " ");

        if (!requestType.includes(normalizedType)) {
          continue;
        }
      }

      // Status filter
      if (
        status !== "all" &&
        request.status.toLowerCase() !== status.toLowerCase()
      ) {
        continue;
      }

      requests.push(request);
    }

    // Pagination
    const total = requests.length;

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);

    const startIndex = (pageNumber - 1) * limitNumber;

    const paginatedRequests = requests.slice(
      startIndex,
      startIndex + limitNumber,
    );

    return res.status(200).json({
      success: true,
      message: "Verification requests fetched successfully",
      data: paginatedRequests,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Get Verification Requests Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch verification requests",
      error: error.message,
    });
  }
};

/**
 * GET SINGLE VERIFICATION REQUEST
 * GET /api/admin/verification/:userId
 */
export const getVerificationRequestById = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findOne({
      _id: userId,
      isDeleted: false,
    })
      .select("-password -resetToken -verificationToken -resetPasswordOTP")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Verification request not found",
      });
    }

    const request = await buildVerificationRequest(user);

    return res.status(200).json({
      success: true,
      message: "Verification request fetched successfully",
      data: request,
    });
  } catch (error) {
    console.error("Get Verification Request Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch verification request",
      error: error.message,
    });
  }
};

/**
 * APPROVE VERIFICATION
 * PATCH /api/admin/verification/:userId/approve
 */
export const approveVerification = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findOne({
      _id: userId,
      isDeleted: false,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update User
    user.accountVerified = true;
    await user.save();

    // Doctor
    if (user.role === "doctor") {
      const doctor = await Doctor.findOne({
        userId: user._id,
      });

      if (doctor) {
        if (doctor.identityVerification) {
          doctor.identityVerification.status = "Verified";
          doctor.identityVerification.verifiedAt = new Date();
        }

        if (doctor.credentials?.length) {
          doctor.credentials.forEach((credential) => {
            credential.status = "Verified";
          });
        }

        await doctor.save();
      }
    }

    // Pharmacy
    if (user.role === "pharmacy") {
      await Pharmacy.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            verificationStatus: "verified",
          },
        },
      );
    }

    // Laboratory
    if (user.role === "laboratory") {
      await Laboratory.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            verificationStatus: "verified",
          },
        },
      );
    }

    const updatedUser = await User.findById(user._id)
      .select("-password -resetToken -verificationToken -resetPasswordOTP")
      .lean();

    const request = await buildVerificationRequest(updatedUser);

    return res.status(200).json({
      success: true,
      message: "Verification approved successfully",
      data: request,
    });
  } catch (error) {
    console.error("Approve Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to approve verification",
      error: error.message,
    });
  }
};

/**
 * REJECT VERIFICATION
 * PATCH /api/admin/verification/:userId/reject
 *
 * Body:
 * {
 *   "reason": "Medical license could not be verified."
 * }
 */
export const rejectVerification = async (req, res) => {
  try {
    const { userId } = req.params;

    const reason =
      req.body?.reason || req.body?.rejectionReason || "";

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (!reason.trim()) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    const user = await User.findOne({
      _id: userId,
      isDeleted: false,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // User remains unverified
    user.accountVerified = false;
    await user.save();

    // Doctor
    if (user.role === "doctor") {
      const doctor = await Doctor.findOne({
        userId: user._id,
      });

      if (doctor) {
        if (doctor.identityVerification) {
          doctor.identityVerification.status = "Rejected";
        }

        if (doctor.credentials?.length) {
          doctor.credentials.forEach((credential) => {
            credential.status = "Rejected";
          });
        }

        // Doctor schema currently has no rejectionReason field.
        // Therefore the reason is returned in the API response
        // but is not stored inside Doctor.

        await doctor.save();
      }
    }

    // Pharmacy
    if (user.role === "pharmacy") {
      await Pharmacy.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            verificationStatus: "rejected",
          },
        },
      );
    }

    // Laboratory
    if (user.role === "laboratory") {
      await Laboratory.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            verificationStatus: "rejected",
          },
        },
      );
    }

    const updatedUser = await User.findById(user._id)
      .select("-password -resetToken -verificationToken -resetPasswordOTP")
      .lean();

    const request = await buildVerificationRequest(updatedUser);

    return res.status(200).json({
      success: true,
      message: "Verification rejected successfully",
      data: {
        ...request,
        status: "rejected",
        rejectionReason: reason.trim(),
      },
    });
  } catch (error) {
    console.error("Reject Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject verification",
      error: error.message,
    });
  }
};

/**
 * VERIFICATION STATISTICS
 * GET /api/admin/verification/stats
 */
export const getVerificationStats = async (req, res) => {
  try {
    const users = await User.find({
      isDeleted: false,
    })
      .select("_id role accountVerified")
      .lean();

    let totalRequests = 0;
    let pendingRequests = 0;
    let approvedRequests = 0;
    let rejectedRequests = 0;

    for (const user of users) {
      const request = await buildVerificationRequest(user);

      if (!request) continue;

      totalRequests++;

      if (request.status === "pending") {
        pendingRequests++;
      }

      if (request.status === "approved") {
        approvedRequests++;
      }

      if (request.status === "rejected") {
        rejectedRequests++;
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        totalRequests,
        pendingRequests,
        approvedRequests,
        rejectedRequests,
      },
    });
  } catch (error) {
    console.error("Verification Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch verification statistics",
      error: error.message,
    });
  }
};