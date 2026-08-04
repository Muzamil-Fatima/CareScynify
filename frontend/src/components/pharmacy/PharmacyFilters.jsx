import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import Switch from "@mui/material/Switch";

const initialFilters = {
  category: "",
  price: "",
  prescription: "",
  homeDelivery: false,
  inStock: false,
};

const PharmacyFilters = ({ onFilterChange }) => {
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
    filters.category ||
    filters.price ||
    filters.prescription ||
    filters.homeDelivery ||
    filters.inStock;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center gap-2">
        <FilterAltOutlinedIcon className="text-purple-600" />

        <h2 className="text-lg font-semibold text-gray-800">
          Filters
        </h2>
      </div>

      {/* Category */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Medicine Category
        </label>

        <div className="relative">
          <SearchOutlinedIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />

          <input
            list="medicine-categories"
            value={filters.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
            placeholder="Search category..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />

          <datalist id="medicine-categories">
            <option value="Pain Relief" />
            <option value="Antibiotics" />
            <option value="Vitamins" />
            <option value="Diabetes" />
            <option value="Heart Care" />
          </datalist>
        </div>
      </div>

      {/* Price */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Price Range
        </label>

        <select
          value={filters.price}
          onChange={(e) =>
            handleChange("price", e.target.value)
          }
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">Any Price</option>
          <option value="low">Under Rs. 500</option>
          <option value="mid">Rs. 500 - 1500</option>
          <option value="high">Above Rs. 1500</option>
        </select>
      </div>

      {/* Prescription */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Prescription
        </label>

        <select
          value={filters.prescription}
          onChange={(e) =>
            handleChange("prescription", e.target.value)
          }
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        >
          <option value="">All Medicines</option>
          <option value="required">
            Prescription Required
          </option>
          <option value="notRequired">
            No Prescription
          </option>
        </select>
      </div>

      {/* Home Delivery */}

      <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-700">
            Home Delivery
          </p>

          <p className="text-xs text-gray-500">
            Show pharmacies offering home delivery
          </p>
        </div>

        <Switch
          checked={filters.homeDelivery}
          onChange={(e) =>
            handleChange("homeDelivery", e.target.checked)
          }
          color="secondary"
        />
      </div>

      {/* In Stock */}

      <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-700">
            In Stock
          </p>

          <p className="text-xs text-gray-500">
            Show only available medicines
          </p>
        </div>

        <Switch
          checked={filters.inStock}
          onChange={(e) =>
            handleChange("inStock", e.target.checked)
          }
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

export default PharmacyFilters;