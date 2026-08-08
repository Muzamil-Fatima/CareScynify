import { api } from "../axios";
export const getDoctorDashboard = async (workplaceId, period) => {
  const res = await api.get("/api/doctor/dashboard", {
    params: {
      workplaceId,
      period,
    },
  });
  return res.data;
};
