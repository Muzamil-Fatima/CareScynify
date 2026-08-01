import { api } from "../axios";

// Book Lab Test
export const bookLabSample = async (data) => {
  const res = await api.post("/api/lab-samples/book", data);
  return res.data;
};