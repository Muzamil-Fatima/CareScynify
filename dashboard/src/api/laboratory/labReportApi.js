import { api } from "../axios";

//   Create Report
export const createLabReportApi = async (reportData) => {
  const { data } = await api.post("/api/lab-reports", reportData);
  return data;
};

//  Get All Reports
export const getLabReportsApi = async () => {
  const { data } = await api.get("/api/lab-reports");
  return data;
};

//  Get Report By ID
export const getLabReportByIdApi = async (reportId) => {
  const { data } = await api.get(`/api/lab-reports/${reportId}`);
  return data;
};

//  Update Report
export const updateLabReportApi = async (reportId, reportData) => {
  const { data } = await api.put(`/api/lab-reports/${reportId}`, reportData);
  return data;
};

// Delete Report
export const deleteLabReportApi = async (reportId) => {
  const { data } = await api.delete(`/api/lab-reports/${reportId}`);
  return data;
};
