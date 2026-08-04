import React from "react";
import { Pill } from "lucide-react";
import MedicineCard from "../MedicineCard";

const PharmacyMedicine = ({ medicines }) => {
  if (!medicines || medicines.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-md">
        <Pill size={60} className="mx-auto mb-4 text-gray-300" />

        <h2 className="text-xl font-semibold text-gray-700">
          No Medicines Available
        </h2>

        <p className="mt-2 text-gray-500">
          This pharmacy has not added any medicines yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Pharmacy Medicines
        </h2>

        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
          {medicines.length} Medicine
          {medicines.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Medicine Cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {medicines.map((medicine) => (
          <MedicineCard
            key={medicine._id}
            medicine={medicine}
          />
        ))}
      </div>
    </div>
  );
};

export default PharmacyMedicine;