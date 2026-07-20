import React from "react";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const EmptyInventory = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-20 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-100 text-purple-600">
        <Inventory2RoundedIcon sx={{ fontSize: 50 }} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-800">
        No Medicines Found
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-slate-500">
        Your pharmacy inventory is currently empty.
        <br />
        Add your first medicine to start managing stock,
        pricing, expiry dates and prescriptions.
      </p>

    </div>
  );
};

export default EmptyInventory;