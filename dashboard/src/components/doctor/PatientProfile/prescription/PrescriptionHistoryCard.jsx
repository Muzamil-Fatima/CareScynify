import React from "react";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";

const PrescriptionHistoryCard = ({ prescription, onView }) => {
  const {
    diagnosis,
    advice,
    medicines = [],
    status,
    createdAt,
  } = prescription;

  const statusStyles = {
    draft: "bg-amber-100 text-amber-700",
    issued: "bg-green-100 text-green-700",
    dispensed: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        {/* Left */}
        <div className="flex-1 space-y-4">
          {/* Status & Date */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusStyles[status] ||
                "bg-slate-100 text-slate-700"
              }`}
            >
              {status}
            </span>

            <div className="flex items-center gap-1 text-sm text-slate-500">
              <CalendarTodayRoundedIcon sx={{ fontSize: 16 }} />
              {new Date(createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <h3 className="text-base font-semibold text-slate-800">
              {diagnosis || "No Diagnosis"}
            </h3>

            <p className="mt-1 text-sm text-slate-500 line-clamp-2">
              {advice || "No advice available."}
            </p>
          </div>

          {/* Medicine Chips */}
          <div className="flex flex-wrap gap-2">
            {medicines.slice(0, 4).map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
              >
                <MedicationRoundedIcon sx={{ fontSize: 14 }} />
                {item.medicine}
              </span>
            ))}

            {medicines.length > 4 && (
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                +{medicines.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Right */}
        <div>
          <button
            onClick={() => onView(prescription)}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-white hover:bg-purple-700 transition"
          >
            <VisibilityRoundedIcon fontSize="small" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionHistoryCard;