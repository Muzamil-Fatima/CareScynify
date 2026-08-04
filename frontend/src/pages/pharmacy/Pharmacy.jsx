import React, { useState, useCallback } from "react";
import TuneIcon from "@mui/icons-material/Tune";

import SearchBar from "../../components/pharmacy/SearchBar";
import PharmacyFilters from "../../components/pharmacy/PharmacyFilters";
import MedicineFilter from "../../components/pharmacy/MedicineFilter";
import PharmacyList from "../../components/pharmacy/PharmacyList";
import PharmacyMedicine from "../../components/pharmacy/pharmacyDetail/PharmacyMedicine";
import Pagination from "../../components/common/Pagination";

import usePharmacies from "../../hooks/pharmacy/usePharmacies";
import { useMedicine } from "../../hooks/pharmacy/useMedicines";

const initialFilters = {
  searchType: "pharmacy",

  // Pharmacy
  city: "",
  pharmacyType: "",
  homeDelivery: false,
  available: false,

  // Medicine
  category: "",
  prescription: "",
  pharmacyId: "",

  // Search
  search: "",
};

const Pharmacy = () => {

  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const isPharmacy = filters.searchType === "pharmacy";

  /* ---------------- Search ---------------- */

  const handleSearch = useCallback((value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  }, []);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  /* ---------------- Filter Chips ---------------- */

  const filterChips = [];

  if (filters.city)
    filterChips.push({
      key: "city",
      label: filters.city,
    });

  if (filters.homeDelivery)
    filterChips.push({
      key: "homeDelivery",
      label: "🚚 Home Delivery",
    });

  if (filters.available)
    filterChips.push({
      key: "available",
      label: "🟢 Open Now",
    });

  if (filters.category)
    filterChips.push({
      key: "category",
      label: filters.category,
    });

  if (filters.prescription)
    filterChips.push({
      key: "prescription",
      label:
        filters.prescription === "required"
          ? "📋 Prescription"
          : "💊 No Prescription",
    });

  /* ---------------- Pharmacy ---------------- */

  const { pharmacies, loading, error, pagination, page, setPage } =
    usePharmacies(filters);

  /* ---------------- Medicines ---------------- */

  const {
    medicines,
    loading: medicineLoading,
    error: medicineError,
    pagination: medicinePagination,
    page: medicinePage,
    setPage: setMedicinePage,
  } = useMedicine(filters);

  /* ---------------- Current State ---------------- */

  const currentLoading = isPharmacy ? loading : medicineLoading;

  const currentError = isPharmacy ? error : medicineError;

  const currentPagination = isPharmacy ? pagination : medicinePagination;

  const currentPage = isPharmacy ? page : medicinePage;

  const currentSetPage = isPharmacy ? setPage : setMedicinePage;

  const resultCount = isPharmacy ? pharmacies.length : medicines.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Find Pharmacies</h1>

        <p className="mt-1 text-gray-500">
          Search nearby pharmacies and medicines.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar */}

        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
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
                      searchType: "pharmacy",
                    }))
                  }
                  className={`h-11 rounded-xl border text-sm font-medium ${
                    isPharmacy
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200"
                  }`}
                >
                  Pharmacies
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      searchType: "medicine",
                    }))
                  }
                  className={`h-11 rounded-xl border text-sm font-medium ${
                    !isPharmacy
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200"
                  }`}
                >
                  Medicines
                </button>
              </div>
            </div>

            {isPharmacy ? (
              <PharmacyFilters onFilterChange={setFilters} />
            ) : (
              <MedicineFilter
                filters={filters}
                onFilterChange={(newFilters) =>
                  setFilters((prev) => ({
                    ...prev,
                    ...newFilters,
                  }))
                }
              />
            )}
          </div>
        </aside>

        {/* Main */}

        <main className="lg:col-span-3">
          {/* Search */}

          <div className="mb-5 flex items-center gap-3">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>

            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 lg:hidden"
            >
              <TuneIcon fontSize="small" />
              Filters
            </button>
          </div>

          {/* Chips */}

          {filterChips.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {filterChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      [chip.key]:
                        typeof prev[chip.key] === "boolean" ? false : "",
                    }))
                  }
                  className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                >
                  {chip.label} ✕
                </button>
              ))}

              <button onClick={clearFilters} className="text-sm text-red-600">
                Clear All
              </button>
            </div>
          )}

          {/* Count */}

          {!currentLoading && !currentError && (
            <div className="mb-4 text-sm text-gray-500">
              {resultCount}{" "}
              {isPharmacy
                ? `Pharmac${resultCount !== 1 ? "ies" : "y"} Found`
                : `Medicine${resultCount !== 1 ? "s" : ""} Found`}
            </div>
          )}

          {/* Loading */}

          {currentLoading && (
            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
              {isPharmacy ? "Loading pharmacies..." : "Loading medicines..."}
            </div>
          )}

          {/* Error */}

          {currentError && (
            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center text-red-500">
              {currentError}
            </div>
          )}

          {/* Empty */}

          {!currentLoading && !currentError && resultCount === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
              <h2 className="text-xl font-semibold">
                {isPharmacy ? "No Pharmacies Found" : "No Medicines Found"}
              </h2>

              <p className="mt-2 text-gray-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-purple-600 px-5 py-2 text-white hover:bg-purple-700"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Results */}

          {!currentLoading && !currentError && resultCount > 0 && (
            <>
              <div className="min-h-[900px]">
                {isPharmacy ? (
                 <PharmacyList pharmacies={pharmacies} />
                ) : (
                  <PharmacyMedicine medicines={medicines} />
                )}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={currentPagination?.totalPages || 1}
                onPageChange={currentSetPage}
              />
            </>
          )}
        </main>
      </div>

      {/* Mobile Filters */}

      {showFilters && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setShowFilters(false)}
          />

          <div className="fixed left-0 top-0 z-50 h-full w-80 bg-white lg:hidden">
            <div className="p-5">
              {isPharmacy ? (
                <PharmacyFilters
                  filters={filters}
                  onFilterChange={(newFilters) => {
                    setFilters((prev) => ({
                      ...prev,
                      ...newFilters,
                    }));
                    setShowFilters(false);
                  }}
                />
              ) : (
                <MedicineFilter
                  filters={filters}
                  onFilterChange={(newFilters) => {
                    setFilters((prev) => ({
                      ...prev,
                      ...newFilters,
                    }));
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

export default Pharmacy;
