import api from "../api";

// Get My Prescriptions
export const getMyPrescriptions = async () => {
  const res = await api.get("/api/patient/prescriptions");
  return res.data;
};

// Get My Prescription By ID
export const getMyPrescriptionById = async (prescriptionId) => {
  const res = await api.get(
    `/api/patient/prescriptions/${prescriptionId}`
  );
  return res.data;
};