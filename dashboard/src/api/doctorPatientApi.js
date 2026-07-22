import { api } from "./axios";

// Add Doctor Patient
export const addDoctorPatient = async (data) => {
  const res = await api.post("/api/doctor-patients", data);
  return res.data;
};

// Get All Doctor Patients 
export const getDoctorPatients = async () => {
  const res = await api.get("/api/doctor-patients");
  return res.data;
};

// Get Doctor Patient
export const getDoctorPatient = async (id) => {
  const res = await api.get(`/api/doctor-patients/${id}`);
  return res.data;
};

// Update Doctor Patient
export const updateDoctorPatient = async (id, data) => {
  const res = await api.put(`/api/doctor-patients/${id}`, data);
  return res.data;
};

// Delete Doctor Patient
export const deleteDoctorPatient = async (id) => {
  const res = await api.delete(`/api/doctor-patients/${id}`);
  return res.data;
};