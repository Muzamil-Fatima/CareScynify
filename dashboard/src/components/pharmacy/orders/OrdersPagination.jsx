import React from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const OrdersPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange?.(page);
  };

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
      
      {/* Previous */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition
          ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
      >
        <ChevronLeftRoundedIcon fontSize="small" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`h-9 w-9 rounded-lg text-sm font-medium transition
              ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition
          ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
      >
        Next
        <ChevronRightRoundedIcon fontSize="small" />
      </button>
    </div>
  );
};

export default OrdersPagination;