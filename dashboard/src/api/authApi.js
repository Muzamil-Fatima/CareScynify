import { api } from "./axios";

// LOGOUT
export const logoutUser = async () => {
  const res = await api.get("/auth/logout");
  return res.data;
};

//
//  USER INFO
//

// GET CURRENT USER
export const getMe = async () => {
  const res = await api.get("/api/auth/me");
  return res.data;
};
// CHANGE PASSWORD
export const changePassword = async (passwordData) => {
  const res = await api.put("/api/auth/change-password", passwordData);

  return res.data;
};

// TOGGLE TWO FACTOR AUTHENTICATION
export const toggleTwoFactor = async () => {
  const res = await api.patch("/api/auth/toggle-2fa");

  return res.data;
};

// RESEND VERIFICATION EMAIL
export const resendVerification = async () => {
  const res = await api.post("/api/auth/resend-verification");
  return res.data;
};

//  AUTH APIs

// SIGNUP
export const signupUser = async (data) => {
  const res = await api.post("/api/auth", data);
  return res.data;
};

// LOGIN
export const login = async (data) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

//  PASSWORD RESET

// FORGOT PASSWORD
export const forgotPassword = async (data) => {
  const res = await api.post("/api/auth/forgot-password", data);
  return res.data;
};

// VERIFY OTP
export const verifyOtp = async (data) => {
  const res = await api.post("/api/auth/verify-otp", data);
  return res.data;
};

// RESET PASSWORD
export const resetPassword = async (data) => {
  const res = await api.post("/api/auth/reset-password", data);
  return res.data;
};

// RESEND RESET OTP
export const resendResetOtp = async (data) => {
  const res = await api.post("/api/auth/resend-reset-otp", data);
  return res.data;
};

//  2FA

// TOGGLE 2FA
export const toggle2FA = async () => {
  const res = await api.patch("/api/auth/toggle-2fa");
  return res.data;
};

// VERIFY 2FA OTP
export const verifyTwoFactorOTP = async (data) => {
  const res = await api.post("/api/auth/verify-2fa", data);
  return res.data;
};

//  EMAIL VERIFICATION

// VERIFY EMAIL
export const verifyEmail = async (token) => {
  const res = await api.get(`/api/auth/verify/${token}`);
  return res.data;
};

//  GOOGLE AUTH

export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
};

//  ACCOUNT

// DELETE ACCOUNT
export const deleteAccount = async () => {
  const res = await api.delete("/api/auth/delete-account");
  return res.data;
};
