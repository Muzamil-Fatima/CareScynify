import React from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import Switch from "@mui/material/Switch";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const initialFilters = {
  name: "",
  category: "",
  price: "",
  pharmacyId: "",
  isActive: false,
};

const MedicineFilter = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFilterChange({
      ...filters,
      ...initialFilters,
    });
  };

  const hasActiveFilters =
    filters.name ||
    filters.category ||
    filters.price ||
    filters.pharmacyId ||
    filters.isActive;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <FilterAltOutlinedIcon className="text-purple-600" />

        <h2 className="text-lg font-semibold text-gray-800">
          Medicine Filters
        </h2>
      </div>

      {/* Medicine Name */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Medicine Name
        </label>

        <div className="relative">
          <SearchOutlinedIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />

          <input
            type="text"
            value={filters.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Search medicine..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <select
          value={filters.category || ""}
          onChange={(e) => handleChange("category", e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">All Categories</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Vitamins">Vitamins</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Heart Care">Heart Care</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Price Range
        </label>

        <select
          value={filters.price || ""}
          onChange={(e) => handleChange("price", e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">Any Price</option>
          <option value="low">Under Rs. 500</option>
          <option value="mid">Rs. 500 - 1500</option>
          <option value="high">Above Rs. 1500</option>
        </select>
      </div>

      {/* Pharmacy */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Pharmacy ID
        </label>

        <input
          type="text"
          value={filters.pharmacyId || ""}
          onChange={(e) => handleChange("pharmacyId", e.target.value)}
          placeholder="Enter Pharmacy ID"
          className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />
      </div>

      {/* Active Medicines */}
      <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Active Medicines</p>

          <p className="text-xs text-gray-500">Show only active medicines</p>
        </div>

        <Switch
          checked={filters.isActive || false}
          onChange={(e) => handleChange("isActive", e.target.checked)}
          color="secondary"
        />
      </div>

      {/* Reset */}
      <button
        type="button"
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

export default MedicineFilter;
