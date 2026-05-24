import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Security = () => {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-6 w-full min-w-0">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Security Parameters</h3>
        <p className="text-xs text-slate-400 mt-0.5">Enforce system parameters to shield delicate patient healthcare workflows and diagnostic data.</p>
      </div>

      <div className="max-w-xl space-y-4 pb-6 border-b border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Modify Account Password</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="border border-purple-100 bg-slate-50/50 rounded-xl px-4 py-2 text-sm outline-hidden focus:border-purple-400 focus:bg-white transition"
          />
          <input
            type="password"
            placeholder="New Password"
            className="border border-purple-100 bg-slate-50/50 rounded-xl px-4 py-2 text-sm outline-hidden focus:border-purple-400 focus:bg-white transition"
          />
          <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition py-2 px-3 cursor-pointer">
            Update Cipher
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between max-w-xl bg-slate-50/40 border border-purple-100/60 rounded-2xl p-4">
        <div className="flex gap-3 items-start pr-4">
          <LockOutlinedIcon className="text-purple-600 mt-0.5 shrink-0" fontSize="small" />
          <div>
            <p className="text-sm font-bold text-slate-800">Two-Factor Authenticator (2FA)</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Requests a security code from your phone token during access checks.</p>
          </div>
        </div>
        
        <button
          onClick={() => setTwoFactor(!twoFactor)}
          className={`w-11 h-6 rounded-full relative p-0.5 transition-colors duration-200 outline-hidden shrink-0 cursor-pointer
            ${twoFactor ? "bg-purple-600" : "bg-slate-200"}`}
        >
          <span className={`w-5 h-5 bg-white rounded-full block shadow-xs transition-transform duration-200
            ${twoFactor ? "translate-x-5" : "translate-x-0"}`} 
          />
        </button>
      </div>
    </div>
  );
};

export default Security;