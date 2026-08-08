import { api } from "../axios";

export const getPharmacyDashboard = async () => {
  const res = await api.get("/api/pharmacy/dashboard");

  return res.data;
};
