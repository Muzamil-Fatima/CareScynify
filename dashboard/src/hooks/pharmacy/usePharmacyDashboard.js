import { useCallback, useEffect, useState } from "react";

import { getPharmacyDashboard } from "../../api/pharmacy/dashboardApi";

const usePharmacyDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getPharmacyDashboard();

      setDashboard(data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);

      setError(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    refetch: fetchDashboard,
  };
};

export default usePharmacyDashboard;
