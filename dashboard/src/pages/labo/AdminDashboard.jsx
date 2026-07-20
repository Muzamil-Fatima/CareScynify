import React from 'react';
import Sidebar from '../components/Sidebar';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Clock, AlertCircle } from 'lucide-react';

// API Key ko .env file se load karna (Security best practice)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function AdminDashboard() {
  
  // Data Arrays
  const patientIntake = [
    { name: 'Ali Khan', time: '2 mins ago', status: 'New', initial: 'AK', bg: 'bg-blue-500' },
    { name: 'Sara Raza', time: '18 mins ago', status: 'New', initial: 'SR', bg: 'bg-emerald-500' },
    { name: 'M. Hassan', time: '1 hr ago', status: 'New', initial: 'MH', bg: 'bg-purple-500' },
    { name: 'Fatima A.', time: '3 hrs ago', status: 'New', initial: 'FA', bg: 'bg-amber-500' },
  ];

  const pendingVerification = [
    { id: 'L-2401', patient: 'Sarah Jones', test: 'Lipid Panel', status: 'In Progress' },
    { id: 'L-2402', patient: 'David Smith', test: 'Lipid Panel', status: 'In Progress' },
    { id: 'L-2403', patient: 'Maria Khan', test: 'Thyroid Profile', status: 'In Progress' },
  ];

  const categories = [
    { name: 'Blood CBC', count: 75, percentage: 'w-[75%]', color: 'bg-blue-600' },
    { name: 'Urine', count: 50, percentage: 'w-[50%]', color: 'bg-emerald-500' },
    { name: 'X-Ray', count: 40, percentage: 'w-[40%]', color: 'bg-purple-500' },
    { name: 'Culture', count: 25, percentage: 'w-[25%]', color: 'bg-amber-500' },
    { name: 'Thyroid', count: 18, percentage: 'w-[18%]', color: 'bg-pink-500' },
  ];

  const systemActivities = [
    { text: 'New patient Ali Khan registered', time: '2 mins ago' },
    { text: 'Blood test result uploaded for Sara Raza', time: '15 mins ago' },
    { text: 'Invoice #1042 generated — Rs 3,500', time: '1 hr ago' },
    { text: 'Staff member Dr. Nadia marked on leave', time: '2 hrs ago' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans antialiased">
      <Sidebar role="admin" />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Admin Dashboard</h2>
            <p className="text-xs text-slate-400 font-medium">Good afternoon, Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200 cursor-pointer relative">
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <span>🔔</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Total Patients', val: '248', sub: '+12 today', bg: 'bg-[#2563eb]' },
            { title: 'Tests Today', val: '37', sub: '+8% growth', bg: 'bg-[#10b981]' },
            { title: 'Revenue', val: 'Rs 84K', sub: '+15% growth', bg: 'bg-[#f59e0b]' },
            { title: 'Active Staff', val: '18', sub: '2 on leave', bg: 'bg-[#ef4444]' },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} text-white p-4 rounded-xl shadow-sm`}>
              <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">{item.title}</p>
              <h3 className="text-2xl font-bold mt-1">{item.val}</h3>
              <span className="text-[11px] font-medium bg-white/20 px-2 py-0.5 rounded-md mt-2 inline-block">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* Layout Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Recent Registrations</h3>
            <div className="space-y-4">
              {patientIntake.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-full ${p.bg} text-white flex items-center justify-center font-bold text-xs`}>{p.initial}</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{p.name}</h4>
                      <p className="text-[11px] text-slate-400">{p.time}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded border border-emerald-100 uppercase">{p.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Tests by Category</h3>
            <div className="space-y-3.5">
              {categories.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{cat.name}</span>
                    <span className="text-slate-500 font-bold">{cat.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color} ${cat.percentage} rounded-full`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tables and Logs */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800">Pending Verification Queue</h3>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50/40 text-slate-400 text-[11px] font-bold uppercase border-b border-slate-100">
                <tr><th className="p-3 pl-5">Sample ID</th><th className="p-3">Patient Name</th><th className="p-3">Test Type</th><th className="p-3 text-right pr-5">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {pendingVerification.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 pl-5 font-bold text-slate-900">{row.id}</td>
                    <td className="p-3">{row.patient}</td>
                    <td className="p-3">{row.test}</td>
                    <td className="p-3 text-right pr-5">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center"><Clock size={10} className="mr-1" /> {row.status}</span>
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