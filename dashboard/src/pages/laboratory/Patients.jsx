import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // <-- Custom Sidebar Component Import kiya
import { UserPlus, Search, Trash2, Edit } from 'lucide-react';

export default function Patients() {
  // Mock Data for Patients List
  const [patients, setPatients] = useState([
    { id: 'PT-101', name: 'Ali Khan', age: 28, gender: 'Male', contact: '0300-1234567', tests: 'Blood CBC', date: '2026-05-21' },
    { id: 'PT-102', name: 'Sara Raza', age: 24, gender: 'Female', contact: '0321-7654321', tests: 'Lipid Panel', date: '2026-05-21' },
    { id: 'PT-103', name: 'M. Hassan', age: 35, gender: 'Male', contact: '0333-9876543', tests: 'Thyroid Profile', date: '2026-05-20' },
    { id: 'PT-104', name: 'Fatima Ahmed', age: 42, gender: 'Female', contact: '0345-4567890', tests: 'Urine Routine', date: '2026-05-19' },
  ]);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    tests: ''
  });

  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add New Patient Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      alert("Please fill name and contact details");
      return;
    }

    const newPatient = {
      id: `PT-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      age: parseInt(formData.age) || 'N/A',
      gender: formData.gender,
      contact: formData.contact,
      tests: formData.tests || 'Routine Checkup',
      date: new Date().toISOString().split('T')[0]
    };

    setPatients([newPatient, ...patients]);
    
    // Reset Form
    setFormData({ name: '', age: '', gender: 'Male', contact: '', tests: '' });
  };

  // Delete Patient Handler
  const handleDeletePatient = (id) => {
    if(window.confirm("Kya aap is patient ka record delete karna chahte hain?")) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  // Filter Patients based on Search
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.contact.includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans antialiased">
      
          {/* SIDEBAR NAVIGATION COMPONENT */}
      <Sidebar role="admin" /> {/* <-- Sidebar yahan fit ho gaya */}

      {/* PATIENTS MAIN WORKSPACE */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Patients Management
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Register new arrivals and manage patient clinical records</p>
          </div>
          
          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search by ID, Name or Mobile..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 shadow-sm transition-all text-slate-700"
            />
          </div>
        </div>

        {/* Two Column Layout: Form & Database Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Registration Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <div className="flex items-center space-x-2.5 mb-5 text-blue-600">
              <UserPlus size={20} />
              <h3 className="text-base font-bold text-slate-800">New Patient Entry</h3>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Muhammad Ali" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Age</label>
                  <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Gender</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Contact Number</label>
                <input 
                  type="text" 
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="e.g. 03001234567" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Assigned Test</label>
                <input 
                  type="text" 
                  name="tests"
                  value={formData.tests}
                  onChange={handleInputChange}
                  placeholder="e.g. Blood CBC, Liver Profile" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <button 
                type="submit" 
                className="w-full mt-2 bg-[#0a1128] hover:bg-slate-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <UserPlus size={16} />
                <span>Register Patient</span>
              </button>
            </form>
          </div>

          {/* Right Column: Patients Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-5 bg-slate-50/60 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800">Active Patient Database ({filteredPatients.length})</h3>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-blue-100">Live Sync</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30 text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-3.5 pl-5">ID</th>
                      <th className="p-3.5">Patient Details</th>
                      <th className="p-3.5">Contact No</th>
                      <th className="p-3.5">Prescribed Test</th>
                      <th className="p-3.5 text-center pr-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {filteredPatients.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">Koi patient record nahi mila.</td>
                      </tr>
                    ) : (
                      filteredPatients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="p-3.5 pl-5 font-bold text-slate-900">{patient.id}</td>
                          <td className="p-3.5">
                            <div>
                              <span className="font-bold text-slate-800 block text-[13px]">{patient.name}</span>
                              <span className="text-slate-400 text-[10px]">{patient.age} Yrs • {patient.gender}</span>
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-600 font-mono">{patient.contact}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100">
                              {patient.tests}
                            </span>
                          </td>
                          <td className="p-3.5 text-center pr-5">
                            <div className="flex items-center justify-center space-x-2">
                              <button 
                                type="button"
                                onClick={() => alert(`Edit features coming soon!`)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleDeletePatient(patient.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card Footer Info */}
            <div className="p-4 border-t border-slate-50 bg-slate-50/30 text-[11px] text-slate-400 flex justify-between items-center">
              <span>CareScynify Patient Module v1.2</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}