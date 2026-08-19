import React from "react";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const UserSearch = ({
  value = "",
  onChange,
  onClear,
  placeholder = "Search users by name, email, or ID...",
}) => {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Box */}
        <div className="relative w-full sm:max-w-xl">
          {/* Search Icon */}
          <SearchRoundedIcon
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            sx={{ fontSize: 21 }}
          />

          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

          {/* Clear Button */}
          {value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-200 hover:text-gray-600"
            >
              <CloseRoundedIcon sx={{ fontSize: 18 }} />
            </button>
          )}
        </div>

        {/* Search Info */}
        <div className="hidden items-center gap-2 text-xs text-gray-500 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span>
            Search by name, email or user ID
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;