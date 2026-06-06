import { useEffect, useState, useCallback } from "react";
import { api } from "../api/axios";

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

      const { data } = await api.get(`/api/doctors?${params.toString()}`);

      console.log(data);

      setDoctors(data.doctors);
    } catch (err) {
      setError(err.message);
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
