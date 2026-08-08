import { api } from "../axios";

// Get all medicines
export const getAllMedicines = async (params = "") => {
  const res = await api.get(`/api/medicine?${params}`);
  return res.data;
};

// Search medicines
export const searchMedicine = async (query, page = 1, limit = 10) => {
  const res = await api.get("/api/medicine/search", {
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
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (
      value !== "" &&
      value !== null &&
      value !== undefined &&
      value !== false
    ) {
      params.append(key, value);
    }
  });

  const res = await api.get("/api/medicine/filter", {
    params,
  });

  return res.data;
};
// Get single medicine detail
export const getMedicineById = async (id) => {
  const res = await api.get(`/api/medicine/${id}`);
  return res.data.medicine;
};
