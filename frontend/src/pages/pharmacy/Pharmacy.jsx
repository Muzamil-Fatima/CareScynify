import React from "react";
import { usePharmacy } from "../../hooks/usePharmacy";

const Pharmacy = () => {
  const { pharmacies, setSelectedPharmacy, loading } = usePharmacy();

  if (loading) {
    return <p className="text-center mt-10">Loading pharmacies...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Pharmacies
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pharmacies.map((pharmacy) => (
          <div
            key={pharmacy._id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">
              {pharmacy.pharmacyName}
            </h2>

            <p className="text-purple-600 mt-1">
              📍 {pharmacy.city}
            </p>

            <p className="text-gray-500 text-sm">
              {pharmacy.address}
            </p>

            <p className="mt-2 text-sm">
              Type: {pharmacy.pharmacyType}
            </p>

            <p
              className={`mt-1 text-sm font-medium ${
                pharmacy.isOpen
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {pharmacy.isOpen ? "Open" : "Closed"}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {pharmacy.homeDelivery && (
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  Home Delivery
                </span>
              )}

              {pharmacy.acceptPrescription && (
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  Prescription
                </span>
              )}

              {pharmacy.cashOnDelivery && (
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  Cash on Delivery
                </span>
              )}
            </div>

            <button
              onClick={() => setSelectedPharmacy(pharmacy)}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
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