import { useEffect, useState } from "react";

export const useClinics = (filters) => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClinics = async () => {
    try {
      setLoading(true);
      setError(null);

      // 🔥 Replace this with real API later
      const response = await fetch("/api/clinics");
      const data = await response.json();

      let result = Array.isArray(data) ? data : data?.clinics || [];

      // FILTER LOGIC (frontend demo)

      if (filters?.search) {
        result = result.filter((c) =>
          c.name?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters?.type) {
        result = result.filter((c) => c.type === filters.type);
      }

      if (filters?.rating) {
        result = result.filter((c) => c.rating >= Number(filters.rating));
      }

      if (filters?.openNow) {
        result = result.filter((c) => c.isOpen === true);
      }

      setClinics(result);
    } catch (err) {
      setError("Failed to load clinics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, [filters]);

  return { clinics, loading, error };
};