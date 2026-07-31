import { api } from "../axios";

// Get all testoratories
export const getLabTest = async (params = "") => {
  const res = await api.get(`/api/lab/test?${params}`);
  return res.data;
};

// Search testoratories
export const searchLabTest = async (query, page = 1, limit = 10) => {
  const res = await api.get("/api/lab/test/search", {
    params: {
      query,
      page,
      limit,
    },
  });

  return res.data;
};

// Filter testoratories
export const filterLabTest = async (filters) => {
  const res = await api.get("/api/lab/test/filter", {
    params: filters,
  });

  return res.data;
};
// Get single lab test detail
export const getLabTestById = async (id) => {
  const res = await api.get(`/api/lab/test/${id}`);

  return res.data.test;
};
