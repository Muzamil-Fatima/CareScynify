import { useCallback, useEffect, useState } from "react";
import { getMedicineById } from "../../api/pharmacy/medicineApi";

export const useMedicineDetails = (id) => {
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMedicine = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError("");

      const data = await getMedicineById(id);

      setMedicine(data); // ✅ Fixed
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to fetch medicine."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMedicine();
  }, [fetchMedicine]);

  return {
    medicine,
    loading,
    error,
    refetch: fetchMedicine,
  };
};