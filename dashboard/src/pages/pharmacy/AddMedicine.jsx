import React, { useState } from "react";

import MedicineHeader from "../../components/pharmacy/medicine/MedicineHeader";
import MedicineForm from "../../components/pharmacy/medicine/MedicineForm";

const AddMedicine = () => {
  const [editingMedicine, setEditingMedicine] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <MedicineHeader />


        {/* Main Content */}
        <div className="xl:col-span-1 mt-4">
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
