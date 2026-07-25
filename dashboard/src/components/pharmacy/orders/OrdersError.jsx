import React from "react";

import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

const OrdersError = ({ message = "Unable to load orders.", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-white px-6 py-16 text-center shadow-sm">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <ErrorOutlineRoundedIcon
          sx={{ fontSize: 48 }}
          className="text-red-600"
        />
      </div>

      {/* Title */}
      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        Unable to load orders.
      </h2>

      {/* Message */}
      <p className="mt-2 max-w-md text-gray-500">{message}</p>

      {/* Retry Button */}
      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
      >
        <RefreshRoundedIcon />
        Retry
      </button>
    </div>
  );
};

export default OrdersError;
