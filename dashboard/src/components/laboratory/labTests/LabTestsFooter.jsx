import React from "react";

export default function LabTestsFooter() {
  return (
    <div className="px-6 py-4 border-t border-violet-100 bg-linear-to-r from-violet-50 via-white to-fuchsia-50 flex justify-between items-center">
      <span className="text-xs font-medium text-slate-500">
        CareScynify Laboratory Inventory Module v1.0
      </span>

      <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-[11px] font-semibold border border-violet-200">
        Laboratory Management
      </span>
    </div>
  );
}
