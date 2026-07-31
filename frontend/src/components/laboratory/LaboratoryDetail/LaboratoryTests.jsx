import React from "react";
import { FlaskConical } from "lucide-react";
import LabTestCard from "../LabTestCard";

const LaboratoryTests = ({ tests }) => {
  if (!tests || tests.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 text-center">
        <FlaskConical size={60} className="mx-auto text-gray-300 mb-4" />

        <h2 className="text-xl font-semibold text-gray-700">
          No Tests Available
        </h2>

        <p className="text-gray-500 mt-2">
          This laboratory has not added any tests yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Laboratory Tests
        </h2>

        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
          {tests.length} Test{tests.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Test Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tests.map((test) => (
          <LabTestCard key={test._id} labtest={test} />
        ))}
      </div>
    </div>
  );
};

export default LaboratoryTests;