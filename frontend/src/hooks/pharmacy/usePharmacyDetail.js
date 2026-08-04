import { useState, useEffect, useCallback } from "react";

import {
  getPharmacyById,
  getMedicinesByPharmacy,
} from "../../api/pharmacy/pharmacyApi";

const usePharmacyDetail = (pharmacyId) => {
  const [pharmacy, setPharmacy] = useState(null);
  const [medicines, setMedicines] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPharmacyDetail = useCallback(async () => {
    if (!pharmacyId) return;

    try {
      setLoading(true);
      setError(null);

      const [pharmacyRes, medicineRes] = await Promise.all([
        getPharmacyById(pharmacyId),
        getMedicinesByPharmacy(pharmacyId),
      ]);

      setPharmacy(pharmacyRes.pharmacy || null);
      setMedicines(medicineRes.medicines || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch pharmacy details"
      );
    } finally {
      setLoading(false);
    }
  }, [pharmacyId]);

  useEffect(() => {
    fetchPharmacyDetail();
  }, [fetchPharmacyDetail]);

  return {
    pharmacy,
    medicines,
    loading,
    error,
    refetch: fetchPharmacyDetail,
  };
};

export default usePharmacyDetail;