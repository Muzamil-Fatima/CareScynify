// src/components/pharmacy/MedicinePricing.jsx

import React from "react";

import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 hover:border-violet-400 hover:shadow-sm focus:border-violet-600 focus:ring-4 focus:ring-violet-100";

const iconClass =
  "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors duration-300";

const MedicinePricing = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Inventory & Pricing
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter stock, pricing and expiry information.
        </p>
      </div>

      {/* Manufacturer */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Manufacturer
        </label>

        <div className="group relative">
          <BusinessRoundedIcon className={iconClass} />

          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="e.g. GSK, Getz Pharma"
            className={inputClass}
          />
        </div>
      </div>

      {/* Stock & Price */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Stock */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Stock <span className="text-red-500">*</span>
          </label>

          <div className="group relative">
            <Inventory2RoundedIcon className={iconClass} />

            <input
              type="number"
              min="0"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="100"
              className={inputClass}
            />
          </div>
        </div>

        {/* Unit Price */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Unit Price (Rs.) <span className="text-red-500">*</span>
          </label>

          <div className="group relative">
            <CurrencyRupeeRoundedIcon className={iconClass} />

            <input
              type="number"
              min="0"
              step="0.01"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              placeholder="50"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Expiry Date */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Expiry Date <span className="text-red-500">*</span>
        </label>

        <div className="group relative">
          <EventRoundedIcon className={iconClass} />

          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="rounded-2xl border border-violet-200 bg-linear-to-r from-violet-50 to-indigo-50 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-violet-700">
          Inventory Summary
        </h3>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Current Stock</p>

            <p className="mt-2 text-2xl font-bold text-slate-800">
              {formData.stock || 0}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Unit Price</p>

            <p className="mt-2 text-2xl font-bold text-violet-700">
              Rs. {formData.unitPrice || 0}
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm sm:col-span-2">
            <p className="text-sm text-slate-500">Expiry Date</p>

            <p className="mt-2 font-semibold text-slate-800">
              {formData.expiryDate || "Not selected"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicinePricing;