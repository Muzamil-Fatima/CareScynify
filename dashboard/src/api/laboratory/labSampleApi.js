import { api } from "../axios";

// Get All Lab Samples
export const  getLabSamples = async () => {
  const { data } = await api.get("/api/lab-samples");

  return data;
};

// Get Single Lab Sample
export const getLabSampleById = async (id) => {
  const { data } = await api.get(`/api/lab-samples/${id}`);
  return data;
};

// Create Lab Sample
export const  createLabSample = async (sampleData) => {
  const { data } = await api.post("/api/lab-samples", sampleData);
  return data;
};

// Update Complete Sample Status
export const  updateLabSampleStatus = async (id, status) => {
  const { data } = await api.put(`/api/lab-samples/${id}/status`, {
    status,
  });
  return data;
};

// Update Individual Test Status
export const updateTestStatus = async (id, testId, status) => {
  const { data } = await api.put(`/api/lab-samples/${id}/test-status`, {
    testId,
    status,
  });
  return data;
};

// Delete Lab Sample
export const  deleteLabSample = async (id) => {
  const { data } = await api.delete(`/api/lab-samples/${id}`);
  return data;
};
