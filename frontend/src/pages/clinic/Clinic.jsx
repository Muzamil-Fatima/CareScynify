import React, { useState } from "react";

import ClinicSearchBar from "../../Components/clinic/ClinicSearchBar";
import ClinicFilters from "../../Components/clinic/ClinicFilters";
import ClinicList from "../../Components/clinic/ClinicList";

import { useClinics } from "../../hooks/useClinic";

const Clinic = () => {
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    location: "",
    rating: "",
    service: "",
    openNow: false,
  });

  const { clinics, loading, error } = useClinics(filters);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-20">

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Find Clinics
      </h1>

      {/* Search */}
      <div className="mb-4">
        <ClinicSearchBar
          onSearch={(value) =>
            setFilters((prev) => ({ ...prev, search: value }))
          }
        />
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Filters */}
        <div className="lg:col-span-1">
          <ClinicFilters onFilterChange={setFilters} />
        </div>

        {/* Clinic List */}
        <div className="lg:col-span-3 space-y-4">

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-500 py-10">
              Loading clinics...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-center text-red-500 py-10">
              {error}
            </p>
          )}

          {/* List */}
          {!loading && !error && (
            <ClinicList
              clinics={clinics}
              onView={(clinic) =>
                (window.location.href = `/clinic/${clinic.id}`)
              }
              onBook={(clinic) =>
                alert(`Book appointment with ${clinic.name}`)
              }
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default Clinic;