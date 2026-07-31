import React from "react";
import { FileText, FlaskConical, Clock, Info } from "lucide-react";

const LabTestDescription = ({ labtest }) => {
  if (!labtest) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
        <FileText className="text-purple-600" size={22} />
        Test Information
      </h2>

      {/* Description */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Description</h3>

        <p className="text-gray-600 leading-7">
          {labtest.description || "No description available for this test."}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Sample Type */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <FlaskConical className="text-purple-600" size={22} />

            <div>
              <p className="text-sm text-gray-500">Sample Type</p>

              <p className="font-semibold text-gray-800">
                {labtest.sampleType || "Not Available"}
              </p>
            </div>
          </div>
        </div>

        {/* Report Time */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <Clock className="text-purple-600" size={22} />

            <div>
              <p className="text-sm text-gray-500">Report Time</p>

              <p className="font-semibold text-gray-800">
                {labtest.turnAround || "Not Available"}
              </p>
            </div>
          </div>
        </div>

        {/* Preparation */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 md:col-span-2">
          <div className="flex items-start gap-3">
            <Info className="text-purple-600 mt-1" size={22} />

            <div>
              <p className="text-sm text-gray-500">Preparation Instructions</p>

              <p className="font-semibold text-gray-800 mt-1">
                {labtest.preparation || "No special preparation required."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestDescription;
