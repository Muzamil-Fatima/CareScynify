import { api } from "../axios";

// Get all medicines
export const getAllMedicines = async (params = "") => {
  const res = await api.get(`/api/public/medicine?${params}`);
  return res.data;
};

// Search medicines
export const searchMedicine = async (
  query,
  page = 1,
  limit = 10
) => {
  const res = await api.get("/api/public/medicine/search", {
    params: {
      query,
      page,
      limit,
    },
  });

  return res.data;
};

// Filter medicines
export const filterMedicine = async (filters) => {
  const res = await api.get("/api/public/medicine/filter", {
    params: filters,
  });

  return res.data;
};

// Get single medicine detail
export const getMedicineById = async (id) => {
  const res = await api.get(`/api/public/medicine/${id}`);
  return res.data.medicine;
};

