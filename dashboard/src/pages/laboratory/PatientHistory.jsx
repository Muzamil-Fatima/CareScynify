import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const PatientHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const patients = [
    { id: "PT-0012", name: "Ali Khan", age: 32, gender: "Male", symptoms: ["Fever", "Cough", "Hypertension"], lastVisit: "28 May 2026", status: "Active" },
    { id: "PT-0015", name: "Sara Ahmed", age: 28, gender: "Female", symptoms: ["Migraine", "Anxiety"], lastVisit: "28 May 2026", status: "Active" },
    { id: "PT-0008", name: "Fatima Zahra", age: 58, gender: "Female", symptoms: ["Diabetes T2", "Hypertension"], lastVisit: "26 May 2026", status: "Urgent" },
    { id: "PT-0023", name: "Usman Malik", age: 45, gender: "Male", symptoms: ["Back Pain", "Sciatica"], lastVisit: "24 May 2026", status: "Follow-up" },
    { id: "PT-0031", name: "Ahmad Raza", age: 19, gender: "Male", symptoms: ["Throat Infection"], lastVisit: "27 May 2026", status: "Recovered" },
    { id: "PT-0044", name: "Nida Farooq", age: 52, gender: "Female", symptoms: ["Hypertension", "Cholesterol"], lastVisit: "26 May 2026", status: "Monitoring" },
  ];

  // Dynamic Filtering Logic: Search aur Filter dono ek saath kaam karenge
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-blue-50 text-blue-600';
      case 'Urgent': return 'bg-rose-50 text-rose-600';
      case 'Follow-up': return 'bg-amber-50 text-amber-600';
      case 'Recovered': return 'bg-emerald-50 text-emerald-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="doctor" />

      <main className="flex-1 p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Patient History</h2>
            <p className="text-sm text-gray-500">{filteredPatients.length} patients found</p>
          </div>
          
          <div className="flex gap-4">
            {/* Search Input */}
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="px-4 py-2 border rounded-xl w-64 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* Filter Dropdown */}
            <select 
              className="px-4 py-2 border rounded-xl font-bold text-sm bg-white cursor-pointer hover:border-blue-500 outline-none"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">Filter By Status</option>
              <option value="Active">Active</option>
              <option value="Urgent">Urgent</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Recovered">Recovered</option>
              <option value="Monitoring">Monitoring</option>
            </select>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition">
              + Add Patient
            </button>
          </div>
        </div>

        {/* Patient Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center font-bold text-blue-600">
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{p.name}</h3>
                  <p className="text-xs text-gray-500">{p.id} • {p.age} yrs • {p.gender}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {p.symptoms.map((s, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 rounded-full text-[10px] text-gray-600 font-medium">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-xs text-gray-400">Last: {p.lastVisit}</p>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(p.status)}`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 && (
          <div className="text-center py-20 text-gray-400">No patients found matching your search or filter.</div>
        )}
      </main>
    </div>
  );
};

export default PatientHistory;