import React from "react";

const HospitalSearchBar = () => {
  return (
    <div className="w-full bg-white shadow-md border border-gray-100 rounded-2xl p-4">

      {/* Title */}
      <h2 className="text-xl font-bold text-blue-600 mb-3">
        Search Hospitals
      </h2>

      {/* Search Box */}
      <div className="flex flex-col sm:flex-row gap-3">

        <input
          type="text"
          placeholder="Search hospital, doctor, department..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Search
        </button>

      </div>

      {/* Quick Tags */}
      <div className="flex flex-wrap gap-2 mt-3">

        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full cursor-pointer">
          Cardiology
        </span>

        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full cursor-pointer">
          Neurology
        </span>

        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full cursor-pointer">
          24/7 Hospitals
        </span>

        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full cursor-pointer">
          Emergency
        </span>

      </div>

    </div>
  );
};

export default HospitalSearchBar;