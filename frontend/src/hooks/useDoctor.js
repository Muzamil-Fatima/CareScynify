import { useEffect, useState } from "react";
import axios from "axios";

export const useDoctors = (filters = {}) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params from filters
      const params = new URLSearchParams();

      if (filters.specialty) params.append("specialty", filters.specialty);
      if (filters.rating) params.append("rating", filters.rating);
      if (filters.experience) params.append("experience", filters.experience);
      if (filters.available) params.append("available", filters.available);
      if (filters.search) params.append("search", filters.search);

      const { data } = await axios.get(
        `/api/doctors?${params.toString()}`
      );

      setDoctors(data);
    } catch (err) {
      setError(err.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [JSON.stringify(filters)]);

  return {
    doctors,
    loading,
    error,
    refetch: fetchDoctors,
  };
};