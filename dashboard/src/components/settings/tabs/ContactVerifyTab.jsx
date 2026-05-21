import React, { useState } from "react";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const ContactVerifyTab = () => {
  const [phoneNumber, setPhoneNumber] = useState("+92 300 1234567");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  return (
    <div className="space-y-6 w-full min-w-0">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Contact Verification</h3>
        <p className="text-xs text-slate-400 mt-0.5">Secure messaging endpoints used for routing urgent critical healthcare metrics and security validation challenges.</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Mobile Number</label>
          <div className="flex gap-2">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isOtpSent}
              className="flex-1 border border-purple-100 bg-slate-50/50 rounded-xl px-4 py-2.5 text-sm outline-hidden focus:border-purple-400 focus:bg-white transition disabled:opacity-60"
            />
            {!isOtpSent && (
              <button 
                onClick={() => setIsOtpSent(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs px-4 rounded-xl transition cursor-pointer"
              >
                Send OTP
              </button>
            )}
          </div>
        </div>

        {isOtpSent && (
          <div className="bg-purple-50/40 border border-purple-100 rounded-2xl p-4 space-y-3">
            <div>
              <p className="text-xs font-bold text-purple-950">Enter Validation OTP Code</p>
              <p className="text-xs text-slate-400 mt-0.5">A verification code has been dispatched to your terminal node.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="••••••"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="bg-white border border-purple-100 rounded-xl px-4 py-2 text-center font-mono tracking-widest text-sm outline-hidden focus:border-purple-400 w-32"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-4 rounded-xl transition cursor-pointer">
                Confirm Code
              </button>
              <button 
                onClick={() => { setIsOtpSent(false); setOtpCode(""); }}
                className="text-slate-400 hover:text-slate-600 font-medium text-xs px-2 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50/50 border border-emerald-100 rounded-xl px-4 py-3 text-xs font-medium">
          <VerifiedOutlinedIcon fontSize="small" />
          Primary security confirmation target verified: Primary Doctor Email Node.
        </div>
      </div>
    </div>
  );
};

export default ContactVerifyTab;