import { api } from "./axios";

export const getDoctorAppointments = async () => {
  const res = await api.get("/api/appointments/doctor");
  return res.data;
};