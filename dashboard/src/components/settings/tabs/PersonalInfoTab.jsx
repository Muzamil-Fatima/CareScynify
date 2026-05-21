import React, { useState } from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const PersonalInfoTab = () => {
  const [formData, setFormData] = useState({
    fullName: "Dr. Alex Taylor",
    specialization: "Cardiologist & AI Health Specialist",
    licenseNumber: "MD-98421-PMDC",
    hospitalAffiliation: "CareScynify General Clinic",
    biography: "Dedicated cardiology consultant specializing in continuous digital patient tracking metrics and remote diagnostic assistance architectures."
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 w-full min-w-0">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
        <p className="text-xs text-slate-400 mt-0.5">Update public profiling metadata displayed across global patient channels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Legal Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="border border-purple-100 bg-slate-50/50 rounded-xl px-4 py-2.5 text-sm outline-hidden focus:border-purple-400 focus:bg-white transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Clinical Specialization</label>
          <input
            type="text"
            value={formData.specialization}
            onChange={(e) => setFormData({...formData, specialization: e.target.value})}
            className="border border-purple-100 bg-slate-50/50 rounded-xl px-4 py-2.5 text-sm outline-hidden focus:border-purple-400 focus:bg-white transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medical License ID</label>
          <input
            type="text"
            value={formData.licenseNumber}
            className="border border-purple-100 bg-purple-50/40 text-purple-700 font-mono rounded-xl px-4 py-2.5 text-sm outline-hidden cursor-not-allowed"
            disabled
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Hospital Branch</label>
          <input
            type="text"
            value={formData.hospitalAffiliation}
            onChange={(e) => setFormData({...formData, hospitalAffiliation: e.target.value})}
            className="border border-purple-100 bg-slate-50/50 rounded-xl px-4 py-2.5 text-sm outline-hidden focus:border-purple-400 focus:bg-white transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Professional Profile Biography</label>
        <textarea
          rows={4}
          value={formData.biography}
          onChange={(e) => setFormData({...formData, biography: e.target.value})}
          className="border border-purple-100 bg-slate-50/50 rounded-xl p-4 text-sm outline-hidden focus:border-purple-400 focus:bg-white transition resize-none leading-relaxed"
        />
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button type="submit" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-xs transition duration-150 cursor-pointer">
          <SaveOutlinedIcon fontSize="small" /> Save Details
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoTab;