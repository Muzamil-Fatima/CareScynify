import React from "react";
import { useHospital } from "../../hooks/useHospital";
import { useNavigate } from "react-router-dom";

const Hospital = () => {
  const { hospitals, setSelectedHospital } = useHospital();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Hospitals
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{hospital.name}</h2>

            <p className="text-blue-600">📍 {hospital.location}</p>
            <p className="text-gray-500 text-sm">{hospital.address}</p>

            <div className="mt-2 text-sm text-gray-600">
              <p>⭐ Rating: {hospital.rating}</p>
              <p>📞 {hospital.phone}</p>
            </div>

            <button
              onClick={() => {
                setSelectedHospital(hospital);
                navigate(`/hospital/${hospital.id}`);
              }}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              View Hospital
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hospital;