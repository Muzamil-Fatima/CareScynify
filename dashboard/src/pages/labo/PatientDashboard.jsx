import React from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Bell, Clock, Calendar, Activity, ShieldCheck, ChevronRight, FileText 
} from 'lucide-react';

export default function PatientDashboard() {
  // Yeh data aap baad mein API se bhi fetch kar sakte hain
  const stats = [
    { label: 'Pending Reports', val: '03', icon: Clock, color: 'text-amber-500' },
    { label: 'Upcoming Appt', val: '01', icon: Calendar, color: 'text-blue-500' },
    { label: 'Total Visits', val: '12', icon: Activity, color: 'text-emerald-500' },
    { label: 'Health Score', val: '98%', icon: ShieldCheck, color: 'text-purple-500' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* 🚀 SIDEBAR INTEGRATION */}
      <Sidebar role="patient" />

      {/* 📊 MAIN DASHBOARD CONTENT */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Patient Dashboard</h2>
            <p className="text-gray-500 font-medium">Welcome back, Patient ID #CS-8821</p>
          </div>
          <button className="relative p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all">
            <Bell className="text-gray-600" size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>

        {/* 📈 STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <stat.icon className={`${stat.color} mb-3`} size={24} />
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.val}</h3>
            </div>
          ))}
        </div>

        {/* 📋 RECENT REPORTS TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Recent Clinical Reports</h3>
            <button className="text-blue-600 font-bold text-sm flex items-center hover:gap-2 transition-all">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-xs font-bold uppercase tracking-widest border-b">
                <th className="pb-4">Test Name</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { name: 'Complete Blood Count (CBC)', date: '25 May 2026', status: 'Completed', color: 'text-emerald-600 bg-emerald-50' },
                { name: 'Lipid Profile', date: '20 May 2026', status: 'Pending', color: 'text-amber-600 bg-amber-50' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="py-5 font-semibold text-gray-800">{row.name}</td>
                  <td className="py-5 text-gray-600 font-medium">{row.date}</td>
                  <td className="py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.color}`}>{row.status}</span>
                  </td>
                  <td className="py-5 text-blue-600 font-bold cursor-pointer hover:underline">Download</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}