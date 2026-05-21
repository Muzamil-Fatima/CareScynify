import React from "react";

const Buttons = ({ setActiveTab, activeTab }) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* View All Shortcut Indicator */}
      {activeTab === "pending" && (
        <button
          onClick={() => setActiveTab("all")}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 bg-white rounded-xl transition-all duration-150 hover:border-slate-400 hover:bg-slate-50"
        >
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          View All List
        </button>
      )}

      {/* Pending Queue Switch Button */}
      <button
        onClick={() => setActiveTab("pending")}
        className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-150 shadow-sm ${
          activeTab === "pending" 
            ? "bg-amber-700 hover:bg-amber-800" 
            : "bg-[#FF9500] hover:bg-amber-600"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Pending Slots
      </button>

      {/* Create New Dynamic Action Entry */}
      <button
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-xl transition-all duration-150 hover:bg-purple-700 shadow-sm"
      >
        <span className="text-lg leading-none font-bold">+</span>
        <span>New Appointment</span>
      </button>
    </div>
  );
};

export default Buttons;