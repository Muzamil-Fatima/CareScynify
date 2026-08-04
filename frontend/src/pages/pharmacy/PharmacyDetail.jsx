import React from "react";
import { useParams } from "react-router-dom";

import usePharmacyDetail from "../../hooks/pharmacy/usePharmacyDetail";

import PharmacyProfile from "../../components/pharmacy/pharmacyDetail/PharmacyProfile";
import PharmacyServices from "../../components/pharmacy/pharmacyDetail/PharmacyServices";
import PharmacyMedicines from "../../components/pharmacy/pharmacyDetail/PharmacyMedicine";

const PharmacyDetail = () => {
  const { id } = useParams();

  const { pharmacy, medicines, loading, error } = usePharmacyDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 font-medium">Loading pharmacy...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-8 text-center max-w-lg w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Something went wrong
          </h2>

          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!pharmacy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-700">
            Pharmacy not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Pharmacy Profile */}
        <PharmacyProfile pharmacy={pharmacy} />

        {/* Pharmacy Services */}
        <PharmacyServices pharmacy={pharmacy} />

        {/* Pharmacy Medicines */}
        <PharmacyMedicines medicines={medicines} />
      </div>
    </div>
  );
};

export default PharmacyDetail;
