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
