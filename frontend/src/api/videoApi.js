import { api } from "./axios";

// Join an online video consultation
export const joinVideoConsultation = async (appointmentId) => {
  const res = await api.post(`/api/doctor/video/call/join/${appointmentId}`);
  return res.data;
};
