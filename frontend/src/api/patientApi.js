import { api } from "./axios";

export const getPatientProfile = async () => {
  const res = await api.get("/api/patient/profile");
  return res.data;
};

export const updatePatientProfile = async (payload) => {
  const res = await api.put("/api/patient/profile", payload);
  return res.data;
};
