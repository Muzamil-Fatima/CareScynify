import { useEffect, useState } from "react";
import axios from "axios";

export const useDoctorProfile = (doctorId) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctor = async () => {
    if (!doctorId) return;

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `/api/doctors/${doctorId}`
      );

      setDoctor(data);
    } catch (err) {
      setError(err.message || "Failed to fetch doctor profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);

  return {
    doctor,
    loading,
    error,
    refetch: fetchDoctor,
  };
};