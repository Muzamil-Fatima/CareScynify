import { api } from "./axios";

// ANALYZE SYMPTOMS
export const analyzeSymptoms = async (payload) => {
  const res = await api.post("/api/symptomAnalysis/analyze", payload);
  return res.data;
};

// GET PATIENT SYMPTOM HISTORY
export const getPatientHistory = async (userId) => {
  const res = await api.get(`/api/symptomAnalysis/history/${userId}`);
  return res.data;
};
