import React from "react";

const HospitalFilters = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-100">

      {/* Title */}
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Filter Hospitals
      </h2>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search hospital, doctor..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* City */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            City
          </label>
          <select className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>All Cities</option>
            <option>Lahore</option>
            <option>Islamabad</option>
            <option>Karachi</option>
            <option>Narowal</option>
          </select>
        </div>

        {/* Department */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Department
          </label>
          <select className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>All Departments</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Orthopedics</option>
            <option>Pediatrics</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Availability
          </label>
          <select className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>All</option>
            <option>Open Now</option>
            <option>24/7</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Rating
          </label>
          <select className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>All Ratings</option>
            <option>5 Star</option>
            <option>4+ Star</option>
            <option>3+ Star</option>
          </select>
        </div>

      </div>

      {/* Button */}
      <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Apply Filters
      </button>

    </div>
  );
};

export default HospitalFilters;