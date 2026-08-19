import React from "react";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";

const PrescriptionHistoryCard = ({ prescription, onDelete }) => {
  const {
    diagnosis,
    advice,
    medicines = [],
    status,
    createdAt,
    pdfUrl,
  } = prescription || {};

  const statusStyles = {
    draft: "bg-amber-100 text-amber-700",
    issued: "bg-green-100 text-green-700",
    dispensed: "bg-blue-100 text-blue-700",
  };

  const handleDelete = () => {
    if (!prescription?._id) return;

    onDelete?.(prescription._id);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        ==== LEFT CONTENT ====
        <div className="flex-1 min-w-0 space-y-4">
          {/* STATUS + DATE */}

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                statusStyles[status] || "bg-slate-100 text-slate-700"
              }`}
            >
              {status || "Prescription"}
            </span>

            {createdAt && (
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <CalendarTodayRoundedIcon sx={{ fontSize: 16 }} />

                {new Date(createdAt).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* DIAGNOSIS */}

          <div>
            <h3 className="text-base font-semibold text-slate-800 wrap-break-word">
              {diagnosis || "No Diagnosis"}
            </h3>

            <p className="mt-1 text-sm text-slate-500 line-clamp-2">
              {advice || "No advice available."}
            </p>
          </div>

          {/* MEDICINES */}

          {medicines.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {medicines.slice(0, 4).map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                >
                  <MedicationRoundedIcon sx={{ fontSize: 14 }} />

                  {item?.medicine || "Medicine"}
                </span>
              ))}

              {medicines.length > 4 && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                  +{medicines.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
        {/* ==== RIGHT ACTIONS ==== */}
        <div className="flex items-center gap-2 shrink-0">
          {/* VIEW PDF  Opens PDF in NEW TAB */}

          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Prescription PDF"
              aria-label="View Prescription PDF"
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition"
            >
              <VisibilityRoundedIcon fontSize="small" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              title="PDF not available"
              aria-label="PDF not available"
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
            >
              <VisibilityRoundedIcon fontSize="small" />
            </button>
          )}

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            title="Delete Prescription"
            aria-label="Delete Prescription"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 transition"
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionHistoryCard;
