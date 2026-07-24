import React from "react";
import MedicineCard from "./MedicineCard";

const MedicineList = ({ medicines, onViewMedicine }) => {
  // FORCE ARRAY SAFETY
  const safeMedicines = Array.isArray(medicines) ? medicines : [];

  if (safeMedicines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">No medicines found</p>
        <p className="text-sm">
          Try changing your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {safeMedicines.map((medicine) => (
        <MedicineCard
          key={medicine._id}
          medicine={medicine}
          onViewMedicine={() => onViewMedicine?.(medicine)}
        />
      ))}
    </div>
  );
};

export default MedicineList;