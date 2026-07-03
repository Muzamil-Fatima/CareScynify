// src/components/pharmacy/MedicineDescription.jsx

import React from "react";

import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAlt";

const MedicineDescription = ({
  formData,
  handleChange,
  handleSubmit,
  handleReset,
  editingMedicine,
  loading = false,
}) => {
  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Additional Information
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Add any notes or extra details about the medicine.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Description
        </label>

        <div className="relative">
          <DescriptionRoundedIcon className="absolute top-4 left-4 text-slate-400" />

          <textarea
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write medicine description, usage, storage instructions, precautions..."
            className="w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 py-3 resize-none outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Preview Card */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Medicine Preview
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Medicine</p>
            <p className="font-semibold text-slate-800">
              {formData.name || "-"}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Generic</p>
            <p className="font-semibold text-slate-800">
              {formData.genericName || "-"}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Category</p>
            <p className="font-semibold text-slate-800">
              {formData.category || "-"}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Strength</p>
            <p className="font-semibold text-slate-800">
              {formData.strength || "-"}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Manufacturer</p>
            <p className="font-semibold text-slate-800">
              {formData.manufacturer || "-"}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Stock</p>
            <p className="font-semibold text-slate-800">
              {formData.stock || 0}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Price</p>
            <p className="font-semibold text-slate-800">
              Rs. {formData.unitPrice || 0}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Expiry</p>
            <p className="font-semibold text-slate-800">
              {formData.expiryDate || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition ${
            editingMedicine
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-violet-600 hover:bg-violet-700"
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {editingMedicine ? "Updating..." : "Adding..."}
            </>
          ) : (
            <>
              {editingMedicine ? <SaveRoundedIcon /> : <AddRoundedIcon />}
              {editingMedicine ? "Update Medicine" : "Add Medicine"}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
        >
          <RestartAltRoundedIcon />
          Reset
        </button>
      </div>
    </div>
  );
};

export default MedicineDescription;