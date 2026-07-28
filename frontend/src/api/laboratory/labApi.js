import { api } from "../axios";

// Get all laboratories
export const getLaboratories = async (params = "") => {
  const res = await api.get(`/api/labs?${params}`);
  return res.data;
};

// Search laboratories
export const searchLaboratories = async (query) => {
  const res = await api.get(`/api/labs/search?query=${query}`);

  return res.data;
};

// Filter laboratories
export const filterLaboratories = async (filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const res = await api.get(`/api/labs/filter?${params.toString()}`);

  return res.data;
};

// Get laboratory profile
export const getLaboratoryProfile = async (id) => {
  const res = await api.get(`/api/labs/${id}`);

  return res.data;
};
