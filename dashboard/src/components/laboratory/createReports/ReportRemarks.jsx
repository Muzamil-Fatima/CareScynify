import React from "react";
import { ClipboardPenLine } from "lucide-react";

const ReportRemarks = ({ remarks, setRemarks }) => {
  return (
    <div className="bg-white rounded-xl border border-purple-100 shadow-sm mt-6">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-purple-100">
        <ClipboardPenLine className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Overall Remarks
        </h2>
      </div>

      {/* Body */}
      <div className="p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Report Summary
        </label>

        <textarea
          rows={6}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Enter overall remarks about the patient's laboratory report..."
          className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />

        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>
            Include observations, abnormalities, or recommendations.
          </span>

          <span>{remarks.length} characters</span>
        </div>
      </div>
    </div>
  );
};

export default ReportRemarks;