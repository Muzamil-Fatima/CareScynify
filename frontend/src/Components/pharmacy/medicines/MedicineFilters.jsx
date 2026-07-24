import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const MedicineFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    prescription: "",
    homeDelivery: false,
    inStock: false,
  });

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const resetFilters = () => {
    const reset = {
      category: "",
      price: "",
      prescription: "",
      homeDelivery: false,
      inStock: false,
    };

    setFilters(reset);
    onFilterChange?.(reset);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <FilterAltOutlinedIcon fontSize="small" />
        Filters
      </h2>

      {/* Category */}
      <div>
        <label className="text-sm text-gray-600">Category</label>

        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="">All</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Vitamins">Vitamins</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Heart Care">Heart Care</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="text-sm text-gray-600">Price</label>

        <select
          value={filters.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="">Any</option>
          <option value="low">Under Rs. 500</option>
          <option value="mid">Rs. 500 - 1500</option>
          <option value="high">Above Rs. 1500</option>
        </select>
      </div>

      {/* Prescription */}
      <div>
        <label className="text-sm text-gray-600">
          Prescription
        </label>

        <select
          value={filters.prescription}
          onChange={(e) => handleChange("prescription", e.target.value)}
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          <option value="">All</option>
          <option value="required">Prescription Required</option>
          <option value="notRequired">No Prescription</option>
        </select>
      </div>

      {/* Home Delivery */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Home Delivery
        </span>

        <input
          type="checkbox"
          checked={filters.homeDelivery}
          onChange={(e) =>
            handleChange("homeDelivery", e.target.checked)
          }
          className="w-4 h-4 accent-purple-600"
        />
      </div>

      {/* In Stock */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          In Stock
        </span>

        <input
          type="checkbox"
          checked={filters.inStock}
          onChange={(e) =>
            handleChange("inStock", e.target.checked)
          }
          className="w-4 h-4 accent-purple-600"
        />
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full mt-3 text-sm text-purple-700 hover:text-purple-900 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default MedicineFilters;