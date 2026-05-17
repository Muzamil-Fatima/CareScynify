import { api } from "./axios";

// SAVE REPORT
export const addReport = async (data) => {
  const res = await api.post("/api/report/add-report", data);
  return res.data;
};

// GET REPORTS
export const getReports = async () => {
  const res = await api.get(`/api/report/get-report`);
  return res.data;
};