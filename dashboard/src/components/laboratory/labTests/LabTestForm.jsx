import React from "react";
import { FlaskConical, PlusCircle, Save } from "lucide-react";

export default function LabTestForm({
  formData,
  handleInputChange,
  handleFormSubmit,
  selectedTest,
}) {
  return (
    <div className="lg:col-span-1 rounded-3xl border border-violet-100 bg-white/80 backdrop-blur-xl p-6 shadow-xl h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100">
          <FlaskConical className="text-violet-600" size={20} />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-800">
            {selectedTest ? "Update Test Profile" : "Add Test Profile"}
          </h3>

          <p className="text-xs text-slate-500">
            {selectedTest
              ? "Update laboratory test profile"
              : "Create laboratory test profile"}
          </p>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Test Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Liver Function Test (LFT)"
            className="w-full px-4 py-3 bg-violet-50/60 border border-violet-200 rounded-2xl text-sm font-medium text-slate-700 outline-none transition-all duration-300 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Category Group
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-violet-50/60 border border-violet-200 rounded-2xl text-sm font-medium text-slate-700 cursor-pointer outline-none transition-all duration-300 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          >
            <option value="Biochemistry">Biochemistry</option>
            <option value="Hematology">Hematology</option>
            <option value="Microbiology">Microbiology</option>
            <option value="Endocrinology">Endocrinology</option>
            <option value="Serology">Serology</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Price (Rs.)
          </label>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-violet-500 font-semibold text-sm">
              Rs
            </span>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g. 1500"
              className="w-full pl-11 pr-4 py-3 bg-violet-50/60 border border-violet-200 rounded-2xl text-sm font-medium text-slate-700 outline-none transition-all duration-300 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Turnaround Time (TAT)
          </label>

          <input
            type="text"
            name="turnAround"
            value={formData.turnAround}
            onChange={handleInputChange}
            placeholder="e.g. 3 Hours, 12 Hours"
            className="w-full px-4 py-3 bg-violet-50/60 border border-violet-200 rounded-2xl text-sm font-medium text-slate-700 outline-none transition-all duration-300 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-3 px-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        >
          {selectedTest ? <Save size={16} /> : <PlusCircle size={16} />}

          <span>
            {selectedTest ? "Update Test Profile" : "Create Test Profile"}
          </span>
        </button>
      </form>
    </div>
  );
}
