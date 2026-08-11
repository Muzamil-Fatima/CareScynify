import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { globalSearch } from "../../api/doctor/searchApi";
import { useGlobalSearchContext } from "../../context/doctor/GlobalSearchContext";

const useGlobalSearch = () => {
  const location = useLocation();

  const { searchValue, setSearchValue, clearSearch } = useGlobalSearchContext();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const path = location.pathname;

  // DETERMINE SEARCH TYPE

  let type = null;
  let placeholder = "Search...";

  if (path === "/doctor/appointments") {
    type = "appointments";
    placeholder = "Search appointments...";
  } else if (path === "/doctor/patients" || path === "/patients") {
    // IMPORTANT: Search both appointments and DoctorPatient records because CareScynify patients may exist through appointments.
    type = "all";
    placeholder = "Search patients...";
  } else if (path === "/doctor/reviews") {
    type = "reviews";
    placeholder = "Search reviews...";
  }

  // CLEAR SEARCH WHEN PAGE CHANGES

  useEffect(() => {
    setResults([]);
    setError(null);
    clearSearch();
  }, [path, clearSearch]);

  // SEARCH API

  useEffect(() => {
    const query = searchValue.trim();

    // Nothing to search

    if (!query || !type) {
      setResults([]);
      setLoading(false);
      setError(null);

      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await globalSearch({
          query,
          type,
          page: 1,
          limit: 10,
        });

        if (cancelled) return;

        setResults(response?.results || []);
      } catch (err) {
        if (cancelled) return;

        // console.error("Global search error:", err);

        setError(err?.response?.data?.message || "Unable to perform search");

        setResults([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchValue, type]);

  // RETURN

  return {
    type,
    placeholder,

    searchValue,
    setSearchValue,
    clearSearch,

    results,
    loading,
    error,
  };
};

export default useGlobalSearch;
