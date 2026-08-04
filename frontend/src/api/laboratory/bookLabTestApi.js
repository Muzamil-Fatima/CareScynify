import { api } from "../axios";

// Book Lab Test
export const bookLabSample = async (data) => {
  const res = await api.post("/api/lab-booking/book-test", data);
  return res.data;
};

// Get all booked lab tests
export const getMyLabTests = async () => {
  const { data } = await api.get("/api/lab-booking/my-tests");
  return data;
};

// Get single booked lab test
export const getMyLabTestById = async (id) => {
  const { data } = await api.get(`/api/lab-booking/my-tests/${id}`);
  return data;
};