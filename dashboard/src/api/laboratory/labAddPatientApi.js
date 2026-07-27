import { api } from "../axios";

// Get All Laboratory Patients
export const getLabPatients = async () => {
  const { data } = await api.get("/api/lab/patients");
  return data;
};

// Add Laboratory Patient
export const addLabPatient = async (payload) => {
  const { data } = await api.post("/api/lab/patients", payload);
  return data;
};

// Update Laboratory Patient
export const updateLabPatient = async (id, payload) => {
  const { data } = await api.put(`/api/lab/patients/${id}`, payload);
  return data;
};

// Delete Laboratory Patient
export const deleteLabPatient = async (id) => {
  const { data } = await api.delete(`/api/lab/patients/${id}`);
  return data;
};