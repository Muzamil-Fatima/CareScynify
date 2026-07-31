import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

const initialFilters = {
  searchType: "test",
  search: "",
  category: "",
  status: "",
  laboratoryId: "",
};

const LabTestFilters = ({ onFilterChange }) => {
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
    filters.search ||
    filters.category ||
    filters.status ||
    filters.laboratoryId;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <FilterAltOutlinedIcon className="text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Test Filters
        </h2>
      </div>

      {/* Search Test */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Search Test
        </label>

        <div className="relative">
          <SearchOutlinedIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />

          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Search by test name..."
            className="h-11 w-full rounded-xl border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">All Categories</option>
          <option value="Hematology">Hematology</option>
          <option value="Biochemistry">Biochemistry</option>
          <option value="Microbiology">Microbiology</option>
          <option value="Serology">Serology</option>
          <option value="Radiology">Radiology</option>
          <option value="Pathology">Pathology</option>
        </select>
      </div>

      {/* Status */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Status
        </label>

        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Laboratory */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Laboratory ID
        </label>

        <input
          type="text"
          value={filters.laboratoryId}
          onChange={(e) => handleChange("laboratoryId", e.target.value)}
          placeholder="Enter Laboratory ID"
          className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
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

export default LabTestFilters;