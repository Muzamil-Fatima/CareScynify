import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMedicine } from "../../../../context/pharmacy/MedicineContext";

import InventorySearch from "./InventorySearch";
import InventoryTable from "./InventoryTable";
import InventoryCard from "./InventoryCard";
import InventoryPagination from "./InventoryPagination";
import EmptyInventory from "./EmptyInventory";

const MedicineInventory = ({ medicines = [], onView }) => {
  const { removeMedicine } = useMedicine();
  const navigate = useNavigate();
  const hasMedicines = medicines.length > 0;

  const handleDelete = async (medicine) => {
    console.log("handleDelete called", medicine);

    try {
      await removeMedicine(medicine._id);
      toast.success("Medicine deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to delete medicine.",
      );
    }
  };

  const handleEdit = (medicine) => {
    navigate(`/pharmacy/edit-medicine/${medicine._id}`);
  };

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
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
      <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-slate-100">
        <InventorySearch />
      </div>

      {/* Inventory */}
      <div className="p-6">
        {hasMedicines ? (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <InventoryTable
                medicines={medicines}
                onView={onView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-5 lg:hidden">
              {medicines.map((medicine) => (
                <InventoryCard
                  key={medicine._id}
                  medicine={medicine}
                  onView={onView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
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
