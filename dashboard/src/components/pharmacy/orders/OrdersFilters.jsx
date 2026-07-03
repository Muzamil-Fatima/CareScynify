import React from "react";

import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const OrdersFilters = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <FilterAltRoundedIcon className="text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Filters
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            value={filters.status}
            onChange={(e) =>
              onFilterChange("status", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Payment
          </label>

          <select
            value={filters.payment}
            onChange={(e) =>
              onFilterChange("payment", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          >
            <option value="">All Payments</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Online">Online</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Date
          </label>

          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              onFilterChange("date", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-white font-medium transition hover:bg-red-600"
          >
            <RestartAltRoundedIcon />
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersFilters;