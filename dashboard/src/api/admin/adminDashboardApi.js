import { api } from "../axios";

// 
// ADMIN DASHBOARD
// 

export const getAdminDashboard = async (period = 7) => {
  const res = await api.get(`/api/admin/dashboard?period=${period}`);
  return res.data;
};