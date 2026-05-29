import React from 'react';
import Sidebar from '../components/Sidebar';

const LabReports = () => {
  const reports = [
    { patient: "Fatima Zahra", test: "HbA1c + FBS", requested: "26 May", lab: "LabCo", status: "Pending" },
    { patient: "Ali Khan", test: "CBC + ESR", requested: "27 May", lab: "CityLab", status: "Pending" },
    { patient: "Nida Farooq", test: "Lipid Profile", requested: "25 May", lab: "LabCo", status: "Received" },
    { patient: "Usman Malik", test: "MRI Lumbar", requested: "20 May", lab: "Scan Center", status: "Received" },
    { patient: "Sara Ahmed", test: "EEG", requested: "18 May", lab: "NeuroLab", status: "Received" },
  ];

  const getStatusColor = (status) => {
    return status === 'Pending' 
      ? 'bg-rose-50 text-rose-600' 
      : 'bg-emerald-50 text-emerald-600';
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="doctor" />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Lab Reports</h2>
          <p className="text-sm text-gray-500">2 pending results</p>
        </div>

        {/* Upload Area */}
        <div className="bg-white border-2 border-dashed border-sky-200 p-8 rounded-2xl mb-8 text-center hover:bg-sky-50 transition">
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">📁</span>
            <h3 className="font-bold text-slate-800">Click to upload lab report</h3>
            <p className="text-xs text-gray-400">PDF, JPG, PNG supported</p>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <table className="w-full text-sm">
            <thead className="text-gray-400 uppercase text-[10px]">
              <tr className="text-left border-b">
                <th className="pb-4 font-medium">Patient</th>
                <th className="pb-4 font-medium">Test Type</th>
                <th className="pb-4 font-medium">Requested</th>
                <th className="pb-4 font-medium">Lab</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reports.map((r, i) => (
                <tr key={i}>
                  <td className="py-4 font-bold text-slate-800">{r.patient}</td>
                  <td className="py-4 text-slate-600">{r.test}</td>
                  <td className="py-4 text-slate-600">{r.requested}</td>
                  <td className="py-4 text-slate-600">{r.lab}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${getStatusColor(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-xs font-bold text-blue-600 hover:underline">
                      {r.status === 'Pending' ? 'Follow Up' : 'View PDF'}
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

export default LabReports;