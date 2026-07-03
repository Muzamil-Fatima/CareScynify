import React from "react";
import { FiCalendar } from "react-icons/fi";

const DateFilterCard = ({ date, setDate }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-8">
      <div className="p-5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <FiCalendar className="text-violet-700 text-xl" />

          <span className="font-semibold text-slate-700">
            Select Active Date Frame
          </span>
        </div>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-50 rounded-xl border border-slate-300 px-4 py-2
            text-slate-700
            font-medium
            outline-none
            focus:border-violet-700"
        />
      </div>
    </div>
  );
};

export default DateFilterCard;