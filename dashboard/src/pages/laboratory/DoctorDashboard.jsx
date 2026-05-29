import React from 'react';
import Sidebar from '../components/Sidebar';
import CustomCalendar from '../components/CustomCalendar';
import Schedule from '../components/Schedule';

const DoctorDashboard = () => {
  // Data for the Queue
  const patientQueue = [
    { name: "Ali Khan", symptoms: "Fever, Cough", wait: "15m", status: "Waiting" },
    { name: "Sara Ahmed", symptoms: "Headache", wait: "-", status: "In-Consultation" },
    { name: "Usman Malik", symptoms: "Back Pain", wait: "32m", status: "Waiting" },
    { name: "Fatima Zahra", symptoms: "Diabetes Follow-up", wait: "48m", status: "Urgent" }
  ];
const recentPrescriptions = [
  { patient: "Sara Ahmed", diagnosis: "Migraine", date: "28 May" },
  { patient: "Ahmad Raza", diagnosis: "Throat Infection", date: "27 May" },
  { patient: "Nida Farooq", diagnosis: "Hypertension", date: "26 May" }
];
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar - Dynamic role based */}
      <Sidebar role="doctor" />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">Welcome back, Dr. Rizwan</p>
        </div>
      


        {/* STATS CARDS */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard title="Today Appts" value="12" color="text-blue-600" />
          <StatCard title="Pending Reports" value="05" color="text-amber-500" />
          <StatCard title="Total Patients" value="120" color="text-emerald-600" />
          <StatCard title="Urgent Cases" value="02" color="text-red-600" />
        </div>

      {/* CONTENT AREA */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
  
  {/* LEFT COLUMN: Patient Queue + Prescriptions (Takes 2 columns) */}
  <div className="xl:col-span-2 space-y-6">
    
    {/* Patient Queue */}
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-800">Patient Queue (Waitlist)</h3>
        <button className="text-blue-600 text-xs font-bold hover:underline">See all →</button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b">
          <tr className="text-left">
            <th className="pb-4 font-medium uppercase text-[10px] tracking-wider">Patient Name</th>
            <th className="pb-4 font-medium uppercase text-[10px] tracking-wider">Symptoms</th>
            <th className="pb-4 font-medium uppercase text-[10px] tracking-wider">Wait</th>
            <th className="pb-4 font-medium uppercase text-[10px] tracking-wider">Status</th>
            <th className="pb-4 font-medium uppercase text-[10px] tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {patientQueue.map((p, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="py-5 font-bold text-slate-800">{p.name}</td>
              <td className="py-5 text-gray-600">{p.symptoms}</td>
              <td className="py-5 text-amber-600 font-bold">{p.wait}</td>
              <td className="py-5">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  p.status === 'In-Consultation' ? 'bg-blue-100 text-blue-600' : 
                  p.status === 'Urgent' ? 'bg-rose-100 text-rose-600' : 
                  'bg-amber-100 text-amber-600'
                }`}>
                  {p.status}
                </span>
              </td>
              <td className="py-5">
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition">
                  Start Session
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Recent Prescriptions */}
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-slate-800">Recent Prescriptions</h3>
        <button className="text-blue-600 text-xs font-bold hover:underline">See all →</button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b">
          <tr className="text-left">
            <th className="pb-4 font-medium uppercase text-[10px] tracking-wider">Patient</th>
            <th className="pb-4 font-medium uppercase text-[10px] tracking-wider">Diagnosis</th>
            <th className="pb-4 font-medium uppercase text-[10px] tracking-wider">Date</th>
            <th className="pb-4 font-medium uppercase text-[10px] tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {recentPrescriptions.map((r, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="py-5 font-bold text-slate-800">{r.patient}</td>
              <td className="py-5 text-gray-600">{r.diagnosis}</td>
              <td className="py-5 text-gray-500">{r.date}</td>
              <td className="py-5 text-right">
                <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition">
                  Print PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* RIGHT COLUMN: Calendar & Schedule (Takes 1 column) */}
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <h3 className="font-bold mb-4 text-slate-800">May 2026</h3>
      <CustomCalendar />
    </div>
    <Schedule />
  </div>
        </div>
      </main>
    </div>
  );
};

// Reusable Stat Component
const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-5 rounded-xl border shadow-sm">
    <p className="text-[10px] uppercase text-gray-400 font-bold">{title}</p>
    <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
  </div>
);

export default DoctorDashboard;