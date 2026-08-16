import { api } from "../axios";

// Get a single report by ID (for ReportViewer page)
export const getReportById = async (reportId) => {
  const res = await api.get(`/api/reports/${reportId}`);
  return res.data;
};
