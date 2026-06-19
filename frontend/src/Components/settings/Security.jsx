import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const Security = () => {
  // PASSWORD VISIBILITY STATES
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 2FA STATE
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Security Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account security and authentication preferences
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* CHANGE PASSWORD */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center gap-2 mb-4">
            <LockOutlinedIcon className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Change Password
            </h2>
          </div>

          <div className="space-y-3">

            {/* CURRENT PASSWORD */}
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Current Password"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2 text-sm pr-10 outline-none focus:border-purple-500 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
              >
                {showCurrent ? (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>

            {/* NEW PASSWORD */}
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2 text-sm pr-10 outline-none focus:border-purple-500 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
              >
                {showNew ? (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2 text-sm pr-10 outline-none focus:border-purple-500 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
              >
                {showConfirm ? (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>

            {/* BUTTON */}
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl py-2 transition">
              Update Password
            </button>

          </div>
        </div>

        {/* TWO FACTOR AUTH */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center gap-2 mb-4">
            <LockOutlinedIcon className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Two-Factor Authentication
            </h2>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Add an extra layer of security to your account login process.
          </p>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 text-sm">
              Enable 2FA
            </span>

            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-12 h-6 rounded-full relative p-0.5 transition-colors duration-200 cursor-pointer
                ${twoFactor ? "bg-purple-600" : "bg-gray-300"}`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full block shadow-sm transition-transform duration-200
                ${twoFactor ? "translate-x-6" : "translate-x-0"}`}
              />
            </button>
          </div>
        </div>

      </div>

      {/* SECURITY TIPS */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Security Tips
        </h2>

        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Use a strong password with letters, numbers & symbols</li>
          <li>• Never share your login credentials</li>
          <li>• Enable 2FA for better protection</li>
          <li>• Regularly update your password</li>
        </ul>

      </div>

    </div>
  );
};

export default Security;