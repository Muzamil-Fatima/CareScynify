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
