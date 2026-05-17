import { api } from "./axios";
//  get patient profile
export const getPatientProfile = async () => {
  const res = await api.get("api/patient/profile");
  return res.data;
};
