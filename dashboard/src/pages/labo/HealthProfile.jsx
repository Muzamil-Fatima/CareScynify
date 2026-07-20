import React from 'react';
import Sidebar from '../components/Sidebar';
import { User, HeartPulse, FileText, Activity } from 'lucide-react';

export default function HealthProfile() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="patient" />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-black text-slate-900 mb-6">Health Profile</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User className="text-blue-600" /> Personal Details
            </h3>
            <div className="space-y-3 text-slate-600">
              <p><span className="font-bold text-slate-800">Name:</span> Ali Khan</p>
              <p><span className="font-bold text-slate-800">Age:</span> 28</p>
              <p><span className="font-bold text-slate-800">Blood Group:</span> O+</p>
              <p><span className="font-bold text-slate-800">Contact:</span> +92 300 1234567</p>
            </div>
          </div>

          {/* Medical History */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <HeartPulse className="text-blue-600" /> Medical History
            </h3>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>No major allergies</li>
              <li>Past surgery: Appendectomy (2020)</li>
              <li>Current Medication: None</li>
            </ul>
          </div>
        </div>

        {/* Health Stats Card */}
        <div className="mt-6 bg-[#0a1128] p-6 rounded-2xl text-white shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Health Score</h3>
            <p className="text-gray-400 text-sm">Based on your recent lab reports</p>
          </div>
          <div className="text-4xl font-black text-blue-400">98%</div>
        </div>
      </main>
    </div>
  );
}