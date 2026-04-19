import React from "react";
import { useLab } from "../../hooks/useLab";

const Laboratory = () => {
  const { labs, setSelectedLab } = useLab();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Laboratories
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            {/* Name */}
            <h2 className="text-xl font-semibold">{lab.name}</h2>

            {/* Location */}
            <p className="text-blue-600 mt-1">📍 {lab.location}</p>
            <p className="text-gray-500 text-sm">{lab.address}</p>

            {/* Rating */}
            <p className="mt-2 text-sm">⭐ Rating: {lab.rating}</p>

            {/* Tests */}
            <div className="mt-3 flex flex-wrap gap-2">
              {lab.tests.map((test, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                >
                  {test}
                </span>
              ))}
            </div>

            {/* Button */}
            <button
              onClick={() => setSelectedLab(lab)}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            >
              Book Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Laboratory;