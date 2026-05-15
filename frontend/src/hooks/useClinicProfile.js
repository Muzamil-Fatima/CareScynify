import { useEffect, useState } from "react";

export const useClinicProfile = (id) => {
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClinic = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      //  Replace with real API
      const response = await fetch(`/api/clinics/${id}`);
      const data = await response.json();

      setClinic(data?.clinic || data);
    } catch (err) {
      setError("Failed to load clinic details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, [id]);

  return { clinic, loading, error };
};