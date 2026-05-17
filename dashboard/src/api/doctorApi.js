import { api } from "./axios";

// GET DOCTOR PROFILE
export const getDoctorProfile = async () => {
  const res = await api.get("/api/doctor/profile");
  return res.data;
};

// UPDATE DOCTOR PROFILE
export const updateDoctorProfile = async (payload) => {
  const res = await api.put("/api/doctor/profile", payload);

  return res.data;
};
