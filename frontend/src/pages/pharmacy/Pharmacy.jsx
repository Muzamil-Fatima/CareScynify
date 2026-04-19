import React from "react";
import { usePharmacy } from "../../hooks/usePharmacy";

const Pharmacy = () => {
  const { pharmacies, setSelectedPharmacy } = usePharmacy();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Pharmacies
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            {/* Name */}
            <h2 className="text-xl font-semibold">{pharmacy.name}</h2>

            {/* Location */}
            <p className="text-blue-600 mt-1">📍 {pharmacy.location}</p>
            <p className="text-gray-500 text-sm">{pharmacy.address}</p>

            {/* Rating */}
            <p className="mt-2 text-sm">⭐ Rating: {pharmacy.rating}</p>

            {/* Services */}
            <div className="mt-3 flex flex-wrap gap-2">
              {pharmacy.services.map((service, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Button */}
            <button
              onClick={() => setSelectedPharmacy(pharmacy)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Order Medicines
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pharmacy;