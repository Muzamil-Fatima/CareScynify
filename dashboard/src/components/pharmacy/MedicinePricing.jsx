// src/components/pharmacy/MedicinePricing.jsx

import React from "react";

import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";

const MedicinePricing = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Inventory & Pricing
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Enter stock, pricing and expiry information.
        </p>
      </div>

      {/* Manufacturer */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Manufacturer
        </label>

        <div className="relative">
          <BusinessRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="e.g. GSK, Getz Pharma"
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Stock & Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Stock */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Stock <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <Inventory2RoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="number"
              min="0"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="100"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Unit Price */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Unit Price (Rs.) <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <CurrencyRupeeRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="number"
              min="0"
              step="0.01"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              placeholder="50"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Expiry Date */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Expiry Date <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <EventRoundedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
        <h3 className="text-sm font-semibold text-indigo-700">
          Inventory Summary
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Current Stock</p>
            <p className="mt-1 text-xl font-bold text-slate-800">
              {formData.stock || 0}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Unit Price</p>
            <p className="mt-1 text-xl font-bold text-slate-800">
              Rs. {formData.unitPrice || 0}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-slate-500">Expiry</p>
            <p className="mt-1 font-semibold text-slate-800">
              {formData.expiryDate || "Not selected"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicinePricing;