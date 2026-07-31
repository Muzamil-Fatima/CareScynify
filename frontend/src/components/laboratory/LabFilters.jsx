import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import Switch from "@mui/material/Switch";

const initialFilters = {
  city: "",
  search: "",
  rating: "",
  homeCollection: false,
  available: false,
};

// lab filter

const LabFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (key, value) => {
    const updated = {
      ...filters,
      [key]: value,
    };

    setFilters(updated);
    onFilterChange?.(updated);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange?.(initialFilters);
  };

  const hasActiveFilters =
    filters.city ||
    filters.search ||
    filters.rating ||
    filters.homeCollection ||
    filters.available;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center gap-2">
        <FilterAltOutlinedIcon className="text-purple-600" />

        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      </div>

      {/* City */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Location
        </label>

        <div className="relative">
          <SearchOutlinedIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />

          <input
            list="cities"
            value={filters.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Search city..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

          <datalist id="cities">
            <option value="Gujranwala" />

            <option value="Lahore" />

            <option value="Islamabad" />

            <option value="Rawalpindi" />

            <option value="Karachi" />
          </datalist>
        </div>
      </div>

      {/* Test Availability */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Search Laboratory
        </label>

        <div className="relative">
          <SearchOutlinedIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />

          <input
            list="tests"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Search laboratory..."
            className="h-11 w-full rounded-xl border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

          <datalist>
            <option value="Chughtai Lab" />
            <option value="Excel Labs" />
            <option value="IDC" />
            <option value="Mughal Lab" />
            <option value="Al-Noor Lab" />
          </datalist>
        </div>
      </div>

      {/* Rating */}

      <div className="mb-5">
        <label className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-700">
          <StarOutlinedIcon fontSize="small" className="text-yellow-500" />
          Rating
        </label>

        <select
          value={filters.rating}
          onChange={(e) => handleChange("rating", e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">Any Rating</option>

          <option value="3">3+ Stars</option>

          <option value="4">4+ Stars</option>

          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>

      {/* Home Collection */}

      <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-700">
            Home Sample Collection
          </p>

          <p className="text-xs text-gray-500">Lab collects sample from home</p>
        </div>

        <Switch
          checked={filters.homeCollection}
          onChange={(e) => handleChange("homeCollection", e.target.checked)}
          color="secondary"
        />
      </div>

      {/* Available */}

      <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Open Today</p>

          <p className="text-xs text-gray-500">Show currently available labs</p>
        </div>

        <Switch
          checked={filters.available}
          onChange={(e) => handleChange("available", e.target.checked)}
          color="secondary"
        />
      </div>

      {/* Reset */}

      <button
        onClick={resetFilters}
        disabled={!hasActiveFilters}
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all ${
          hasActiveFilters
            ? "border border-purple-200 text-purple-700 hover:bg-purple-50"
            : "cursor-not-allowed border border-gray-200 text-gray-400"
        }`}
      >
        <RestartAltOutlinedIcon fontSize="small" />
        Reset Filters
      </button>
    </div>
  );
};

export default LabFilters;
