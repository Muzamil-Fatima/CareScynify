import { api } from "../axios";

export const getLabProfile = async () => {
  const { data } = await api.get("/api/laboratory/profile");
  return data;
};

export const updateLabProfile = async (payload) => {
  const { data } = await api.put("/api/laboratory/profile", payload);
  return data;
};
