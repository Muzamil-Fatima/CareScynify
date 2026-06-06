import { api } from "./axios";

// get profile
export const getDoctorProfile = async (id) => {
  const res = await api.get(`/api/doctors/${id}`);
  return res.data;
};