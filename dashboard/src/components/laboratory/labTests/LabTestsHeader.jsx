import React from "react";
import { Search } from "lucide-react";

export default function LabTestsHeader({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">
      <div>
        <h2 className="text-4xl font-bold bg-linear-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
          Tests Management
        </h2>

        <p className="mt-2 text-slate-500">
          Configure laboratory test menu matrix, pricing, and turnaround setup
        </p>
      </div>

      <div className="relative w-full md:w-80">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
        />

        <input
          type="text"
          placeholder="Search test by name, code or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-violet-200 bg-white/80 backdrop-blur-xl py-3 pl-11 pr-4 text-sm text-slate-700 shadow-md outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
        />
      </div>
    </div>
  );
}
