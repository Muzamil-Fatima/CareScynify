import React from "react";
import { useClinic } from "../../hooks/useClinic";
import { useNavigate } from "react-router-dom";

const Clinic = () => {
  const { clinics, setSelectedClinic } = useClinic();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Clinics
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white p-5 rounded-xl shadow-md"
          >
            <h2 className="text-xl font-semibold">{clinic.name}</h2>
            <p className="text-gray-500">{clinic.location}</p>

            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
              onClick={() => {
                setSelectedClinic(clinic);
                navigate(`/clinic/${clinic.id}`);
              }}
            >
              View Clinic
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clinic;