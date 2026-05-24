import { api } from "./axios";
// GET DOCTOR PROFILE
export const getDoctorProfile = async () => {
  const res = await api.get("/api/doctor/profile");
  return res.data;
};

// UPDATE DOCTOR PROFILE
export const updateDoctorProfile = async (payload) => {
  const res = await api.put("/api/doctor/profile", payload);
  return res.data;
};
// update doctor education
export const updateDoctorEducation = async (payload) => {
  const res = await api.put("/api/doctor/education", payload);
  return res.data;
};
// update doctor workplaces
export const updateDoctorWorkplaces = async (payload) => {
  const res = await api.put("/api/doctor/workplaces", payload);
  return res.data;
};
// update doctor languages
export const updateDoctorLanguages = async (payload) => {
  const res = await api.put("/api/doctor/languages", payload);
  return res.data;
};
// update doctor experience
export const updateDoctorExperience = async (payload) => {
  const res = await api.put("/api/doctor/experience", payload);
  return res.data;
};
