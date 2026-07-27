import { api } from "../axios";

// Get All Lab Tests
export const getLabTestsApi = async () => {
  const response = await api.get("/api/lab-tests");
  return response.data;
};

// Create Lab Test
export const createLabTestApi = async (data) => {
  const response = await api.post("/api/lab-tests", data);
  return response.data;
};

// Update Lab Test
export const updateLabTestApi = async (id, data) => {
  const response = await api.put(`/api/lab-tests/${id}`, data);
  return response.data;
};

// Delete Lab Test
export const deleteLabTestApi = async (id) => {
  const response = await api.delete(`/api/lab-tests/${id}`);
  return response.data;
};
