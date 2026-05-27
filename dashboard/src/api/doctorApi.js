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
// add new doctor workplaces
export const addWorkplace = async (payload) => {
  const res = await api.post("/api/doctor/workplaces", payload);
  return res.data;
};
// update doctor workplace
export const updateWorkplaces = async (id, payload) => {
  const res = await api.put(`/api/doctor/workplaces/${id}`, payload);
  return res.data;
};
// delete doctor workplace
export const deleteWorkplace = async (id) => {
  const res = await api.delete(`/api/doctor/workplaces/${id}`);
  return res.data;
};
// get doctor workplaces
export const getWorkplaces = async () => {
  const res = await api.get("/api/doctor/workplaces");
  return res.data;
};
// update doctor workplaces
export const updateWorkplaceSchedule = async (workplaceId, payload) => {
  const res = await api.put(`/api/doctor/schedule/${workplaceId}`, payload);
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
