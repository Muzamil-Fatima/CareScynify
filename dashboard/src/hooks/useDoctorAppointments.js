import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getDoctorAppointments } from "../api/appointmentApi";

const useDoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDoctorAppointments();

      console.log("Appointments API Response:", data);

      const safeData = Array.isArray(data) ? data : [];

      setAppointments(safeData);
    } catch (err) {
      console.error("Fetch appointments error:", err);

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load appointments";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
  };
};

export default useDoctorAppointments;