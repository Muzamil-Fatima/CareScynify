import React from "react";
import ClinicCard from "./ClinicCard";

const ClinicList = ({ clinics = [], loading, onView, onBook }) => {
  
  // Safety check (important for APIs)
  const safeClinics = Array.isArray(clinics) ? clinics : [];

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading clinics...
      </div>
    );
  }

  // Empty state
  if (safeClinics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">No clinics found</p>
        <p className="text-sm">Try changing filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {safeClinics.map((clinic) => (
        <ClinicCard
          key={clinic.id}
          clinic={clinic}
          onView={() => onView?.(clinic)}
          onBook={() => onBook?.(clinic)}
        />
      ))}
    </div>
  );
};

export default ClinicList;