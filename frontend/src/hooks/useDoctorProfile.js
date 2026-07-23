import { useEffect, useState, useCallback } from "react";
import { api } from "../api/axios";

export const useDoctorProfile = (doctorId) => {
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctor = useCallback(async () => {
    if (!doctorId) return;

    try {
      setLoading(true);
      setError(null);

      const [doctorRes, reviewRes] = await Promise.all([
        api.get(`/api/doctors/${doctorId}`),
        api.get(`/api/review/doctor/${doctorId}`),
      ]);

      setDoctor({
        ...doctorRes.data.doctor,
        name: doctorRes.data.doctor.user?.name,
        avatar: doctorRes.data.doctor.user?.avatar,
      });

      setReviews(reviewRes.data.reviews || []);
    } catch (err) {
      console.log("ERROR:", err);
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
    reviews,
    loading,
    error,
    refetch: fetchDoctor,
  };
};
