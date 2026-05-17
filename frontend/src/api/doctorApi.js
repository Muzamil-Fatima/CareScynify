// this is doctor api file, which contains all the api calls related to doctor
import { api } from "./axios";

// get profile
export const getDoctorProfile = async () => {
  const res = await api.get("/api/doctor/profile");
  return res.data;
};

// update profile
export const updateDoctorProfile = async (payload) => {
  const res = await api.put("api/doctor/profile", payload);
  return res.data;
};
