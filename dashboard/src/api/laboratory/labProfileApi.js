import {api} from "../axios";

export const getLabProfile = async () => {
  const { data } = await api.get("/laboratory/profile");
  return data;
};

export const updateLabProfile = async (payload) => {
  const { data } = await api.put("/laboratory/profile", payload);
  return data;
};