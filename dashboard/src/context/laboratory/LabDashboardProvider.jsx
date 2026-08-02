import React, { useState, useCallback } from "react";
import LabDashboardContext from "./LabDashboardContext";

import {
  getLabDashboardStats,
  getRecentSamples,
  getTestPerformance,
  getMonthlyReports,
  getPendingSamples,
} from "../../api/laboratory/labDashboardApi";

const defaultStats = {
  pendingSamples: 0,
  processingSamples: 0,
  completedSamples: 0,
  urgentCases: 0,
  totalSamples: 0,
  totalTests: 0,
};

const LabDashboardProvider = ({ children }) => {
  const [stats, setStats] = useState(defaultStats);

  const [recentSamples, setRecentSamples] = useState([]);

  const [testPerformance, setTestPerformance] = useState([]);

  const [monthlyReports, setMonthlyReports] = useState([]);

  const [pendingSamples, setPendingSamples] = useState([]);

  const [loading, setLoading] = useState(false);

  // Dashboard Statistics

  const fetchLabDashboardStats = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getLabDashboardStats();

      setStats({
        ...defaultStats,
        ...(data?.stats || {}),
      });

      return data;
    } catch (error) {
      console.log("Dashboard Stats Error:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Recent Samples

  const fetchRecentSamples = useCallback(async () => {
    try {
      const data = await getRecentSamples();

      setRecentSamples(data?.samples || []);

      return data;
    } catch (error) {
      console.log("Recent Samples Error:", error);

      throw error;
    }
  }, []);

  // Test Performance

  const fetchTestPerformance = useCallback(async () => {
    try {
      const data = await getTestPerformance();

      setTestPerformance(data?.performance || []);

      return data;
    } catch (error) {
      console.log("Test Performance Error:", error);

      throw error;
    }
  }, []);

  // Monthly Reports

  const fetchMonthlyReports = useCallback(async () => {
    try {
      const data = await getMonthlyReports();

      setMonthlyReports(data?.reports || []);

      return data;
    } catch (error) {
      console.log("Monthly Reports Error:", error);

      throw error;
    }
  }, []);

  // Pending Samples

  const fetchPendingSamples = useCallback(async () => {
    try {
      const data = await getPendingSamples();

      setPendingSamples(data?.samples || []);

      return data;
    } catch (error) {
      console.log("Pending Samples Error:", error);

      throw error;
    }
  }, []);

  return (
    <LabDashboardContext.Provider
      value={{
        stats,

        recentSamples,

        testPerformance,

        monthlyReports,

        pendingSamples,

        loading,

        fetchLabDashboardStats,

        fetchRecentSamples,

        fetchTestPerformance,

        fetchMonthlyReports,

        fetchPendingSamples,
      }}
    >
      {children}
    </LabDashboardContext.Provider>
  );
};

export default LabDashboardProvider;
