import { api } from "./axios";

// UPLOAD REPORT
export const uploadReport = async (formData) => {
  const res = await api.post("api/reports/add-report", formData);
  return res.data;
};

// GET REPORTS
export const getReports = async () => {
  const res = await api.post("api/reports/get-reports");
  return res.data;
};
