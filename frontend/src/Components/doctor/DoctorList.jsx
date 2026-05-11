import React from "react";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors, onViewProfile, onBook }) => {
  // FORCE ARRAY SAFETY
  const safeDoctors = Array.isArray(doctors) ? doctors : [];

  if (safeDoctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">No doctors found</p>
        <p className="text-sm">Try changing filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {safeDoctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onViewProfile={() => onViewProfile?.(doctor)}
          onBook={() => onBook?.(doctor)}
        />
      ))}
    </div>
  );
};

export default DoctorList;