import { api } from "./axios";

//
// AUTH APIs
//

// SIGNUP
export const signupUser = async (data) => {
  const res = await api.post("/auth", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

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
  const res = await api.get("/auth/me");
  return res.data;
};

//
// PASSWORD RESET FLOW
//

// FORGOT PASSWORD (send OTP/email)
export const forgotPassword = async (data) => {
  const res = await api.post("/auth/forgot-password", data);
  return res.data;
};

// VERIFY OTP
export const verifyOtp = async (data) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

// RESET PASSWORD
export const resetPassword = async (data) => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};

// RESEND RESET OTP
export const resendResetOtp = async (data) => {
  const res = await api.post("/auth/resend-reset-otp", data);
  return res.data;
};

//
// EMAIL VERIFICATION
//

export const verifyEmail = async (token) => {
  const res = await api.get(`/auth/verify/${token}`);
  return res.data;
};

//
// GOOGLE AUTH (redirect handled in backend)
//

export const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};