import React from "react";

const Toggle = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between items-center px-5 py-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-sm shadow-purple-950/1">
      <div>
        <h4 className="text-sm font-bold text-slate-700 tracking-wide uppercase">
          {activeTab === "grid" 
            ? "Calendar Schedule View" 
            : activeTab === "pending" 
            ? "Pending Approval Logs" 
            : "Tabular Ledger Grid"}
        </h4>
      </div>

      {/* Segmented Vector Controls Box */}
      <div className="flex bg-slate-50 border border-slate-200/60 p-1 rounded-xl">
        {/* Tabular Row view option */}
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
            activeTab === "all"
              ? "bg-white text-purple-700 shadow-sm border border-purple-100"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Row Feed
        </button>

        {/* Large Grid Calendar variant */}
        <button
          onClick={() => setActiveTab("grid")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
            activeTab === "grid"
              ? "bg-white text-purple-700 shadow-sm border border-purple-100"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Large Calendar
        </button>
      </div>
    </div>
  );
};

export default Toggle;