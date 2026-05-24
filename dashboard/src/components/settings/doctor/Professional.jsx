import React, { useState } from "react";
import toast from "react-hot-toast";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";

const ProfessionalTab = () => {
  const [professionalData, setProfessionalData] = useState({
    licenseNumber: "PMDC-98472-M",
    specialization: "Cardiology",
    subSpecialties: "Interventional Cardiology, Heart Failure Specialist",
    experienceYears: "12",
    qualification: "MBBS, FCPS (Cardiology), MD",
    institution: "King Edward Medical University",
    bio: "Dedicated Senior Interventional Cardiologist with over a decade of experience diagnosing and treating complex cardiovascular conditions. Committed to delivering patient-centric evidence-based therapeutic treatments.",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfessionalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Integrated backend database updates go here
    toast.success("Professional clinical profile updated successfully!");
  };

  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Header Info Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BadgeOutlinedIcon className="text-purple-600" />
          Professional Details
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Maintain your certified medical credentials, practice specializations, council licensing numbers, and public biography.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        
        {/* ROW 1: License & Primary Specialization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Medical License */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <WorkspacePremiumOutlinedIcon fontSize="inherit" className="text-slate-400" />
              Medical Council License No.
            </label>
            <input
              type="text"
              name="licenseNumber"
              value={professionalData.licenseNumber}
              onChange={handleInputChange}
              placeholder="e.g. PMDC-XXXXX-M"
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition"
              required
            />
            <p className="text-[10px] text-slate-400">Official medical regulatory board identifier.</p>
          </div>

          {/* Primary Specialization */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Primary Specialization
            </label>
            <select
              name="specialization"
              value={professionalData.specialization}
              onChange={handleInputChange}
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 transition cursor-pointer"
              required
            >
              <option value="General Physician">General Physician</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Gynecology">Gynecology</option>
            </select>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* ROW 2: Sub-Specialties & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Sub Specialties */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Sub-Specialties / Areas of Focus
            </label>
            <input
              type="text"
              name="subSpecialties"
              value={professionalData.subSpecialties}
              onChange={handleInputChange}
              placeholder="e.g. Echocardiography, Pediatric Surgery"
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 transition"
            />
          </div>

          {/* Experience Years */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Years of Experience
            </label>
            <input
              type="number"
              name="experienceYears"
              value={professionalData.experienceYears}
              onChange={handleInputChange}
              placeholder="e.g. 10"
              min="0"
              className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 transition"
              required
            />
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* ROW 3: Educational Background */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <SchoolOutlinedIcon fontSize="small" className="text-slate-400" />
            Education & Academic Background
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Degrees & Certifications</label>
              <input
                type="text"
                name="qualification"
                value={professionalData.qualification}
                onChange={handleInputChange}
                placeholder="e.g. MBBS, FCPS, MD"
                className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-purple-600 transition"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Alma Mater / Medical School Institution</label>
              <input
                type="text"
                name="institution"
                value={professionalData.institution}
                onChange={handleInputChange}
                placeholder="e.g. Medical University Institute"
                className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-purple-600 transition"
                required
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* ROW 4: Public Bio Statement */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <HistoryEduOutlinedIcon fontSize="inherit" className="text-slate-400" />
            Professional Profile Bio
          </label>
          <textarea
            name="bio"
            value={professionalData.bio}
            onChange={handleInputChange}
            rows={4}
            placeholder="Write a summary about your medical practice, philosophy, and expertise for your patient booking interface..."
            className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition resize-none"
            maxLength={400}
          />
          <div className="flex justify-between items-center text-[11px] text-slate-400 px-1">
            <span>Provide a summary of your medical career background.</span>
            <span>{professionalData.bio.length}/400 characters</span>
          </div>
        </div>

        {/* SUBMIT FORM ACTIONS */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
          >
            Save Professional Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalTab;