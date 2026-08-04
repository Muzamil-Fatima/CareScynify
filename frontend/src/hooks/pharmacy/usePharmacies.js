import { useEffect, useState, useCallback } from "react";

import {
  getPharmacies,
  searchPharmacies,
  filterPharmacies,
} from "../../api/pharmacy/pharmacyApi.js";

const usePharmacies = (filters = {}) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { search, city, pharmacyType, homeDelivery, available } = filters;

  const fetchPharmacies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let data;

      // Search
      if (search) {
        data = await searchPharmacies(search);

        setPharmacies(data.pharmacies || data);
        setPagination({});
      }

      // Filter
      else if (city || pharmacyType || homeDelivery || available) {
        data = await filterPharmacies({
          city,
          pharmacyType,
          homeDelivery,
          available,
        });

        setPharmacies(data.pharmacies || data);
        setPagination({});
      }

      // Normal Listing
      else {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", 12);

        data = await getPharmacies(params.toString());

        setPharmacies(data.pharmacies || []);
        setPagination(data.pagination || {});
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch pharmacies",
      );
    } finally {
      setLoading(false);
    }
  }, [search, city, pharmacyType, homeDelivery, available, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, city, pharmacyType, homeDelivery, available]);

  // Fetch pharmacies
  useEffect(() => {
    fetchPharmacies();
  }, [fetchPharmacies]);

  return {
    pharmacies,
    pagination,
    page,
    setPage,
    loading,
    error,
    refetch: fetchPharmacies,
  };
};

export default usePharmacies;
