import React, { useEffect } from "react";

import MedicineHead from "../../components/pharmacy/medicine/MedicineHead";
import MedicineStats from "../../components/pharmacy/medicine/MedicineStats";
import MedicineInventory from "../../components/pharmacy/medicine/inventory/MedicineInventory";

import { useMedicine } from "../../context/pharmacy/MedicineContext";

const Medicines = () => {
  const { medicines, fetchMedicines, loading } = useMedicine();
  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  return (
    <div className="min-h-screen bg-slate-100 w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-3 lg:px-0 space-y-6">
        <MedicineHead />

        <MedicineStats medicines={medicines} />

        <MedicineInventory medicines={medicines} loading={loading} />
      </div>
    </div>
  );
};

export default Medicines;
