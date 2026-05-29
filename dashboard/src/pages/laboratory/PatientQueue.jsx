import React from 'react';
import Sidebar from '../components/Sidebar'; // Sidebar import zaroori hai

const PatientQueue = () => {
  // Data for the queue
  const queueData = [
    { id: "01", name: "Ali Khan", age: 32, symptoms: "Fever, Cough", wait: "15 min", status: "Waiting" },
    { id: "02", name: "Sara Ahmed", age: 28, symptoms: "Headache", wait: "Active", status: "In-Consultation" },
    { id: "03", name: "Usman Malik", age: 45, symptoms: "Back Pain", wait: "32 min", status: "Waiting" },
    { id: "04", name: "Fatima Zahra", age: 58, symptoms: "Diabetes Follow-up", wait: "48 min", status: "Urgent" },
    { id: "05", name: "Bilal Hassan", age: 22, symptoms: "Skin Rash", wait: "10 min", status: "Waiting" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Component call */}
      <Sidebar role="doctor" />

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Patient Queue</h2>

        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatCard label="WAITING" value="3" color="text-amber-600" icon="⏳" />
          <StatCard label="IN CONSULTATION" value="1" color="text-blue-600" icon="💬" />
          <StatCard label="URGENT" value="1" color="text-red-600" icon="🚨" />
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b">
              <tr className="text-left">
                <th className="pb-4 font-medium uppercase tracking-wider">#</th>
                <th className="pb-4 font-medium uppercase tracking-wider">Patient Name</th>
                <th className="pb-4 font-medium uppercase tracking-wider">Age</th>
                <th className="pb-4 font-medium uppercase tracking-wider">Symptoms</th>
                <th className="pb-4 font-medium uppercase tracking-wider">Wait Time</th>
                <th className="pb-4 font-medium uppercase tracking-wider">Status</th>
                <th className="pb-4 font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {queueData.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 text-gray-500">{p.id}</td>
                  <td className="py-5 font-bold text-slate-800">{p.name}</td>
                  <td className="py-5 text-gray-600">{p.age}</td>
                  <td className="py-5 text-gray-600">{p.symptoms}</td>
                  <td className={`py-5 font-bold ${p.wait === 'Active' ? 'text-blue-600' : 'text-amber-600'}`}>
                    {p.wait}
                  </td>
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
                    <button className={`px-4 py-2 rounded-lg text-xs font-bold text-white transition ${
                      p.status === 'In-Consultation' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-900 hover:bg-slate-800'
                    }`}>
                      {p.status === 'In-Consultation' ? 'Resume' : 'Start Session'}
                    </button>
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

// Helper Component for Stats
const StatCard = ({ label, value, color, icon }) => (
  <div className="bg-white p-6 rounded-2xl border shadow-sm flex items-center gap-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 tracking-wider">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  </div>
);

export default PatientQueue;