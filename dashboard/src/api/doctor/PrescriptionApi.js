import { api } from "../axios";

// Create
export const createPrescription = async (data) => {
  const res = await api.post("/api/prescription", data);
  return res.data;
};

// Update
export const updatePrescription = async (prescriptionId, data) => {
  const res = await api.put(`/api/prescription/${prescriptionId}`, data);
  return res.data;
};

// Get by ID
export const getPrescriptionById = async (prescriptionId) => {
  const res = await api.get(`/api/prescription/${prescriptionId}`);
  return res.data;
};

// Get by Appointment
export const getPrescriptionByAppointment = async (appointmentId) => {
  const res = await api.get(`/api/prescription/appointment/${appointmentId}`);
  return res.data;
};

// Get Patient Prescriptions
export const getPatientPrescriptions = async (patientId) => {
  const res = await api.get(`/api/prescription/patient/${patientId}`);
  return res.data;
};