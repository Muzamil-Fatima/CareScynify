import { api } from "../axios";

// Get all medicines
export const getAllMedicines = async () => {
  const res = await api.get("/api/public/medicine");
  return res.data;
};

// Get single medicine by ID
export const getMedicineById = async (id) => {
  const res = await api.get(`/api/public/medicine/${id}`);
  return res.data;
};