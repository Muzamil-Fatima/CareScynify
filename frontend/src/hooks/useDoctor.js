import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export const useDoctor = (filters = {}) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (filters.search) {
        params.append("search", filters.search);
      }

      if (filters.specialty) {
        params.append("specialization", filters.specialty);
      }

      if (filters.available) {
        params.append("consultationType", "online");
      }

      const { data } = await axios.get(`/api/doctors?${params.toString()}`);

      setDoctors(data.doctors); // IMPORTANT FIX
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [filters.search, filters.specialty, filters.available]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    loading,
    error,
    refetch: fetchDoctors,
  };
};
