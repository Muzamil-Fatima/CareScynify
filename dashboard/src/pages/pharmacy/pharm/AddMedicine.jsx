// src/pages/pharmacy/AddMedicine.jsx

import React, { useState } from "react";

import MedicineHeader from "../../components/pharmacy/MedicineHeader";
import MedicineStats from "../../components/pharmacy/MedicineStats";
import MedicineForm from "../../components/pharmacy/MedicineForm";

const AddMedicine = () => {
  const [editingMedicine, setEditingMedicine] = useState(null);

  // Temporary Stats (Later connect with backend)
  const stats = {
    total: 145,
    lowStock: 12,
    expiringSoon: 7,
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <MedicineHeader />

        {/* Statistics */}
        <div className="mt-8">
          <MedicineStats stats={stats} />
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-7">
              <MedicineForm
                editingMedicine={editingMedicine}
                setEditingMedicine={setEditingMedicine}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 h-full">
              {/* Inventory Header */}
              <div className="border-b border-slate-200 px-7 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Medicine Inventory
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    View, search and manage all available medicines.
                  </p>
                </div>

                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition">
                  View All
                </button>
              </div>

              {/* Placeholder */}
              <div className="flex flex-col items-center justify-center h-[550px] px-8 text-center">
                <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-5xl">💊</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-700 mt-6">
                  Medicine Inventory
                </h3>

                <p className="text-slate-500 mt-3 max-w-md">
                  Your medicines will appear here after adding them. You can
                  search, edit, update stock and delete medicines from this
                  section.
                </p>

                <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition">
                  Add First Medicine
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;