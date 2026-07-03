// src/components/pharmacy/MedicineHeader.jsx

import React from "react";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const MedicineHeader = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm px-8 py-7">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left */}
        <div className="flex items-center gap-5">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <MedicationRoundedIcon
              sx={{
                fontSize: 34,
                color: "#4f46e5",
              }}
            />
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Medicine Management
            </h1>

            <p className="text-slate-500 mt-2 max-w-xl">
              Add, update and manage medicines available in your pharmacy
              inventory. Keep stock levels, pricing and expiry information
              organized in one place.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-4">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-200">
            <AddRoundedIcon />
            Add Medicine
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineHeader;