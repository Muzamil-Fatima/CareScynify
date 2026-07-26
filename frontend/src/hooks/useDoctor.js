import { useEffect, useState, useCallback } from "react";
import { getDoctors } from "../api/doctorApi";

export const useDoctor = (filters = {}) => {
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

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

      params.append("page", page);
      params.append("limit", 10);

      const data = await getDoctors(params.toString());

      setDoctors(data.doctors);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters.search, filters.specialty, filters.available, page]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.specialty, filters.available]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    pagination,
    page,
    setPage,
    loading,
    error,
    refetch: fetchDoctors,
  };
};