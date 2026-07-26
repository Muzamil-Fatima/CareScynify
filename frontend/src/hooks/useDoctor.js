import { useEffect, useState, useCallback } from "react";
import { getDoctors, searchDoctors, filterDoctors } from "../api/doctorApi";

export const useDoctor = (filters = {}) => {
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { search, specialty, experience, fee, rating, available } = filters;

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data;

      //  Search API
      if (search) {
        data = await searchDoctors(search);

        setDoctors(data.doctors || data);
        setPagination({});
      }

      // Filter API
      else if (specialty || experience || fee || rating || available) {
        data = await filterDoctors({
          specialty,
          experience,
          fee,
          rating,
          available,
        });

        setDoctors(data.doctors || data);
        setPagination({});
      }

      // Normal Doctor Listing API
      else {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", 10);

        data = await getDoctors(params.toString());

        setDoctors(data.doctors || []);
        setPagination(data.pagination || {});
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch doctors",
      );
    } finally {
      setLoading(false);
    }
  }, [search, specialty, experience, fee, rating, available, page]);

  // Reset pagination when filters/search change
  useEffect(() => {
    setPage(1);
  }, [search, specialty, experience, fee, rating, available]);

  // Fetch doctors
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
