import React, { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const placeholders = [
  "Search by doctor name...",
  "Search by specialization (e.g. Cardiologist)...",

  "Search by hospital or clinic...",
  "Search by symptoms...",
];

const quickFilters = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Dentist",
  "Pediatrician",
];

const DoctorSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const search = (value = query) => {
    onSearch?.(value.trim());
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }

    if (e.key === "Escape") {
      clearSearch();
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Box */}
      <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 sm:px-4 py-3 shadow-sm transition-all duration-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
        <SearchOutlinedIcon className="text-gray-500 shrink-0" />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[placeholderIndex]}
          className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-500 outline-none"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="shrink-0 rounded-full p-1 hover:bg-gray-100"
          >
            <CloseOutlinedIcon className="text-gray-500" />
          </button>
        )}

        <button
          onClick={() => search()}
          className="hidden sm:block rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
        >
          Search
        </button>
      </div>

      {/* Quick Filters */}
      <div className="rounded-full border border-purple-200 bg-purple-50 px-2.5 sm:px-3 py-1 text-xs font-medium text-purple-700 transition hover:bg-purple-100">
        {quickFilters.map((item) => (
          <button
            key={item}
            onClick={() => {
              setQuery(item);
            }}
            className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 transition hover:bg-purple-100"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoctorSearchBar;
