import React, { useState } from "react";
import DoctorSearchBar from "../../Components/doctor/DoctorSearchBar";
import DoctorFilters from "../../Components/doctor/DoctorFilters";
import DoctorList from "../../Components/doctor/DoctorList";
import { useDoctor} from "../../hooks/useDoctor";

const Doctor = () => {
  const [filters, setFilters] = useState({
    specialty: "",
    rating: "",
    experience: "",
    available: false,
    search: "",
  });

  const { doctors, loading, error } = useDoctor(filters);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-10">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Find Doctors</h1>

      {/* Search */}
      <div className="mb-4">
        <DoctorSearchBar
          onSearch={(value) =>
            setFilters((prev) => ({ ...prev, search: value }))
          }
        />
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <DoctorFilters onFilterChange={setFilters} />
        </div>

        {/* Doctor List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Loading */}
          {loading && (
            <p className="text-gray-500 text-center py-10">
              Loading doctors...
            </p>
          )}

          {/* Error */}
          {error && <p className="text-red-500 text-center py-10">{error}</p>}

          {/* List */}
          {!loading && !error && (
            <DoctorList
              doctors={doctors}
              onViewProfile={(doctor) =>
                (window.location.href = `/doctor/${doctor.id}`)
              }
              onBook={(doctor) => alert(`Book appointment with ${doctor.name}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
