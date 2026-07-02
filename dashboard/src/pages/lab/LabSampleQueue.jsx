import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export default function LabSampleQueue() {
  const [queue, setQueue] = useState([
    { id: 'L-2026-001', name: 'Ali Khan', test: 'CBC', priority: 'High', status: 'Pending' },
    { id: 'L-2026-002', name: 'Fatima Z.', test: 'Glucose', priority: 'Normal', status: 'Collected' },
    { id: 'L-2026-003', name: 'Ahmed Raza', test: 'Thyroid', priority: 'High', status: 'Processing' },
  ]);

  // Status Color Logic
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-gray-100 text-gray-600';
      case 'Collected': return 'bg-blue-100 text-blue-600';
      case 'Processing': return 'bg-amber-100 text-amber-600';
      default: return 'bg-green-100 text-green-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Sample Queue</h2>
            <p className="text-sm text-slate-500">Manage all incoming lab samples</p>
          </div>
          <button className="bg-[#0a1128] text-white px-6 py-2 rounded-xl font-bold text-sm hover:opacity-90">
            + New Sample
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input type="text" placeholder="Search by name or ID..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600">
            <Filter size={18} /> Filter
          </button>
        </div>

        {/* Queue Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-[10px] uppercase text-slate-400 font-bold">
                <th className="p-4">Sample ID</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Test Type</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-all text-sm font-medium">
                  <td className="p-4 text-slate-900 font-bold">{item.id}</td>
                  <td className="p-4 text-slate-700">{item.name}</td>
                  <td className="p-4 text-slate-600">{item.test}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${item.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-600"><Clock size={16}/></button>
                      <button className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg"><CheckCircle2 size={16}/></button>
                      <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg"><AlertTriangle size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}