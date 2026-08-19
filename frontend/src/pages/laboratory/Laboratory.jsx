import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TuneIcon from "@mui/icons-material/Tune";

import LabSearchBar from "../../components/laboratory/LabSearchBar";
import LabFilters from "../../components/laboratory/LabFilters";
import LabList from "../../components/laboratory/LabList";
import TestList from "../../components/laboratory/LabTestList";

import useLaboratories from "../../hooks/laboratory/useLaboratories";
import useLabTest from "../../hooks/laboratory/useLabTest";
import LabTestFilters from "../../components/laboratory/LabTestFilters";
import Pagination from "../../components/common/Pagination";

const initialFilters = {
  searchType: "laboratory",

  // Laboratory filters
  city: "",
  rating: "",
  homeCollection: false,
  available: false,

  // Test filters
  category: "",
  status: "",
  laboratoryId: "",

  // Common search
  search: "",
};

const Laboratory = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const { laboratories, loading, error, pagination, page, setPage } =
    useLaboratories(filters);
  const {
    tests,
    loading: testLoading,
    error: testError,
    pagination: testPagination,
    page: testPage,
    setPage: setTestPage,
  } = useLabTest(filters);
  const isLaboratory = filters.searchType === "laboratory";

  const currentLoading = isLaboratory ? loading : testLoading;
  const currentError = isLaboratory ? error : testError;
  const currentPagination = isLaboratory ? pagination : testPagination;

  const currentPage = isLaboratory ? page : testPage;

  const currentSetPage = isLaboratory ? setPage : setTestPage;
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
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 overflow-x-hidden">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Laboratories</h1>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Search nearby laboratories and book diagnostic tests easily.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {/* Filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            {/* Search By */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Search By
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      searchType: "laboratory",
                    }))
                  }
                  className={`h-11 rounded-xl border text-sm font-medium ${
                    isLaboratory
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200"
                  }`}
                >
                  Laboratories
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      searchType: "test",
                    }))
                  }
                  className={`h-11 rounded-xl border text-sm font-medium ${
                    !isLaboratory
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200"
                  }`}
                >
                  Tests
                </button>
              </div>
            </div>

            {isLaboratory ? (
              <LabFilters onFilterChange={setFilters} />
            ) : (
              <LabTestFilters onFilterChange={setFilters} />
            )}
          </div>
        </aside>

        <main className="lg:col-span-3 min-w-0">
          {/* Search */}

          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 w-full">
            <div className="flex-1 min-w-0">
              <LabSearchBar onSearch={handleSearch} />
            </div>

            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden shrink-0 flex items-center gap-2 px-3 sm:px-4 h-10 sm:h-11 rounded-lg border border-gray-200 bg-white text-sm whitespace-nowrap"
            >
              <TuneIcon fontSize="small" />
              Filters
            </button>
          </div>

          {/* Chips */}

          {filterChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
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

          {!currentLoading && !currentError && (
            <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-500">
              {filters.searchType === "laboratory" ? (
                <>
                  {laboratories.length} Laborator
                  {laboratories.length !== 1 ? "ies" : "y"} Found
                </>
              ) : (
                <>
                  {tests?.length || 0} Test{tests?.length !== 1 ? "s" : ""}{" "}
                  Found
                </>
              )}
            </div>
          )}

          {currentLoading && (
            <div className="bg-white border border-gray-200 rounded-xl py-12 sm:py-16 px-4 text-center">
              {isLaboratory ? "Loading laboratories..." : "Loading tests..."}
            </div>
          )}

          {currentError && (
            <div className="bg-white border border-gray-200 rounded-xl py-12 sm:py-16 px-4 text-center text-red-500 wrap-break-word">
              {currentError}
            </div>
          )}

          {!currentLoading &&
            !currentError &&
            (filters.searchType === "laboratory"
              ? laboratories.length === 0
              : (tests?.length || 0) === 0) && (
              <div className="bg-white border border-gray-200 rounded-xl py-12 sm:py-16 px-4 text-center">
                <h2 className="text-xl font-semibold">
                  {filters.searchType === "laboratory"
                    ? "No Laboratories Found"
                    : "No Tests Found"}
                </h2>

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

          {!currentError &&
            (isLaboratory ? laboratories.length > 0 : tests.length > 0) && (
              <>
                <div className="w-full min-w-0">
                  {filters.searchType === "laboratory" ? (
                    <LabList
                      laboratories={laboratories}
                      onViewTests={(lab) =>
                        navigate(`/laboratory/${lab._id}/tests`)
                      }
                    />
                  ) : (
                    <TestList tests={tests} />
                  )}
                </div>

             <div className="mt-5 sm:mt-6 overflow-x-auto">
  <Pagination
    currentPage={currentPage}
    totalPages={currentPagination?.totalPages || 1}
    onPageChange={currentSetPage}
  />
</div>
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

          <div className="fixed left-0 top-0 h-dvh w-[85%] max-w-sm bg-white z-50 lg:hidden flex flex-col shadow-xl">
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {isLaboratory ? (
                <LabFilters
                  onFilterChange={(newFilters) => {
                    setFilters(newFilters);
                    setShowFilters(false);
                  }}
                />
              ) : (
                <LabTestFilters
                  onFilterChange={(newFilters) => {
                    setFilters(newFilters);
                    setShowFilters(false);
                  }}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Laboratory;
