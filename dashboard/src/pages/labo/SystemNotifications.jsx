import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, AlertTriangle, Info, Zap } from 'lucide-react';

export default function SystemNotifications() {
  const [stats, setStats] = useState({ critical: 2, warnings: 8 });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Critical', title: 'CRITICAL - Hardware Failure • Sensor Group B', details: 'Error Code: SNR_ERR_B_014.', location: 'Lab Section 2' },
    { id: 2, type: 'Warning', title: 'WARNING - Test Workflow Delay • Patient: Khan', details: 'Actual stage duration 13.5 min.', location: 'Sample Prep' }
  ]);

  // Real-time Simulation: Har 5 second mein notification update hoga
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly naye issues add/remove karein
      if (Math.random() > 0.7) {
        const newNotification = {
          id: Date.now(),
          type: 'Warning',
          title: 'WARNING - New Queue Bottleneck Detected',
          details: `System lag detected in batch ${Math.floor(Math.random() * 100)}`,
          location: 'Queue Management'
        };
        setNotifications(prev => [newNotification, ...prev].slice(0, 4));
        setStats(prev => ({ ...prev, warnings: prev.warnings + 1 }));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="staff" />
      <main className="flex-1 p-8">
        {/* Header with Live Stats */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Bell size={24} className="text-slate-800" /> Advanced System Analytics
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="bg-red-50 px-6 py-3 rounded-2xl border border-red-100 text-center animate-pulse">
              <p className="text-[10px] font-bold text-red-500 uppercase">Critical</p>
              <p className="text-xl font-bold text-red-700">{stats.critical}</p>
            </div>
            <div className="bg-amber-50 px-6 py-3 rounded-2xl border border-amber-100 text-center">
              <p className="text-[10px] font-bold text-amber-500 uppercase">Warnings</p>
              <p className="text-xl font-bold text-amber-700">{stats.warnings}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-4">
            {notifications.map((n) => (
              <div key={n.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className={`flex items-center gap-2 font-bold ${n.type === 'Critical' ? 'text-red-600' : 'text-amber-600'}`}>
                    <AlertTriangle size={18} /> {n.title}
                  </div>
                  <button className="bg-slate-900 text-white text-[10px] px-4 py-2 rounded-xl">Diagnose Now</button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl text-slate-600 font-medium">Diagnostic: {n.details}</div>
                  <div className="bg-slate-50 p-4 rounded-xl text-slate-600 font-medium">Location: {n.location}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Predictive AI Feed */}
          <div className="col-span-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Zap size={18} /> AI Predictive Feed</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-xs font-bold text-slate-800">High Warning Frequency Trend</p>
                <p className="text-[11px] text-slate-400 mt-1">AI predicts hardware failure in next 2 hours.</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-xs font-bold text-slate-800">Resource Optimization Active</p>
                <p className="text-[11px] text-slate-400 mt-1">System is auto-balancing load across units.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}