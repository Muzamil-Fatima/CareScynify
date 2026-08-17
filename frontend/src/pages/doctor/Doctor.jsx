import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TuneIcon from "@mui/icons-material/Tune";

import DoctorSearchBar from "../../components/doctor/DoctorSearchBar";
import DoctorFilters from "../../components/doctor/DoctorFilters";
import DoctorList from "../../components/doctor/DoctorList";
import { useDoctor } from "../../hooks/useDoctor";
import Pagination from "../../components/common/Pagination";

const initialFilters = {
  specialty: "",
  location: "",
  rating: "",
  experience: "",
  fee: "",
  available: false,
  search: "",
};

const Doctor = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const { doctors, loading, error, pagination, page, setPage } =
    useDoctor(filters);

  const handleSearch = useCallback((value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  }, []);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  // Active Filter Chips
  const filterChips = [];

  if (filters.specialty) {
    filterChips.push({
      key: "specialty",
      label: filters.specialty,
    });
  }

  if (filters.location) {
    filterChips.push({
      key: "location",
      label: `📍 ${filters.location}`,
    });
  }

  if (filters.rating) {
    filterChips.push({
      key: "rating",
      label: `⭐ ${filters.rating}+`,
    });
  }

  if (filters.experience) {
    filterChips.push({
      key: "experience",
      label: `${filters.experience}+ Years`,
    });
  }

  if (filters.fee) {
    const feeLabels = {
      low: "Under 1000",
      mid: "1000 - 3000",
      high: "3000+",
    };

    filterChips.push({
      key: "fee",
      label: `💰 ${feeLabels[filters.fee]}`,
    });
  }

  if (filters.available) {
    filterChips.push({
      key: "available",
      label: "Available Today",
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Find Doctors
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Search experienced doctors and book appointments easily.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6">
        {/* Desktop Filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <DoctorFilters onFilterChange={setFilters} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3 min-w-0">
          {/* =========================
              MOBILE / DESKTOP SEARCH AREA
          ========================== */}

          <div className="w-full mb-5">
            {/* Row 1: Search + Filter */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
              {/* Search Box */}
              <div className="min-w-0 w-full">
                <DoctorSearchBar onSearch={handleSearch} />
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden h-11 shrink-0 flex items-center justify-center gap-2 px-3 sm:px-4 rounded-lg border border-gray-300 bg-white shadow-sm hover:bg-gray-50 transition"
              >
                <TuneIcon fontSize="small" />
                <span>Filters</span>
              </button>
            </div>

            {/* =========================
                Row 2: ACTIVE FILTER CHIPS
            ========================== */}

            {filterChips.length > 0 && (
              <div className="w-full mt-3">
                <div className="w-full flex flex-wrap items-center gap-2">
                  {filterChips.map((chip) => (
                    <button
                      key={chip.key}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          [chip.key]:
                            chip.key === "available" ? false : "",
                        }))
                      }
                      className="flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1.5 text-xs sm:text-sm font-medium text-purple-700 hover:bg-purple-200 transition"
                    >
                      <span>{chip.label}</span>

                      <span className="text-sm leading-none">
                        &times;
                      </span>
                    </button>
                  ))}

                  <button
                    onClick={clearFilters}
                    className="text-xs sm:text-sm font-medium text-red-600 hover:underline px-1"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =========================
              RESULT COUNT
          ========================== */}

          {!loading && !error && (
            <div className="mb-4 text-sm text-gray-500">
              {doctors.length} Doctor
              {doctors.length !== 1 && "s"} Found
            </div>
          )}

          {/* =========================
              LOADING
          ========================== */}

          {loading && doctors.length === 0 && (
            <div className="w-full rounded-xl border border-gray-200 bg-white py-16 text-center text-gray-500">
              Loading doctors...
            </div>
          )}

          {/* =========================
              ERROR
          ========================== */}

          {error && (
            <div className="w-full rounded-xl border border-red-300 bg-white py-16 text-center text-red-500">
              {error}
            </div>
          )}

          {/* =========================
              EMPTY STATE
          ========================== */}

          {!loading && !error && doctors.length === 0 && (
            <div className="w-full rounded-xl border border-gray-200 bg-white py-16 px-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                No Doctors Found
              </h2>

              <p className="mt-2 text-gray-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* =========================
              DOCTOR LIST
          ========================== */}

          {!error && doctors.length > 0 && (
            <>
              <div className="w-full min-h-[900px]">
                <DoctorList
                  doctors={doctors}
                  onViewProfile={(doctor) =>
                    navigate(`/doctor/${doctor._id}`)
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

      {/* =========================
          MOBILE FILTER DRAWER
      ========================== */}

      {showFilters && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setShowFilters(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 z-50 h-full w-80 max-w-[90%] overflow-y-auto bg-white shadow-xl lg:hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">
                Filters
              </h2>

              <button
                onClick={() => setShowFilters(false)}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Filters */}
            <div className="p-5">
              <DoctorFilters
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

export default Doctor;