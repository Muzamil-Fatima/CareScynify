import { api } from "../axios";

// GET PROFILE
export const drBookAppointment = async () => {
  const res = await api.get("/api/patient/profile");
  return res.data;
};
export const getAvailableSlots = async () => {
  const res = await api.get("/api/patient/profile");
  return res.data;
};
