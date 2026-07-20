import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const MyProfile = () => {
  // Doctor ki profile state
  const [profile, setProfile] = useState({
    name: 'Dr. Rizwan Hussain',
    specialization: 'General Physician - MBBS, FCPS',
    regNo: 'PMDC-29847',
    phone: '+92 300 1234567',
    email: 'dr.rizwan@carescynify.pk',
    experience: '12 Years'
  });

  // Clinic Settings state
  const [settings, setSettings] = useState({
    name: 'CareScynify Clinic',
    address: 'Main Bazaar, Narowal, Punjab',
    openTime: '09:00',
    closeTime: '18:00',
    fee: '500'
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('Clinic settings updated successfully!');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="doctor" />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">My Profile</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doctor Info Card */}
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <div className="bg-blue-500 text-white p-6 rounded-xl mb-6">
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-blue-100">{profile.specialization}</p>
              <div className="flex gap-2 mt-3">
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">VERIFIED</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">ACTIVE</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-6 text-sm">
              {[ 
                {l: 'REG. NO.', v: profile.regNo}, 
                {l: 'PHONE', v: profile.phone}, 
                {l: 'EMAIL', v: profile.email}, 
                {l: 'EXPERIENCE', v: profile.experience} 
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-gray-400 font-bold text-[10px] uppercase mb-1">{item.l}</p>
                  <p className="font-semibold text-slate-800">{item.v}</p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 mt-8">
              <button className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">Edit Profile</button>
              <button className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Change Password</button>
            </div>
          </div>

          {/* Clinic Settings Form */}
          <form onSubmit={handleSaveSettings} className="bg-white p-8 rounded-2xl border shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Clinic Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">CLINIC NAME</label>
                <input type="text" value={settings.name} onChange={(e) => setSettings({...settings, name: e.target.value})} className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">ADDRESS</label>
                <input type="text" value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})} className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">OPENING TIME</label>
                  <input type="time" value={settings.openTime} onChange={(e) => setSettings({...settings, openTime: e.target.value})} className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">CLOSING TIME</label>
                  <input type="time" value={settings.closeTime} onChange={(e) => setSettings({...settings, closeTime: e.target.value})} className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1">CONSULTATION FEE (PKR)</label>
                <input type="number" value={settings.fee} onChange={(e) => setSettings({...settings, fee: e.target.value})} className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            
            <button type="submit" className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Save Settings
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;