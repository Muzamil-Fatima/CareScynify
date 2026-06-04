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
// UPDATE education
export const updateDoctorEducation = async (id, payload) => {
  const res = await api.put(`/api/doctor/education/${id}`, payload);
  return res.data;
};

// ADD education
export const addDoctorEducation = async (payload) => {
  const res = await api.post("/api/doctor/education", payload);
  return res.data;
};

// DELETE education
export const deleteDoctorEducation = async (id) => {
  const res = await api.delete(`/api/doctor/education/${id}`);
  return res.data;
};
// --------------------------------- Experience ---------------------------------

// update doctor experience
export const updateDoctorExperience = async (id, payload) => {
  const res = await api.put(`/api/doctor/experience/${id}`, payload);
  return res.data;
};
// add doctor experience
export const addDoctorExperience = async (payload) => {
  const res = await api.post("/api/doctor/experience", payload);
  return res.data;
};
// delete doctor experience
export const deleteDoctorExperience = async (id) => {
  const res = await api.delete(`/api/doctor/experience/${id}`);
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
    `/api/doctor/workplaces/${workplaceId}/settings`,
    payload,
  );
  return res.data;
};
// ------------------- Consultation Hours (Per Day) according to Place ----------

// GET ALL CONSULTANT HOURS
export const getConsultantHours = async () => {
  try {
    const res = await api.get("/api/doctor/consultant");
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
};

// ADD CONSULTANT HOURS (new workplace schedule)
export const addConsultantHours = async (payload) => {
  try {
    const res = await api.post("/api/doctor/consultant", payload);
    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
};

// UPDATE CONSULTANT HOURS (single workplace)
export const updateConsultantHours = async (workplaceId, payload) => {
  try {
    if (!workplaceId) throw new Error("workplaceId is required");

    const res = await api.put(`/api/doctor/consultant/${workplaceId}`, payload);

    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
};

// DELETE CONSULTANT HOURS
export const deleteConsultantHours = async (workplaceId) => {
  try {
    if (!workplaceId) throw new Error("workplaceId is required");

    const res = await api.delete(`/api/doctor/consultant/${workplaceId}`);

    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
};

// GET AVAILABLE SLOTS
export const getConsultantSlots = async (workplaceId, day) => {
  try {
    if (!workplaceId || !day) {
      throw new Error("workplaceId and day are required");
    }

    const res = await api.get("/api/doctor/consultant/slots", {
      params: { workplaceId, day },
    });

    return res.data;
  } catch (err) {
    throw err?.response?.data || err;
  }
};
