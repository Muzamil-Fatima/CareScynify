import React from "react";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const inputClass =
  "w-full rounded-xl bg-slate-50 border border-transparent shadow-sm px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100";

const MedicineItem = ({ index, medicine, onChange, onRemove, canRemove }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">
          Medicine # {index + 1}
        </h3>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
          >
            <DeleteOutlineRoundedIcon fontSize="small" />

            <span className="text-sm font-medium">Remove</span>
          </button>
        )}
      </div>

      {/* FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* Medicine */}
        <input
          type="text"
          placeholder="Medicine Name"
          className={inputClass}
          value={medicine?.medicine || ""}
          onChange={(e) => onChange(index, "medicine", e.target.value)}
        />

        {/* Dosage */}
        <input
          type="text"
          placeholder="Dosage (e.g. 500 mg)"
          className={inputClass}
          value={medicine?.dosage || ""}
          onChange={(e) => onChange(index, "dosage", e.target.value)}
        />

        {/* Frequency */}
        <input
          type="text"
          placeholder="Frequency"
          className={inputClass}
          value={medicine?.frequency || ""}
          onChange={(e) => onChange(index, "frequency", e.target.value)}
        />

        {/* Duration */}
        <input
          type="text"
          placeholder="Duration"
          className={inputClass}
          value={medicine?.duration || ""}
          onChange={(e) => onChange(index, "duration", e.target.value)}
        />

        {/* Instructions */}
        <input
          type="text"
          placeholder="Instructions"
          className={inputClass}
          value={medicine?.instructions || ""}
          onChange={(e) => onChange(index, "instructions", e.target.value)}
        />
      </div>
    </div>
  );
};

export default MedicineItem;