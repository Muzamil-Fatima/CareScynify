import { api } from "./axios";

// get profile
export const getDoctorProfile = async () => {
  const res = await api.get("/api/doctors/");
  return res.data;
};
