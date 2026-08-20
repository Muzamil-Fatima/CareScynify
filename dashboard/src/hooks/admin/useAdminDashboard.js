
import { useCallback, useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/admin/adminDashboardApi";

const useAdminDashboard = (initialPeriod = 7) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [period, setPeriod] = useState(initialPeriod);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async (selectedPeriod) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAdminDashboard(selectedPeriod);

      if (res?.success) {
        setDashboardData(res.data);
      } else {
        setDashboardData(null);
        setError(res?.message || "Failed to fetch dashboard data");
      }
    } catch (err) {
      setDashboardData(null);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard(period);
  }, [period, fetchDashboard]);

  const changePeriod = useCallback((newPeriod) => {
    const numericPeriod = Number(newPeriod);

    if (![7, 12].includes(numericPeriod)) {
      return;
    }

    setPeriod(numericPeriod);
  }, []);

  return {
    dashboardData,
    period,
    loading,
    error,
    fetchDashboard,
    changePeriod,
  };
};

export default useAdminDashboard;