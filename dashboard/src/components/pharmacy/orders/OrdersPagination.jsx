import React from "react";

import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const OrdersPagination = ({
  currentPage = 1,
  totalPages = 1,
  rowsPerPage = 10,
  totalItems = 0,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const start =
    totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const end = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-4 border-t bg-white rounded-2xl border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Showing */}
      <p className="text-sm text-slate-600">
        {start} - {end} of {totalItems}
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Rows */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Rows:</span>

          <select
            value={rowsPerPage}
            onChange={(e) =>
              onRowsPerPageChange?.(Number(e.target.value))
            }
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 outline-none transition-all duration-300 hover:border-violet-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        {/* Previous / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              currentPage > 1 &&
              onPageChange?.(currentPage - 1)
            }
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 transition-all duration-300 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <KeyboardArrowLeftRoundedIcon fontSize="small" />
          </button>

          <button
            onClick={() =>
              currentPage < totalPages &&
              onPageChange?.(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 transition-all duration-300 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPagination;