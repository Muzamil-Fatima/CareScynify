import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Lock, Building, Bell, ShieldCheck } from 'lucide-react';

export default function LabSettings() {  // <-- 'default' ka hona laazmi hai
  // 1. Profile State Framework
  const [labDetails, setLabDetails] = useState({
    labName: 'CareScynify Diagnostics Ltd.',
    phone: '0544-123456',
    email: 'info@carescynify.com',
    address: 'Main GT Road, Faisalabad, Pakistan',
    prefix: 'CS-LAB'
  });

  // 2. Security / Password State
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 3. Notification Toggles State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsReceipts: false,
    autoBackup: true
  });

  // Input Handlers
  const handleLabChange = (e) => setLabDetails({ ...labDetails, [e.target.name]: e.target.value });
  const handleSecurityChange = (e) => setSecurity({ ...security, [e.target.name]: e.target.value });

  // Form Submit Handlers
  const saveLabProfile = (e) => {
    e.preventDefault();
    alert("Laboratory profile settings saved successfully!");
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Administrative credential password updated successfully!");
    setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans antialiased">
      

      {/* SETTINGS WORKSPACE */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Top Header Segment */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            System Control Configurations
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Tune clinical business profiles, portal security access keys, and background tasks</p>
        </div>

        {/* Master Double Section Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Lab Profile Customizations */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <div className="flex items-center space-x-2.5 mb-5 text-blue-600">
              <Building size={20} />
              <h3 className="text-base font-bold text-slate-800">Laboratory Business Metas</h3>
            </div>
            
            <form onSubmit={saveLabProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Official Institution Name</label>
                <input 
                  type="text" name="labName" value={labDetails.labName} onChange={handleLabChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Helpline Phone</label>
                  <input 
                    type="text" name="phone" value={labDetails.phone} onChange={handleLabChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Invoice Code Prefix</label>
                  <input 
                    type="text" name="prefix" value={labDetails.prefix} onChange={handleLabChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Corporate Email Address</label>
                <input 
                  type="email" name="email" value={labDetails.email} onChange={handleLabChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Physical Postal Address (For Reports Footer)</label>
                <textarea 
                  name="address" rows="2" value={labDetails.address} onChange={handleLabChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium resize-none"
                ></textarea>
              </div>

              <button type="submit" className="bg-[#0a1128] hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2">
                <Save size={14} />
                <span>Save Branding Meta</span>
              </button>
            </form>
          </div>

          {/* Right Column: Security Keys & System Switches */}
          <div className="space-y-8">
            
            {/* Security Component Block */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-5 text-red-500">
                <Lock size={20} />
                <h3 className="text-base font-bold text-slate-800">Administrative Gatekeeper Access</h3>
              </div>
              
              <form onSubmit={updatePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Current Secret Password</label>
                  <input 
                    type="password" name="currentPassword" value={security.currentPassword} onChange={handleSecurityChange} placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">New Fresh Key</label>
                    <input 
                      type="password" name="newPassword" value={security.newPassword} onChange={handleSecurityChange} placeholder="Min 8 chars"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Verify New Key</label>
                    <input 
                      type="password" name="confirmPassword" value={security.confirmPassword} onChange={handleSecurityChange} placeholder="Repeat key"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2">
                  <ShieldCheck size={14} />
                  <span>Deploy New Key Token</span>
                </button>
              </form>
            </div>

            {/* Quick Automation Toggles Component */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-4 text-emerald-600">
                <Bell size={20} />
                <h3 className="text-base font-bold text-slate-800">Automated Webhook Systems</h3>
              </div>
              
              <div className="space-y-3.5 pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">Automated Patient Email Sync</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Dispatches digital copies of verified reports directly to patient mailboxes</p>
                  </div>
                  <input type="checkbox" checked={notifications.emailAlerts} onChange={() => setNotifications({...notifications, emailAlerts: !notifications.emailAlerts})} className="w-4 h-4 cursor-pointer accent-blue-600" />
                </div>

                <hr className="border-slate-100" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">SMS Transaction Receipt Alert</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Pushes SMS alerts on client mobile network gateway during transaction entry</p>
                  </div>
                  <input type="checkbox" checked={notifications.smsReceipts} onChange={() => setNotifications({...notifications, smsReceipts: !notifications.smsReceipts})} className="w-4 h-4 cursor-pointer accent-blue-600" />
                </div>

                <hr className="border-slate-100" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-700">Secure Database Auto-Backup</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Saves secure cloud binary archives every 24 hours automatically</p>
                  </div>
                  <input type="checkbox" checked={notifications.autoBackup} onChange={() => setNotifications({...notifications, autoBackup: !notifications.autoBackup})} className="w-4 h-4 cursor-pointer accent-blue-600" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}