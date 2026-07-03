import React from "react";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

const EmptyOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <Inventory2RoundedIcon
          sx={{ fontSize: 48 }}
          className="text-blue-600"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        No Orders Yet
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        Patient orders will appear here.
      </p>
    </div>
  );
};

export default EmptyOrders;