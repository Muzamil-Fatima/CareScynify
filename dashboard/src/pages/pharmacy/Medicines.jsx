import React, { useEffect, useState } from "react";

import MedicineHead from "../../components/pharmacy/medicine/MedicineHead";
import MedicineStats from "../../components/pharmacy/medicine/MedicineStats";
import MedicineInventory from "../../components/pharmacy/medicine/inventory/MedicineInventory";
import MedicineDetailsModal from "../../components/pharmacy/medicine/inventory/MedicineDetailsModal";

import { useMedicine } from "../../context/pharmacy/MedicineContext";

const Medicines = () => {
  const {
    medicines,
    stats,
    fetchMedicines,
    fetchMedicineStats,
    loading,
  } = useMedicine();

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // View Medicine
  const handleViewMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setShowDetailsModal(true);
  };

  // Initial Data
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchMedicines(),
          fetchMedicineStats(),
        ]);
      } catch (error) {
        console.error("Error loading medicine page:", error);
      }
    };

    loadData();
  }, [fetchMedicines, fetchMedicineStats]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-3 sm:px-5 lg:px-6">

        <MedicineHead />

        {/* Stats */}
        <MedicineStats stats={stats} />

        {/* Inventory */}
        <MedicineInventory
          medicines={medicines}
          loading={loading}
          onView={handleViewMedicine}
        />

        {/* Details Modal */}
        {showDetailsModal && (
          <MedicineDetailsModal
            medicine={selectedMedicine}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedMedicine(null);
            }}
          />
        )}

      </div>
    </div>
  );
};

export default Medicines;