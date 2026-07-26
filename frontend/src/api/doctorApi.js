import { api } from "./axios";

// Get all doctors
export const getDoctors = async (params = "") => {
  const res = await api.get(`/api/doctors?${params}`);
  return res.data;
};

// Get doctor profile
export const getDoctorProfile = async (id) => {
  const res = await api.get(`/api/doctors/${id}`);
  return res.data;
};