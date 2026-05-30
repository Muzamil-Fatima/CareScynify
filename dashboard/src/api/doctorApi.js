import { api } from "./axios";
// --------------------------------- Profile Update ---------------------------------
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
// --------------------------------- Education ---------------------------------

// update doctor education
export const updateDoctorEducation = async (payload) => {
  const res = await api.put("/api/doctor/education", payload);
  return res.data;
};
// --------------------------------- WorkPlace ---------------------------------

// add doctor workplace
export const addDoctorWorkplace = async (payload) => {
  const res = await api.post("/api/doctor/workplaces", payload);
  return res.data;
};
// update doctor workplaces
export const updateDoctorWorkplace = async (id, payload) => {
  const res = await api.put(`/api/doctor/workplaces/${id}`, payload);
  return res.data;
};
// delete doctor workplace
export const deleteDoctorWorkplace = async (id) => {
  const res = await api.delete(`/api/doctor/workplaces/${id}`);
  return res.data;
};
// get doctor workplaces
export const getWorkplaces = async () => {
  const res = await api.get("/api/doctor/workplaces");
  return res.data;
};
// ------------------------- workplace settings -------------------------
export const updateWorkplaceSettings = async (workplaceId, payload) => {
  const res = await api.patch(
    `/api/doctor/workplace/${workplaceId}/settings`,
    payload,
  );
  return res.data;
}
// ------------------- Consultation Hours (Per Day) according to Place ----------

// GET ALL CONSULTANT HOURS
export const getConsultantHours = async () => {
  const res = await api.get("/api/doctor/consultant");
  return res.data;
};

// ADD CONSULTANT HOURS (new workplace schedule)
export const addConsultantHours = async (payload) => {
  const res = await api.post("/api/doctor/consultant", payload);
  return res.data;
};

// UPDATE CONSULTANT HOURS (single workplace)
export const updateConsultantHours = async (workplaceId, payload) => {
  const res = await api.put(`/api/doctor/consultant/${workplaceId}`, payload);
  return res.data;
};

// DELETE CONSULTANT HOURS
export const deleteConsultantHours = async (workplaceId) => {
  const res = await api.delete(`/api/doctor/consultant/${workplaceId}`);
  return res.data;
};

// GET AVAILABLE SLOTS
export const getConsultantSlots = async (workplaceId, day) => {
  const res = await api.get("/api/doctor/consultant/slots", {
    params: { workplaceId, day },
  });
  return res.data;
};

// --------------------------------- Languages ---------------------------------

// update doctor languages
export const updateDoctorLanguages = async (payload) => {
  const res = await api.put("/api/doctor/languages", payload);
  return res.data;
};
// --------------------------------- Experience ---------------------------------

// update doctor experience
export const updateDoctorExperience = async (payload) => {
  const res = await api.put("/api/doctor/experience", payload);
  return res.data;
};
