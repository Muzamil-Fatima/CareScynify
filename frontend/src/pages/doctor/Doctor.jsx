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
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Find Doctors</h1>
        <p className="text-gray-500 mt-1">
          Search experienced doctors and book appointments easily.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <DoctorFilters onFilterChange={setFilters} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {/* Search + Mobile Filter */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1">
              <DoctorSearchBar onSearch={handleSearch} />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm hover:bg-gray-50"
            >
              <TuneIcon fontSize="small" />
              Filters
            </button>
          </div>

          {/* Active Filter Chips */}
          {filterChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {filterChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      [chip.key]: chip.key === "available" ? false : "",
                    }))
                  }
                  className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 hover:bg-purple-200 transition"
                >
                  {chip.label}
                  <span className="text-base leading-none">&times;</span>
                </button>
              ))}

              <button
                onClick={clearFilters}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Result Count */}
          {!loading && !error && (
            <div className="mb-4 text-sm text-gray-500">
              {doctors.length} Doctor{doctors.length !== 1 && "s"} Found
            </div>
          )}

          {/* Loading */}
          {loading && doctors.length === 0 && (
            <div className="rounded-xl border bg-white py-16 text-center text-gray-500">
              Loading doctors...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl border bg-white py-16 text-center text-red-500">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && doctors.length === 0 && (
            <div className="rounded-xl border bg-white py-16 px-6 text-center">
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

          {/* Doctor List */}
          {!error && doctors.length > 0 && (
            <>
              <div className="min-h-[900px]">
                <DoctorList
                  doctors={doctors}
                  onViewProfile={(doctor) => navigate(`/doctor/${doctor._id}`)}
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

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setShowFilters(false)}
          />

          <div className="fixed top-0 left-0 z-50 h-full w-80 max-w-[90%] overflow-y-auto bg-white shadow-xl lg:hidden">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">Filters</h2>

              <button
                onClick={() => setShowFilters(false)}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

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
