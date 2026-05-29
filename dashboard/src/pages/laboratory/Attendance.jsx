import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { UserCheck, Clock, LogIn, Briefcase, X } from 'lucide-react';

export default function Attendance() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. Sarah Ahmed', role: 'Lab Technician', shift: 'Morning', status: 'Present', time: '08:00 AM' },
    { id: 2, name: 'Ali Khan', role: 'Phlebotomist', shift: 'Afternoon', status: 'Absent', time: '-' },
    { id: 3, name: 'Fatima Z.', role: 'Data Entry', shift: 'Night', status: 'Present', time: '08:15 AM' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffId, setStaffId] = useState('');

  // Status toggle function
  const toggleAttendance = (id) => {
    setStaff(prev => prev.map(s => 
      s.id === id ? { ...s, status: s.status === 'Present' ? 'Absent' : 'Present', time: s.status === 'Present' ? '-' : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : s
    ));
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="staff" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Staff Attendance</h2>
            <p className="text-sm text-slate-500">Track shifts and daily check-ins</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all"
          >
            <LogIn size={14} /> Global Check-In
          </button>
        </div>

        {/* Check-In Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-80 shadow-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Quick Check-In</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400"><X size={18}/></button>
              </div>
              <input 
                type="text" 
                placeholder="Enter Staff ID..." 
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" 
              />
              <button 
                onClick={() => { alert(`Checked-in ID: ${staffId}`); setIsModalOpen(false); setStaffId(''); }}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm"
              >
                Confirm Arrival
              </button>
            </div>
          </div>
        )}

        {/* Attendance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <UserCheck size={20} className="text-slate-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{s.name}</h3>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{s.role}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Briefcase size={12} /> Shift
                  </div>
                  <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border shadow-sm">
                    {s.shift}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button 
                    onClick={() => toggleAttendance(s.id)}
                    className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${s.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}
                  >
                    {s.status}
                  </button>
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                    <Clock size={12} /> {s.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}