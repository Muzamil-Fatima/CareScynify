import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FileText, Download, Eye, Share2, Search, Filter, Clock, CheckCircle } from 'lucide-react';

export default function MyReports() {
  const [searchTerm, setSearchTerm] = useState("");

  const reports = [
    { id: 1, name: 'Complete Blood Count (CBC)', date: '25 May 2026', status: 'Ready', type: 'Pathology' },
    { id: 2, name: 'Lipid Profile', date: '20 May 2026', status: 'Pending', type: 'Biochemistry' },
    { id: 3, name: 'Chest X-Ray', date: '15 May 2026', status: 'Ready', type: 'Radiology' },
    { id: 4, name: 'Thyroid Function Test', date: '12 May 2026', status: 'Ready', type: 'Endocrinology' },
  ];

  const filteredReports = reports.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar added here for layout consistency */}
      <Sidebar role="patient" />

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Lab Reports</h2>
              <p className="text-slate-500 text-sm font-medium">Access and manage all your diagnostic results.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search reports..." 
                  className="pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 w-full focus:outline-none focus:border-blue-500 transition-all"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-4">Report Name</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-all group">
                    <td className="py-5 font-semibold text-slate-800 flex items-center gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText size={18} />
                      </div>
                      {report.name}
                    </td>
                    <td className="py-5 text-slate-600 font-medium">{report.date}</td>
                    <td className="py-5 text-slate-600 font-medium">{report.type}</td>
                    <td className="py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1.5 ${
                        report.status === 'Ready' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'
                      }`}>
                        {report.status === 'Ready' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                        {report.status}
                      </span>
                    </td>
                    <td className="py-5">
                      <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-slate-100 rounded-lg hover:bg-blue-100 transition-colors"><Eye size={18} /></button>
                        <button className="p-2 bg-slate-100 rounded-lg hover:bg-blue-100 transition-colors"><Download size={18} /></button>
                        <button className="p-2 bg-slate-100 rounded-lg hover:bg-blue-100 transition-colors"><Share2 size={18} /></button>
                      </div>
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