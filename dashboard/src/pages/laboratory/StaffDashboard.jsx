import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ScanBarcode, AlertCircle, CheckCircle, Activity, Microscope } from 'lucide-react';

const StaffDashboard = () => {
  // Sample Data: Real-world lab queue
  const [queue, setQueue] = useState([
    { id: 'L2026-A12', patient: 'Ali Khan', test: 'CBC', priority: 'Urgent', status: 'Received' },
    { id: 'L2026-A15', patient: 'Fatima Z.', test: 'Glucose', status: 'In-Process' },
    { id: 'L2026-B17', patient: 'Ahmed Raza', test: 'Thyroid', status: 'Testing' },
  ]);

  // Status update function
  const updateStatus = (id, newStatus) => {
    setQueue(queue.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Dynamic role based */}
            <Sidebar role="staff" />
      
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Lab Operations</h2>

        {/* Top Performance Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[ {l: 'PENDING TESTS', v: '18', color: 'text-amber-600'}, {l: 'COMPLETED', v: '51', color: 'text-emerald-600'}, 
             {l: 'URGENT CASES', v: '3', color: 'text-red-600'}, {l: 'AVG TAT', v: '38m', color: 'text-blue-600'} ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase">{card.l}</p>
              <h3 className={`text-2xl font-bold mt-1 ${card.color}`}>{card.v}</h3>
            </div>
          ))}
        </div>

        {/* Live Queue Table */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Live Sample Queue</h3>
            <button className="text-xs font-bold bg-blue-50 text-blue-600 px-4 py-2 rounded-lg">Export Report</button>
          </div>
          
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-gray-400 uppercase text-[10px]">
              <tr>
                <th className="p-4 text-left">Sample ID</th>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Test</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {queue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-700">{item.id}</td>
                  <td className="p-4 font-semibold">{item.patient}</td>
                  <td className="p-4">{item.test}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${item.status === 'Received' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.status === 'Received' ? (
                      <button onClick={() => updateStatus(item.id, 'In-Process')} className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                        <ScanBarcode size={14} /> Scan
                      </button>
                    ) : (
                      <button onClick={() => updateStatus(item.id, 'Completed')} className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                        <CheckCircle size={14} /> Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;