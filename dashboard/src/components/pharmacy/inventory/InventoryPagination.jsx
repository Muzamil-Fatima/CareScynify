import React from "react";

import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

const InventoryPagination = ({
  currentPage = 1,
  totalPages = 5,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
      {/* Rows Per Page */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-600">
          Rows per page
        </span>

        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Previous */}
        <button
          onClick={() =>
            currentPage > 1 && onPageChange?.(currentPage - 1)
          }
          disabled={currentPage === 1}
          className="flex items-center gap-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <KeyboardArrowLeftRoundedIcon fontSize="small" />
          Previous
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() =>
            currentPage < totalPages &&
            onPageChange?.(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <KeyboardArrowRightRoundedIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default InventoryPagination;