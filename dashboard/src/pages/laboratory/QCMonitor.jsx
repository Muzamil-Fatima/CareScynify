import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Activity, RefreshCw } from 'lucide-react';

export default function QCMonitor() {
  // Initial state as a function to make it easy to reset
  const getInitialMachines = () => [
    { id: 1, name: 'Hematology Analyzer-A', status: 'Online', health: 98, lastCalibrated: '2 days ago' },
    { id: 2, name: 'Biochemistry Unit-1', status: 'Warning', health: 45, lastCalibrated: '15 days ago' },
    { id: 3, name: 'Urine Analyzer-B', status: 'Offline', health: 0, lastCalibrated: 'Pending' },
  ];

  const [machines, setMachines] = useState(getInitialMachines);

  // Real-time Simulation Engine
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(m => {
        if (m.status === 'Offline') return m;
        const change = Math.floor(Math.random() * 3) - 1;
        const newHealth = Math.max(0, Math.min(100, m.health + change));
        return { 
          ...m, 
          health: newHealth, 
          status: newHealth < 40 ? 'Warning' : 'Online' 
        };
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="staff" />
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">QC Monitor</h2>
            <p className="text-sm text-slate-500">Live machine calibration & diagnostic status</p>
          </div>
          <button 
            onClick={() => setMachines(getInitialMachines())}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all"
          >
            <RefreshCw size={14} /> Refresh Sensors
          </button>
        </div>

        {/* Machine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {machines.map((m) => (
            <div key={m.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${m.health > 40 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                  <Activity size={24} className={m.health > 40 ? 'text-emerald-500' : 'text-red-500'} />
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase ${m.health > 40 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                  {m.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-800">{m.name}</h3>
              <p className="text-[11px] text-slate-400 mb-4">Last Calibration: {m.lastCalibrated}</p>
              
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>SYSTEM HEALTH</span>
                  <span>{m.health}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${m.health > 40 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                    style={{ width: `${m.health}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* QC Logs Table */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4">Quality Control Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 uppercase">
                <tr>
                  <th className="pb-3">Machine</th>
                  <th className="pb-3">Current Status</th>
                  <th className="pb-3">Action Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {machines.map((m) => (
                  <tr key={m.id}>
                    <td className="py-4 text-slate-800 font-bold">{m.name}</td>
                    <td className="py-4">
                      <span className={m.health < 40 ? 'text-red-600 font-bold' : 'text-emerald-600'}>
                        {m.health < 40 ? 'Needs Attention' : 'Stable'}
                      </span>
                    </td>
                    <td className="py-4 text-slate-600">
                      {m.health < 40 ? 'Calibration Needed' : 'None'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}