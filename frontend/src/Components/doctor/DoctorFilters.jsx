import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const DoctorFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    specialty: "",
    experience: "",
    fee: "",
    rating: "",
    available: false,
  });

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      
      {/* Header */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <FilterAltOutlinedIcon fontSize="small" />
        Filters
      </h2>

      {/* Specialty */}
      <div>
        <label className="text-sm text-gray-600">Specialty</label>
        <select
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          onChange={(e) => handleChange("specialty", e.target.value)}
        >
          <option value="">All</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="ENT">ENT</option>
          <option value="Neurologist">Neurologist</option>
        </select>
      </div>

      {/* Experience */}
      <div>
        <label className="text-sm text-gray-600">Experience</label>
        <select
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          onChange={(e) => handleChange("experience", e.target.value)}
        >
          <option value="">Any</option>
          <option value="5+">5+ Years</option>
          <option value="10+">10+ Years</option>
          <option value="15+">15+ Years</option>
        </select>
      </div>

      {/* Fee */}
      <div>
        <label className="text-sm text-gray-600">Consultation Fee</label>
        <select
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          onChange={(e) => handleChange("fee", e.target.value)}
        >
          <option value="">Any</option>
          <option value="low">Under 1000</option>
          <option value="mid">1000 - 3000</option>
          <option value="high">3000+</option>
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="text-sm text-gray-600 flex items-center gap-1">
          <StarOutlinedIcon fontSize="small" />
          Rating
        </label>

        <select
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          onChange={(e) => handleChange("rating", e.target.value)}
        >
          <option value="">Any</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-600">Available Today</span>

        <input
          type="checkbox"
          className="w-4 h-4 accent-purple-600"
          onChange={(e) => handleChange("available", e.target.checked)}
        />
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          const reset = {
            specialty: "",
            experience: "",
            fee: "",
            rating: "",
            available: false,
          };
          setFilters(reset);
          onFilterChange?.(reset);
        }}
        className="w-full mt-3 text-sm text-purple-700 hover:text-purple-900 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default DoctorFilters;