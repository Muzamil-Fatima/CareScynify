import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TuneIcon from "@mui/icons-material/Tune";

import LabSearchBar from "../../Components/laboratory/LabSearchBar";
import LabFilters from "../../Components/laboratory/LabFilters";
import LabList from "../../Components/laboratory/LabList";

import useLaboratories from "../../hooks/laboratory/useLaboratories";
import Pagination from "../../Components/common/Pagination";

const initialFilters = {
  city: "",
  rating: "",
  homeCollection: false,
  search: "",
};

const Laboratory = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const { laboratories, loading, error, pagination, page, setPage } =
    useLaboratories(filters);

  const handleSearch = useCallback((value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  }, []);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const filterChips = [];

  if (filters.city) {
    filterChips.push({
      key: "city",
      label: filters.city,
    });
  }

  if (filters.rating) {
    filterChips.push({
      key: "rating",
      label: `⭐ ${filters.rating}+`,
    });
  }

  if (filters.homeCollection) {
    filterChips.push({
      key: "homeCollection",
      label: "🏠 Home Collection",
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Find Laboratories</h1>

        <p className="text-gray-500 mt-1">
          Search nearby laboratories and book diagnostic tests easily.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border bg-white p-5 shadow-sm">
            <LabFilters onFilterChange={setFilters} />
          </div>
        </aside>

        <main className="lg:col-span-3">
          {/* Search */}

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1">
              <LabSearchBar onSearch={handleSearch} />
            </div>

            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border bg-white"
            >
              <TuneIcon fontSize="small" />
              Filters
            </button>
          </div>

          {/* Chips */}

          {filterChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {filterChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      [chip.key]: chip.key === "homeCollection" ? false : "",
                    }))
                  }
                  className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                >
                  {chip.label} ✕
                </button>
              ))}

              <button onClick={clearFilters} className="text-red-600 text-sm">
                Clear All
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="mb-4 text-sm text-gray-500">
              {laboratories.length} Laboratory
              {laboratories.length !== 1 && "ies"} Found
            </div>
          )}

          {loading && (
            <div className="bg-white border rounded-xl py-16 text-center">
              Loading laboratories...
            </div>
          )}

          {error && (
            <div className="bg-white border rounded-xl py-16 text-center text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && laboratories.length === 0 && (
            <div className="bg-white border rounded-xl py-16 text-center">
              <h2 className="text-xl font-semibold">No Laboratories Found</h2>

              <p className="text-gray-500 mt-2">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 bg-purple-600 text-white px-5 py-2 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          )}

          {!error && laboratories.length > 0 && (
            <>
              <div className="min-h-[900px]">
                <LabList
                  laboratories={laboratories}
                  onViewTests={(lab) =>
                    navigate(`/laboratory/${lab._id}/tests`)
                  }
                />
              </div>

              <Pagination
                currentPage={page}
                totalPages={pagination?.totalPages || 1}
                onPageChange={setPage}
              />
            </>
          )}
        </main>
      </div>

      {/* Mobile Filter */}

      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setShowFilters(false)}
          />

          <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden">
            <div className="p-5">
              <LabFilters
                onFilterChange={(newFilters) => {
                  setFilters(newFilters);
                  setShowFilters(false);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Laboratory;
