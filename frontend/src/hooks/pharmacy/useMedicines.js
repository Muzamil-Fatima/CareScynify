import { useCallback, useEffect, useState } from "react";
import { filterMedicine } from "../../api/pharmacy/medicineApi";

export const useMedicine = (filters = {}) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const medicineFilters = {
        // Main SearchBar search
        name: filters.search || "",

        // Medicine filters
        category: filters.category || "",
        price: filters.price || "",
        pharmacyId: filters.pharmacyId || "",
        isActive: filters.isActive || false,
      };

      const data = await filterMedicine(medicineFilters);

      setMedicines(data.medicines || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to fetch medicines."
      );
    } finally {
      setLoading(false);
    }
  }, [
    filters.search,
    filters.category,
    filters.price,
    filters.pharmacyId,
    filters.isActive,
  ]);

  useEffect(() => {
    if (filters.searchType === "medicine") {
      fetchMedicines();
    }
  }, [fetchMedicines, filters.searchType]);

  return {
    medicines,
    loading,
    error,
    refetch: fetchMedicines,
  };
};