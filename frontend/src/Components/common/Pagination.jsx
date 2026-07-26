import React from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, currentPage + 3);

    // Always show 7 pages
    if (currentPage <= 4) {
      start = 1;
      end = Math.min(7, totalPages);
    }

    if (currentPage >= totalPages - 3) {
      start = Math.max(1, totalPages - 6);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="mt-8 flex items-center justify-center gap-4">

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-gray-600 hover:text-purple-600 disabled:opacity-40"
      >
        <NavigateBeforeIcon />
      </button>


      {/* Numbers */}
      <div className="flex items-center gap-4">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              text-sm font-medium transition relative
              ${
                currentPage === page
                  ? "text-purple-600 after:absolute after:left-0 after:-bottom-1  after:w-full after:bg-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>


      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-gray-600 hover:text-purple-600 disabled:opacity-40"
      >
        <NavigateNextIcon />
      </button>

    </div>
  );
};

export default Pagination;