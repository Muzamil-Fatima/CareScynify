import React from "react";

const HospitalList = () => {
  const hospitals = [
    {
      name: "City Care Hospital",
      location: "Narowal",
      rating: 4.5,
      status: "24/7 Open",
    },
    {
      name: "Life Health Hospital",
      location: "Lahore",
      rating: 4.7,
      status: "24/7 Open",
    },
    {
      name: "Medicare Clinic",
      location: "Islamabad",
      rating: 4.3,
      status: "Open Now",
    },
    {
      name: "Hope Medical Center",
      location: "Karachi",
      rating: 4.6,
      status: "24/7 Open",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Hospital List
        </h1>
        <p className="text-gray-600 mb-8">
          Find and explore hospitals near you
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-xl transition"
            >
              {/* Name */}
              <h2 className="text-lg font-bold text-blue-600">
                {hospital.name}
              </h2>

              {/* Location */}
              <p className="text-gray-500 text-sm mt-1">
                📍 {hospital.location}
              </p>

              {/* Info */}
              <div className="flex justify-between text-sm text-gray-700 mt-3">
                <span>⭐ {hospital.rating}</span>
                <span>{hospital.status}</span>
              </div>

              {/* Button */}
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default HospitalList;