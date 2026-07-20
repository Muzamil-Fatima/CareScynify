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
      <div className="max-w-7xl mx-auto px-6 py-8">
        <MedicineHead editingMedicine={editingMedicine} />

        <div className="mt-4">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7">
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