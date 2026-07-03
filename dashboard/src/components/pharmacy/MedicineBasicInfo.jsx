// src/components/pharmacy/MedicineBasicInfo.jsx

import React from "react";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";

const categories = [
  "Tablet",
  "Capsule",
  "Syrup",
  "Injection",
  "Cream",
  "Ointment",
  "Drops",
  "Inhaler",
  "Powder",
  "Other",
];

const MedicineBasicInfo = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Basic Information
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Enter the medicine's general information.
        </p>
      </div>

      {/* Medicine Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Medicine Name <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <MedicationRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Paracetamol"
            className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Generic Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Generic Name
        </label>

        <div className="relative">
          <ScienceRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            name="genericName"
            value={formData.genericName}
            onChange={handleChange}
            placeholder="Acetaminophen"
            className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Brand
        </label>

        <div className="relative">
          <LocalPharmacyRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Panadol"
            className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <CategoryRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Strength */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Strength <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <FitnessCenterRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            name="strength"
            value={formData.strength}
            onChange={handleChange}
            placeholder="500 mg"
            className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default MedicineBasicInfo;