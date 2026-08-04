import { api } from "../axios";

// Get all pharmacies
export const getPharmacies = async (params = "") => {
  const res = await api.get(`/api/pharmacies?${params}`);
  return res.data;
};

// Search pharmacies
export const searchPharmacies = async (query) => {
  const res = await api.get(
    `/api/pharmacies/search?query=${encodeURIComponent(query)}`,
  );
  return res.data;
};

// Filter pharmacies
export const filterPharmacies = async (filters) => {
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

  const res = await api.get(`/api/pharmacies/filter?${params.toString()}`);
  return res.data;
};

// Get pharmacy details
export const getPharmacyById = async (id) => {
  const res = await api.get(`/api/pharmacies/${id}`);
  return res.data;
};
