import { useEffect, useState, useCallback } from "react";

import {
  getLaboratories,
  searchLaboratories,
  filterLaboratories,
} from "../../api/laboratory/labApi.js";

const useLaboratories = (filters = {}) => {
  const [laboratories, setLaboratories] = useState([]);

  const [pagination, setPagination] = useState({});

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const { search, city, test, rating, homeCollection, available } = filters;

  const fetchLaboratories = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      let data;

      // Search API

      if (search) {
        data = await searchLaboratories(search);

        setLaboratories(data.laboratories || data);

        setPagination({});
      }

      // Filter API
      else if (city || test || rating || homeCollection || available) {
        data = await filterLaboratories({
          city,

          test,

          rating,

          homeCollection,

          available,
        });

        setLaboratories(data.laboratories || data);

        setPagination({});
      }

      // Normal Laboratory Listing
      else {
        const params = new URLSearchParams();

        params.append("page", page);

        params.append("limit", 12);

        data = await getLaboratories(params.toString());

        setLaboratories(data.laboratories || []);

        setPagination(data.pagination || {});
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch laboratories",
      );
    } finally {
      setLoading(false);
    }
  }, [search, city, test, rating, homeCollection, available, page]);

  // Reset page when filters change

  useEffect(() => {
    setPage(1);
  }, [search, city, test, rating, homeCollection, available]);

  // Fetch laboratories

  useEffect(() => {
    fetchLaboratories();
  }, [fetchLaboratories]);

  return {
    laboratories,

    pagination,

    page,

    setPage,

    loading,

    error,

    refetch: fetchLaboratories,
  };
};

export default useLaboratories;
