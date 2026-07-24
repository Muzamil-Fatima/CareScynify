import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MedicineSearchBar from "../../Components/pharmacy/medicines/MedicineSearchBar";
import MedicineFilters from "../../Components/pharmacy/medicines/MedicineFilters";
import MedicineList from "../../Components/pharmacy/medicines/MedicineList";

import { useMedicine } from "../../hooks/useMedicine";

const Medicine = () => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    prescription: "",
    homeDelivery: false,
    inStock: false,
    search: "",
  });

  const navigate = useNavigate();

  const { medicines, loading, error } = useMedicine(filters);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Find Medicines
      </h1>

      {/* Search */}
      <div className="mb-4">
        <MedicineSearchBar
          onSearch={(value) =>
            setFilters((prev) => ({
              ...prev,
              search: value,
            }))
          }
        />
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <MedicineFilters onFilterChange={setFilters} />
        </div>

        {/* Medicine List */}
        <div className="lg:col-span-3">
          {loading && (
            <p className="text-center py-10 text-gray-500">
              Loading medicines...
            </p>
          )}

          {error && (
            <p className="text-center py-10 text-red-500">
              {error}
            </p>
          )}

          {!loading && !error && (
            <MedicineList
              medicines={medicines}
              onViewDetails={(medicine) =>
                navigate(`/medicine/${medicine._id}`)
              }
              onAddToCart={(medicine) =>
                alert(`${medicine.name} added to cart`)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Medicine;