import { useEffect, useState, useCallback } from "react";
import {
  getLabTest,
  searchLabTest,
  filterLabTest,
  getLabTestById,
} from "../../api/laboratory/labTestApi";

const useLabTest = (filters = {}) => {
  const [tests, setTests] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { search, category, status, laboratoryId } = filters;

  const fetchTests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data;

      // Search
      if (search) {
        data = await searchLabTest(search, page, 12);

        setTests(data.tests || []);
        setPagination(data.pagination || {});
      }

      // Filter
      else if (category || status || laboratoryId) {
        data = await filterLabTest({
          category,
          status,
          laboratoryId,
          page,
          limit: 12,
        });

        setTests(data.tests || []);
        setPagination(data.pagination || {});
      }

      // Normal Listing
      else {
        const params = new URLSearchParams({
          page,
          limit: 12,
        });

        data = await getLabTest(params.toString());

        setTests(data.tests || []);
        setPagination(data.pagination || {});
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch lab tests"
      );
    } finally {
      setLoading(false);
    }
  }, [search, category, status, laboratoryId, page]);

  const fetchLabTestById = useCallback(async (id) => {
    const data = await getLabTestById(id);
    return data;
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, category, status, laboratoryId]);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  return {
    tests,
    pagination,
    page,
    setPage,
    loading,
    error,
    refetch: fetchTests,
    fetchLabTestById,
  };
};

export default useLabTest;