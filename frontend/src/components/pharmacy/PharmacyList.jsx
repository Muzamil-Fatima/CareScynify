import React from "react";
import PharmacyCard from "./PharmacyCard";

const PharmacyList = ({ pharmacies }) => {
  const safePharmacies = Array.isArray(pharmacies) ? pharmacies : [];

  if (safePharmacies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">No pharmacies found</p>
        <p className="text-sm">
          Try changing filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {safePharmacies.map((pharmacy) => (
        <PharmacyCard
          key={pharmacy._id}
          pharmacy={pharmacy}
        />
      ))}
    </div>
  );
};

export default PharmacyList;