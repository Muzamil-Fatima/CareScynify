import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Prescription = () => {
  // Previous prescriptions data
  const previousPrescriptions = [
    { patient: "Sara Ahmed", diagnosis: "Migraine", date: "28 May" },
    { patient: "Ahmad Raza", diagnosis: "Throat Inf.", date: "27 May" },
    { patient: "Nida Farooq", diagnosis: "Hypertension", date: "26 May" },
    { patient: "Ali Khan", diagnosis: "Viral Fever", date: "22 May" },
    { patient: "Usman Malik", diagnosis: "Back Pain", date: "19 May" },
  ];

  // State for dynamic medicine rows
  const [medicines, setMedicines] = useState([
    { id: Date.now(), name: '', dosage: '', frequency: '', duration: '' }
  ]);

  // Add new row
  const addMedicineRow = () => {
    setMedicines([...medicines, { id: Date.now(), name: '', dosage: '', frequency: '', duration: '' }]);
  };

  // Remove specific row
  const removeMedicineRow = (id) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="doctor" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Prescriptions</h2>
            <p className="text-sm text-gray-500">Write & manage</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button className="px-4 py-2 text-gray-500 font-bold hover:bg-white rounded-md">Dashboard</button>
            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md shadow-sm">Prescription</button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* New Prescription Form (Left) */}
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold text-lg mb-6">New Prescription</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Patient Name</label>
                <input className="w-full mt-1 p-3 border rounded-xl bg-slate-50" defaultValue="Ali Khan - PT-0012" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Date</label>
                <input type="date" className="w-full mt-1 p-3 border rounded-xl" defaultValue="2026-05-28" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Diagnosis</label>
                <input className="w-full mt-1 p-3 border rounded-xl" placeholder="e.g. Viral Fever" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">BP / Weight</label>
                <input className="w-full mt-1 p-3 border rounded-xl" placeholder="120/80 - 72 kg" />
              </div>
            </div>
{/* Medicine Rows */}
<div className="mb-6">
  <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Medicines</label>
  
  {medicines.map((med) => (
    <div key={med.id} className="grid grid-cols-12 gap-2 mb-3 items-center">
      {/* Har input ko span diya hai taaki layout barabar rahay */}
      <input className="col-span-3 p-3 border rounded-xl text-sm" placeholder="Medicine" />
      <input className="col-span-2 p-3 border rounded-xl text-sm" placeholder="Dosage" />
      <input className="col-span-3 p-3 border rounded-xl text-sm" placeholder="Frequency" />
      <div className="col-span-4 flex items-center gap-2">
        <input className="w-full p-3 border rounded-xl text-sm" placeholder="Duration" />
        <button 
          onClick={() => removeMedicineRow(med.id)} 
          className="text-red-400 hover:text-red-600 font-bold px-2"
        >
          ✕
        </button>
      </div>
    </div>
  ))}

  <button 
    onClick={addMedicineRow}
    className="w-full mt-2 py-3 border-2 border-dashed border-blue-200 text-blue-600 font-bold rounded-xl text-sm hover:bg-blue-50 transition"
  >
    + Add Another Medicine
  </button>
</div>

            <label className="text-xs font-bold text-gray-400 uppercase">Doctor's Notes</label>
            <textarea className="w-full mt-1 p-3 border rounded-xl mb-6 h-24" placeholder="Rest, drink fluids..." />

            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">Save Prescription</button>
              <button className="bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-200 transition">Print / PDF</button>
            </div>
          </div>

          {/* Previous Prescriptions (Right) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit">
            <h3 className="font-bold text-lg mb-6">Previous Prescriptions</h3>
            <table className="w-full text-sm">
              <thead className="text-gray-400">
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium uppercase text-[10px]">Patient</th>
                  <th className="pb-3 font-medium uppercase text-[10px]">Diagnosis</th>
                  <th className="pb-3 font-medium uppercase text-[10px]">Date</th>
                  <th className="pb-3 font-medium uppercase text-[10px]">PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {previousPrescriptions.map((p, i) => (
                  <tr key={i}>
                    <td className="py-4 font-bold text-slate-700">{p.patient}</td>
                    <td className="py-4 text-gray-600">{p.diagnosis}</td>
                    <td className="py-4 text-gray-500">{p.date}</td>
                    <td className="py-4 text-blue-600 font-bold cursor-pointer hover:underline">PDF</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prescription;