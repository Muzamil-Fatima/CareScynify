import React from "react";

const HospitalCard = () => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">

      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
        alt="Hospital"
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5">

        {/* Name */}
        <h2 className="text-xl font-bold text-blue-600">
          City Care Hospital
        </h2>

        {/* Address */}
        <p className="text-gray-500 text-sm mt-1">
          Main Boulevard, Narowal
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-3">
          A modern healthcare facility providing emergency care, surgery,
          and specialist consultations with experienced doctors.
        </p>

        {/* Info */}
        <div className="mt-4 flex justify-between text-sm text-gray-700">
          <span>⭐ 4.5 Rating</span>
          <span>24/7 Open</span>
        </div>

        {/* Button */}
        <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;