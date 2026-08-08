import { useContext, useEffect, useState } from "react";
import DoctorContext from "../../context/doctor/DoctorContext";
import { getDoctorDashboard } from "../../api/doctor/doctorDashboard";

const useDoctorDashboard = (period = "week") => {
  const { activeWorkplaceId } = useContext(DoctorContext);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getDoctorDashboard(
          activeWorkplaceId || "all",
          period,
        );
        setDashboard(res.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [activeWorkplaceId, period]);
  return {
    dashboard,
    loading,
    error,
  };
};
export default useDoctorDashboard;
