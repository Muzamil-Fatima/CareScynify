import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export const useDoctor = (filters = {}) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Destructure filters
  const {
    specialty,
    rating,
    experience,
    available,
    search,
  } = filters;

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (specialty)
        params.append("specialty", specialty);

      if (rating)
        params.append("rating", rating);

      if (experience)
        params.append("experience", experience);

      if (available)
        params.append("available", available);

      if (search)
        params.append("search", search);

      const { data } = await axios.get(
        `/api/doctors?${params.toString()}`
      );

      setDoctors(data);
    } catch (err) {
      setError(err.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  }, [specialty, rating, experience, available, search]);

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