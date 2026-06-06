import { useEffect, useState, useCallback } from "react";
import { api } from "../api/axios";

export const useDoctorProfile = (doctorId) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctor = useCallback(async () => {
    if (!doctorId) return;

    try {
      setLoading(true);
      setError(null);

      const { data } = await api.get(`/api/doctors/${doctorId}`);

      setDoctor(data);
    } catch (err) {
      setError(err.message || "Failed to fetch doctor profile");
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  useEffect(() => {
    fetchDoctor();
  }, [fetchDoctor]);

  return {
    doctor,
    loading,
    error,
    refetch: fetchDoctor,
  };
};