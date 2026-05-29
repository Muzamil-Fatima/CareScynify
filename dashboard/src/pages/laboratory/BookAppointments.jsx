import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Calendar, Plus, XCircle, User, Clock } from 'lucide-react';

export default function BookAppointments() {
  // State for appointments list
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'Ali Khan', doctor: 'Dr. Ali', date: '2026-05-30', time: '10:00 AM', status: 'Confirmed' },
  ]);

  // Combined Form State
  const [formData, setFormData] = useState({
    name: '', age: '', phone: '', doctor: '', date: '', time: '', symptoms: ''
  });

  // Combined Function
  const handleBooking = () => {
    if (!formData.name || !formData.phone || !formData.doctor || !formData.date || !formData.time) {
      alert("Please fill all required fields!");
      return;
    }
    
    setAppointments([...appointments, { id: Date.now(), ...formData, status: 'Pending' }]);
    // Reset form
    setFormData({ name: '', age: '', phone: '', doctor: '', date: '', time: '', symptoms: '' });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="patient" />
      
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-black text-slate-900 mb-6">Book Appointment</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit space-y-4">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User className="text-blue-600" size={20} /> Patient Details
            </h3>
            
            <input placeholder="Full Name" className="w-full p-3 bg-slate-50 rounded-xl border" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            
            <div className="flex gap-2">
              <input placeholder="Age" type="number" className="w-1/2 p-3 bg-slate-50 rounded-xl border" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
              <input placeholder="Phone" type="tel" className="w-1/2 p-3 bg-slate-50 rounded-xl border" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            
            <input placeholder="Doctor Name" className="w-full p-3 bg-slate-50 rounded-xl border" value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})} />
            
            <input type="date" className="w-full p-3 bg-slate-50 rounded-xl border" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
            
            <select className="w-full p-3 bg-slate-50 rounded-xl border" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})}>
              <option value="">Select Time Slot</option>
              <option>09:00 AM</option>
              <option>12:00 PM</option>
              <option>04:00 PM</option>
            </select>

            <textarea placeholder="Symptoms / Reason for visit" className="w-full p-3 bg-slate-50 rounded-xl border" rows="3" value={formData.symptoms} onChange={(e) => setFormData({...formData, symptoms: e.target.value})}></textarea>
            
            <button onClick={handleBooking} className="w-full bg-[#0a1128] text-white py-3 rounded-xl font-bold hover:bg-blue-900 transition-all">
              Confirm Booking
            </button>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6">Upcoming Sessions</h3>
            
            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Calendar size={22} /></div>
                    <div>
                      <p className="font-bold text-slate-800">{appt.doctor}</p>
                      <p className="text-xs text-slate-500 font-medium">{appt.name} • {appt.date} • {appt.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {appt.status}
                    </span>
                    <button onClick={() => setAppointments(appointments.filter(a => a.id !== appt.id))} className="text-slate-300 hover:text-red-500">
                      <XCircle size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}