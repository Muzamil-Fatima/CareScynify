import { api } from "../axios";

// GET PROFILE
export const getPatientProfile = async () => {
  const res = await api.get("/api/pharmacy/profile");
  return res.data;
};

// UPDATE PROFILE
export const updatePatientProfile = async (payload) => {
  const res = await api.put("/api/pharmacy/profile", payload);
  return res.data;
};