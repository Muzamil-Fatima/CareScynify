import React from "react";

const PendingAppointment = () => {
  return (
    <div className="border border-slate-200 bg-white rounded-2xl p-10 text-center shadow-xl shadow-purple-950/1">
      <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-base font-bold text-slate-800">Pending Verification Queues</h3>
      <p className="text-sm text-slate-400 max-w-sm mx-auto mt-1 font-medium">
        All requests needing temporary slot authentication review gates are listed within this component framework.
      </p>
    </div>
  );
};

export default PendingAppointment;