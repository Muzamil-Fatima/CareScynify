import { api } from "../axios";


// ADMIN VERIFICATION


// Get verification requests
export const getVerificationRequests = async ({
  role = "all",
  verificationType = "all",
  status = "all",
  page = 1,
  limit = 10,
} = {}) => {
  const res = await api.get("/api/admin/verified/verification", {
    params: {
      role,
      verificationType,
      status,
      page,
      limit,
    },
  });

  return res.data;
};

// Get single verification request by user ID
export const getVerificationRequestById = async (userId) => {
  const res = await api.get(
    `/api/admin/verified/verification/${userId}`,
  );

  return res.data;
};

// Approve verification
export const approveVerification = async (userId) => {
  const res = await api.patch(
    `/api/admin/verified/verification/${userId}/approve`,
  );

  return res.data;
};

// Reject verification
export const rejectVerification = async (userId, reason) => {
  const res = await api.patch(
    `/api/admin/verified/verification/${userId}/reject`,
    {
      reason,
    },
  );

  return res.data;
};

// Get verification statistics
export const getVerificationStats = async () => {
  const res = await api.get(
    "/api/admin/verified/verification/stats",
  );

  return res.data;
};