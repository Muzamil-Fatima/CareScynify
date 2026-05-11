import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import StarIcon from "@mui/icons-material/Star";

const ClinicFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    rating: "",
    service: "",
    openNow: false,
  });

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const resetFilters = () => {
    const reset = {
      type: "",
      location: "",
      rating: "",
      service: "",
      openNow: false,
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

      {/* Clinic Type */}
      <div>
        <label className="text-sm text-gray-600">Clinic Type</label>
        <select
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="">All</option>
          <option value="general">General Clinic</option>
          <option value="dental">Dental Clinic</option>
          <option value="eye">Eye Clinic</option>
          <option value="skin">Skin Clinic</option>
          <option value="cardiology">Cardiology Clinic</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="text-sm text-gray-600">Location</label>
        <input
          type="text"
          placeholder="Enter city or area"
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      {/* Rating */}
      <div>
        <label className="text-sm text-gray-600 flex items-center gap-1">
          <StarIcon fontSize="small" />
          Rating
        </label>

        <select
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => handleChange("rating", e.target.value)}
        >
          <option value="">Any</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>

      {/* Services */}
      <div>
        <label className="text-sm text-gray-600">Services</label>
        <select
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => handleChange("service", e.target.value)}
        >
          <option value="">All Services</option>
          <option value="emergency">Emergency Care</option>
          <option value="xray">X-Ray</option>
          <option value="lab">Lab Tests</option>
          <option value="surgery">Surgery</option>
        </select>
      </div>

      {/* Open Now */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Open Now</span>
        <input
          type="checkbox"
          className="w-4 h-4 accent-purple-600"
          onChange={(e) => handleChange("openNow", e.target.checked)}
        />
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full text-sm text-purple-700 hover:text-purple-900 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ClinicFilters;