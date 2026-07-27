import React from "react";
import { UserPlus } from "lucide-react";

export default function LabPatientForm({
  formData,
  handleInputChange,
  handleFormSubmit,
}) {
  return (
    <div className="rounded-3xl border border-violet-100 bg-white/80 backdrop-blur-xl shadow-xl p-7 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-violet-100 flex items-center justify-center">
          <UserPlus className="text-violet-600" size={20} />
        </div>

        <div>
          <h3 className="font-bold text-slate-800">New Patient Entry</h3>

          <p className="text-xs text-slate-500">Register laboratory patient</p>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Muhammad Ali"
            className="w-full rounded-2xl border border-violet-200 bg-violet-50/50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              className="w-full rounded-2xl border border-violet-200 bg-violet-50/50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-violet-200 bg-violet-50/50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Contact Number
          </label>

          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="03001234567"
            className="w-full rounded-2xl border border-violet-200 bg-violet-50/50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Assigned Test
          </label>

          <input
            type="text"
            name="tests"
            value={formData.tests}
            onChange={handleInputChange}
            placeholder="Blood CBC"
            className="w-full rounded-2xl border border-violet-200 bg-violet-50/50 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <UserPlus size={17} />
          Register Patient
        </button>
      </form>
    </div>
  );
}
