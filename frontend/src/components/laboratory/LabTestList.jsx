import React from "react";
import LabTestCard from "./LabTestCard";

const LabTestList = ({ tests }) => {
  const safeTests = Array.isArray(tests) ? tests : [];

  if (safeTests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">No Lab Tests Found</p>

        <p className="text-sm">
          Try changing filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {safeTests.map((test) => (
        <LabTestCard
          key={test._id}
          labtest={test}
        />
      ))}
    </div>
  );
};

export default LabTestList;