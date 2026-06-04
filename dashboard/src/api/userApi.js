import { api } from "./axios";

export const updateUserProfile = async (formData) => {
  const res = await api.put("/api/user/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
// ---------------- USER PROFILE ----------------
export const getUserProfile = async () => {
  const res = await api.get("/api/user/profile");
  return res.data;
};

// ---------------- LANGUAGES ----------------

// ADD
export const addLanguage = async (payload) => {
  const res = await api.post("/api/user/languages", payload);
  return res.data;
};

// UPDATE
export const updateLanguage = async (id, payload) => {
  const res = await api.put(`/api/user/languages/${id}`, payload);
  return res.data;
};

// DELETE
export const deleteLanguage = async (id) => {
  const res = await api.delete(`/api/user/languages/${id}`);
  return res.data;
};
