import { useCallback, useEffect, useState } from "react";
import { getAllMedicines } from "../../api/pharmacy/medicineApi";

export const useMedicine = (filters = {}) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllMedicines(filters);

      setMedicines(data.medicines || []);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to fetch medicines."
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  return {
    medicines,
    loading,
    error,
    refetch: fetchMedicines,
  };
};