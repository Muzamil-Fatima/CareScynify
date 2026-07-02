import api from "../api";

// Create
export const createPrescription = async (data) => {
  const res = await api.post("/api/doctor/prescriptions", data);
  return res.data;
};

// Update
export const updatePrescription = async (prescriptionId, data) => {
  const res = await api.put(
    `/api/doctor/prescriptions/${prescriptionId}`,
    data
  );
  return res.data;
};

// Delete
export const deletePrescription = async (prescriptionId) => {
  const res = await api.delete(
    `/api/doctor/prescriptions/${prescriptionId}`
  );
  return res.data;
};

// Get by ID
export const getPrescriptionById = async (prescriptionId) => {
  const res = await api.get(
    `/api/doctor/prescriptions/${prescriptionId}`
  );
  return res.data;
};

// Get by Appointment
export const getPrescriptionByAppointment = async (appointmentId) => {
  const res = await api.get(
    `/api/doctor/prescriptions/appointment/${appointmentId}`
  );
  return res.data;
};

// Get Patient Prescriptions
export const getPatientPrescriptions = async (patientId) => {
  const res = await api.get(
    `/api/doctor/prescriptions/patient/${patientId}`
  );
  return res.data;
};