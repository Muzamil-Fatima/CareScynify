import React from 'react';

export default function PatientForm({ patientData, setPatientData, handleMedChange, addMedicineRow }) {
  return (
    <aside className="w-80 bg-white border-l border-slate-200 p-5 flex flex-col gap-5 overflow-y-auto print:hidden">
      <div>
        <h3 className="font-semibold text-xs uppercase tracking-wider text-blue-600 mb-1">3. Current Patient Case Info</h3>
        <p className="text-xs text-slate-500 mb-4">Har naye patient ki details aur prescription data yahan se update karain:</p>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Patient Name</label>
            <input 
              type="text" 
              value={patientData.name} 
              onChange={(e) => setPatientData({...patientData, name: e.target.value})}
              className="w-full text-sm p-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Age</label>
              <input 
                type="text" 
                value={patientData.age} 
                onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                className="w-full text-sm p-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
              <select 
                value={patientData.gender} 
                onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
                className="w-full text-sm p-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 bg-white outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Blood Pressure</label>
              <input 
                type="text" 
                value={patientData.bp} 
                placeholder="120/80"
                onChange={(e) => setPatientData({...patientData, bp: e.target.value})}
                className="w-full text-sm p-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Weight</label>
              <input 
                type="text" 
                value={patientData.weight} 
                placeholder="70kg"
                onChange={(e) => setPatientData({...patientData, weight: e.target.value})}
                className="w-full text-sm p-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-600">Medicines (Rx List)</h3>
          <button 
            onClick={addMedicineRow}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold px-2 py-1 rounded transition"
          >
            + Add New
          </button>
        </div>
        
        <div className="space-y-4 max-h-55 overflow-y-auto pr-1">
          {patientData.medicines.map((med, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 relative">
              <span className="absolute top-1 right-2 text-[10px] font-bold text-slate-300">#{idx+1}</span>
              <input 
                type="text" 
                placeholder="Medicine name" 
                value={med.name}
                onChange={(e) => handleMedChange(idx, 'name', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-200 rounded bg-white"
              />
              <div className="grid grid-cols-2 gap-1.5">
                <input 
                  type="text" 
                  placeholder="Dosage (1-0-1)" 
                  value={med.dosage}
                  onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded bg-white"
                />
                <input 
                  type="text" 
                  placeholder="Duration (7 Days)" 
                  value={med.duration}
                  onChange={(e) => handleMedChange(idx, 'duration', e.target.value)}
                  className="w-full text-xs p-1.5 border border-slate-200 rounded bg-white"
                />
              </div>
              <input 
                type="text" 
                placeholder="Instructions" 
                value={med.instructions}
                onChange={(e) => handleMedChange(idx, 'instructions', e.target.value)}
                className="w-full text-xs p-1.5 border border-slate-200 rounded bg-white"
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-100" />

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">Advice & Clinical Notes</label>
        <textarea 
          rows="3"
          value={patientData.notes}
          onChange={(e) => setPatientData({...patientData, notes: e.target.value})}
          placeholder="Enter tests, diets or advice..."
          className="w-full text-xs p-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none"
         />
      </div>
    </aside>
  );
}