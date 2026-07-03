import React from "react";
import { FiPlus } from "react-icons/fi";

const ScheduleHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 mt-1">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          My Schedule
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage timeline shifts, consultation time configurations, and
          patient list slots.
        </p>
      </div>

      <button className="bg-violet-700 hover:bg-violet-800 text-white px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition">
        <FiPlus />
        Add Schedule Slot
      </button>
    </div>
  );
};

export default ScheduleHeader;