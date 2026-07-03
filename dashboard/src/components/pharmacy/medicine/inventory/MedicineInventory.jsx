import React from "react";

import InventorySearch from "./InventorySearch";
import InventoryTable from "./InventoryTable";
import InventoryCard from "./InventoryCard";
import InventoryPagination from "./InventoryPagination";
import EmptyInventory from "./EmptyInventory";

const MedicineInventory = ({ medicines = [] }) => {
  const hasMedicines = medicines.length > 0;

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Medicine Inventory
          </h2>

          <p className="text-sm text-slate-500">
            Search, manage, update and monitor all medicines available in your
            pharmacy.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="px-6 py-5 border-b border-slate-100">
        <InventorySearch />
      </div>

      {/* Inventory */}
      <div className="p-6">
        {hasMedicines ? (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <InventoryTable medicines={medicines} />
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-5 lg:hidden">
              {medicines.map((medicine) => (
                <InventoryCard
                  key={medicine._id || medicine.id}
                  medicine={medicine}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <InventoryPagination />
            </div>
          </>
        ) : (
          <EmptyInventory />
        )}
      </div>
    </section>
  );
};

export default MedicineInventory;