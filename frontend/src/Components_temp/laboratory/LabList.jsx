import React from "react";
import LabCard from "./LabCard";

const LabList = ({ laboratories, onViewTests }) => {
  // FORCE ARRAY SAFETY
  const safeLabs = Array.isArray(laboratories) ? laboratories : [];

  if (safeLabs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">No laboratories found</p>

        <p className="text-sm">Try changing filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {safeLabs.map((lab) => (
        <LabCard
          key={lab._id}
          laboratory={lab}
          onViewTests={() => onViewTests?.(lab)}
        />
      ))}
    </div>
  );
};

export default LabList;
