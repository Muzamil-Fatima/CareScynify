import { api } from "./axios";

// GET PROFILE
export const getPatientProfile = async () => {
  const res = await api.get("/api/patient/profile");
  return res.data;
};

// UPDATE PROFILE
export const updatePatientProfile = async (payload) => {
  const res = await api.put("/api/patient/profile", payload);
  return res.data;
};
//  get patient by id 
export const getPatientById = async (patientId) => {
  const res = await api.get(`/api/patient/${patientId}`);
  return res.data;
};
