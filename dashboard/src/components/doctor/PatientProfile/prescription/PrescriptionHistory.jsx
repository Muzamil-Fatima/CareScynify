import React from "react";
import PrescriptionHistoryCard from "./PrescriptionHistoryCard";

import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const PrescriptionHistory = ({
  prescriptions = [],
  loading = false,
  onView,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-56 rounded bg-slate-200"></div>

          {[1, 2, 3].map((item) => (
            <div key={item} className="h-24 rounded-xl bg-slate-100"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
          <HistoryRoundedIcon className="text-purple-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Previous Prescriptions
          </h2>

          <p className="text-sm text-slate-500">
            View the patient's prescription history.
          </p>
        </div>
      </div>

      {/* Empty */}
      {prescriptions.length === 0 ? (
        <div className="border-2 border-dashed border-slate-200 rounded-2xl py-12 text-center">
          <DescriptionRoundedIcon
            className="text-slate-300"
            sx={{ fontSize: 55 }}
          />

          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            No Previous Prescriptions
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            This patient doesn't have any previous prescriptions.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((item) => (
            <PrescriptionHistoryCard
              key={item._id}
              prescription={item}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionHistory;
