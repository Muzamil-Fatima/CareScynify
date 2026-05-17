import { api } from "./axios";

export const updateUserProfile = async (formData) => {
  const res = await api.put("/api/user/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};