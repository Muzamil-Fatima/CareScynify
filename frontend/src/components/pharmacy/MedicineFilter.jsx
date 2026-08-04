import React from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

const initialFilters = {
  search: "",
  category: "",
  prescription: "",
  pharmacyId: "",
};
const MedicineFilter = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFilterChange(initialFilters);
  };

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.prescription ||
    filters.pharmacyId;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <FilterAltOutlinedIcon className="text-purple-600" />

        <h2 className="text-lg font-semibold text-gray-800">
          Medicine Filters
        </h2>
      </div>

      {/* Search Medicine */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Search Medicine
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
            placeholder="Search by medicine name..."
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
          <option value="Pain Relief">Pain Relief</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Vitamins">Vitamins</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Heart Care">Heart Care</option>
        </select>
      </div>

      {/* Prescription */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Prescription
        </label>

        <select
          value={filters.prescription}
          onChange={(e) => handleChange("prescription", e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">All Medicines</option>
          <option value="required">Prescription Required</option>
          <option value="notRequired">No Prescription</option>
        </select>
      </div>

      {/* Pharmacy */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Pharmacy ID
        </label>

        <input
          type="text"
          value={filters.pharmacyId}
          onChange={(e) => handleChange("pharmacyId", e.target.value)}
          placeholder="Enter Pharmacy ID"
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

export default MedicineFilter;
