import React from "react";
import { useNavigate } from "react-router-dom";

const PharmacyCard = ({ pharmacy }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pharmacy/${pharmacy._id}`);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition hover:shadow-xl">
      {/* Logo */}
      {pharmacy.logo ? (
        <img
          src={pharmacy.logo}
          alt={pharmacy.pharmacyName}
          className="mx-auto h-26 w-26 rounded-full object-cover"
        />
      ) : (
        <div className="mx-auto flex h-26 w-26 items-center justify-center rounded-full bg-gray-200 text-4xl">
          💊
        </div>
      )}

      {/* Pharmacy Name */}
      <h2 className="mt-3 text-center text-lg font-semibold">
        {pharmacy.pharmacyName}
      </h2>

      {/* Pharmacy Type */}
      <p className="text-center font-medium text-blue-600">
        {pharmacy.pharmacyType || "Retail"}
      </p>

      {/* Address */}
      <p className="mt-2 text-center text-sm text-gray-500">
        📍 {pharmacy.address}, {pharmacy.city}, {pharmacy.province}
      </p>

      {/* Description */}
      {pharmacy.description && (
        <p className="mt-3 line-clamp-2 text-center text-sm text-gray-600">
          {pharmacy.description}
        </p>
      )}

      {/* Services */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {pharmacy.homeDelivery && (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
            🚚 Home Delivery
          </span>
        )}

        {pharmacy.acceptPrescription && (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
            📋 Prescription
          </span>
        )}

        {pharmacy.cashOnDelivery && (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
            💵 Cash on Delivery
          </span>
        )}
      </div>

      {/* Status */}
      <p className="mt-4 text-center text-sm">
        {pharmacy.isOpen ? (
          <span className="font-semibold text-green-600">🟢 Open Now</span>
        ) : (
          <span className="font-semibold text-red-500">🔴 Closed</span>
        )}
      </p>

      {/* Button */}
      <button
        onClick={handleClick}
        className="mt-5 w-full rounded-lg bg-purple-600 py-2 text-white transition hover:bg-purple-700"
      >
        View Pharmacy
      </button>
    </div>
  );
};

export default PharmacyCard;