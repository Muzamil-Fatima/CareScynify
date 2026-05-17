import { api } from "./axios";

// GET HOSPITAL PROFILE
export const getHospitalProfile = async () => {
  const res = await api.get("api/hospital/profile");
  return res.data;
};
// UPDATE HOSPITAL PROFILE
export const updateHospitalProfile = async (payload) => {
  const res = await api.put("api/hospital/profile", payload);
  return res.data;
};
