import {api} from "../axios";

// Get Dashboard Statistics
export const getLabDashboardStats = async () => {
  const { data } = await api.get("/api/lab/dashboard/stats");
  return data;
};


// Get Recent Samples
export const getRecentSamples = async () => {
  const { data } = await api.get("/api/lab/dashboard/recent-samples");
  return data;
};


// Get Test Performance
export const getTestPerformance = async () => {
  const { data } = await api.get("/api/lab/dashboard/test-performance");
  return data;
};


// Get Monthly Reports
export const getMonthlyReports = async () => {
  const { data } = await api.get("/api/lab/dashboard/monthly-reports");
  return data;
};


// Get Pending Samples
export const getPendingSamples = async () => {
  const { data } = await api.get("/api/lab/dashboard/pending-samples");
  return data;
};