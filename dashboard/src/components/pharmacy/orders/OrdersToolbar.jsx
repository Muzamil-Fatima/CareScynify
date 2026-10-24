import React from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

const OrdersToolbar = ({
  search = "",
  onSearchChange,
  onRefresh,
  // onExport,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <SearchRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search Order..."
            className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-gray-700 transition hover:bg-gray-100"
          >
            <RefreshRoundedIcon />
            <span>Refresh</span>
          </button>

          {/* <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-medium text-white transition hover:bg-purple-700"
          >
            <DownloadRoundedIcon />
            <span>Export</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OrdersToolbar;
