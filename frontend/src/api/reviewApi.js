import { api } from "./axios";
export const createReview = async (payload) => {
  const res = await api.post("/api/review", payload);
  return res.data;
};

export const getMyReviews = async (payload) => {
  const res = await api.get("/api/review/my", payload);
  return res.data;
};

export const getReviewByAppointment = async (appointmentId) => {
  const res = await api.get(`/reviews/appointment/${appointmentId}`);
  return res.data;
};