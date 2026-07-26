import { api } from "./axios";

// Get all doctors
export const getDoctors = async (params = "") => {
  const res = await api.get(`/api/doctors?${params}`);
  return res.data;
};

// Search doctors
export const searchDoctors = async (query) => {
  const res = await api.get(`/api/doctors/search?query=${query}`);

  return res.data;
};

// Filter doctors
export const filterDoctors = async (filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const res = await api.get(`/api/doctors/filter?${params.toString()}`);

  return res.data;
};

// Get doctor profile
export const getDoctorProfile = async (id) => {
  const res = await api.get(`/api/doctors/${id}`);
  return res.data;
};
