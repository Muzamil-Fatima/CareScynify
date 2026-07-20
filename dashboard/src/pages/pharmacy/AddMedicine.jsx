import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MedicineHead from "../../components/pharmacy/medicine/MedicineHead";
import MedicineForm from "../../components/pharmacy/medicine/MedicineForm";
import { useMedicine } from "../../context/pharmacy/MedicineContext";

const AddMedicine = () => {
  const { id } = useParams();

  const { fetchMedicineById } = useMedicine();

  const [editingMedicine, setEditingMedicine] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadMedicine = async () => {
      try {
        const medicine = await fetchMedicineById(id);
        setEditingMedicine(medicine);
      } catch (err) {
        console.error(err);
      }
    };

    loadMedicine();
  }, [id, fetchMedicineById]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
        <MedicineHead editingMedicine={editingMedicine} />

        <div className="mt-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 overflow-hidden">
            <MedicineForm
              editingMedicine={editingMedicine}
              setEditingMedicine={setEditingMedicine}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;
