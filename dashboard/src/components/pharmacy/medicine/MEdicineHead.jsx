import React from "react";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const MedicineHeader = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
      <div className=" gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left Section  */}
        <div className="lg:col-span-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            {/* Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-violet-100 to-indigo-100 sm:h-16 sm:w-16">
              <MedicationRoundedIcon
                sx={{
                  fontSize: { xs: 30, sm: 34 },
                  color: "#7C3AED",
                }}
              />
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                Medicine Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
                Add, update and manage medicines available in your pharmacy
                inventory. Keep stock levels, pricing, and expiry information
                organized in one place.
              </p>
            </div>
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default MedicineHeader;