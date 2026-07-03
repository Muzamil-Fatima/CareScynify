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

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 hover:border-violet-400 hover:shadow-sm focus:border-violet-600 focus:ring-4 focus:ring-violet-100";

const iconClass =
  "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 pointer-events-none";

const MedicineBasicInfo = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the medicine's general information.
        </p>
      </div>

      {/* Medicine Name */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Medicine Name <span className="text-red-500">*</span>
        </label>

        <div className="group relative">
          <MedicationRoundedIcon className={iconClass} />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Paracetamol"
            className={`${inputClass} group-focus-within:border-violet-600`}
          />
        </div>
      </div>

      {/* Generic Name */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Generic Name
        </label>

        <div className="group relative">
          <ScienceRoundedIcon className={iconClass} />

          <input
            type="text"
            name="genericName"
            value={formData.genericName}
            onChange={handleChange}
            placeholder="Acetaminophen"
            className={inputClass}
          />
        </div>
      </div>

      {/* Brand */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Brand
        </label>

        <div className="group relative">
          <LocalPharmacyRoundedIcon className={iconClass} />

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Panadol"
            className={inputClass}
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Category <span className="text-red-500">*</span>
        </label>

        <div className="group relative">
          <CategoryRoundedIcon className={iconClass} />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`${inputClass} appearance-none cursor-pointer`}
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
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Strength <span className="text-red-500">*</span>
        </label>

        <div className="group relative">
          <FitnessCenterRoundedIcon className={iconClass} />

          <input
            type="text"
            name="strength"
            value={formData.strength}
            onChange={handleChange}
            placeholder="500 mg"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicineBasicInfo;