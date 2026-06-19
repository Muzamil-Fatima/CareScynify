import { api } from "./axios";

export const getDoctorReviews = async () => {
  const res = await api.get("/api/review/doctor/me");
  return res.data;
};