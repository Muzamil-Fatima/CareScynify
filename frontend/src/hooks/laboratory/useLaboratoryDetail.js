import { useState, useEffect, useCallback } from "react";

import {
  getLaboratoryById,
  getLabTestsByLaboratory,
} from "../../api/laboratory/labApi";

const useLaboratoryDetail = (labId) => {
  const [laboratory, setLaboratory] = useState(null);
  const [tests, setTests] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLaboratoryDetail = useCallback(async () => {
    if (!labId) return;

    try {
      setLoading(true);
      setError(null);

      const [labRes, testRes] = await Promise.all([
        getLaboratoryById(labId),
        getLabTestsByLaboratory(labId),
      ]);

      setLaboratory(labRes.laboratory || null);
      setTests(testRes.tests || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch laboratory details"
      );
    } finally {
      setLoading(false);
    }
  }, [labId]);

  useEffect(() => {
    fetchLaboratoryDetail();
  }, [fetchLaboratoryDetail]);

  return {
    laboratory,
    tests,
    loading,
    error,
    refetch: fetchLaboratoryDetail,
  };
};

export default useLaboratoryDetail;