import React, { useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="p-6">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Account Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PROFILE SETTINGS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center gap-2 mb-4">
            <SettingsOutlinedIcon className="text-purple-600" />
            <h2 className="text-lg font-semibold">Profile Settings</h2>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <p>Update personal information from Profile page.</p>

            <button className="text-purple-600 font-medium hover:underline">
              Go to Profile →
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center gap-2 mb-4">
            <NotificationsActiveOutlinedIcon className="text-purple-600" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">

            <div className="flex justify-between items-center">
              <span className="text-gray-700">Email Notifications</span>
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={() => setEmailNotif(!emailNotif)}
                className="w-5 h-5 accent-purple-600"
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700">SMS Notifications</span>
              <input
                type="checkbox"
                checked={smsNotif}
                onChange={() => setSmsNotif(!smsNotif)}
                className="w-5 h-5 accent-purple-600"
              />
            </div>

          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

          <div className="flex items-center gap-2 mb-4">
            <LockOutlinedIcon className="text-purple-600" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>

          <div className="space-y-3 text-sm">

            <button className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
              <VisibilityOutlinedIcon fontSize="small" />
              Change Password
            </button>

            <button className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
              Two-Factor Authentication
            </button>

          </div>
        </div>

        {/* PRIVACY */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">

          <h2 className="text-lg font-semibold mb-3">Privacy</h2>

          <p className="text-sm text-gray-600 mb-4">
            Control how your medical data is shared with doctors and clinics.
          </p>

          <button className="text-purple-600 font-medium hover:underline">
            Manage Privacy Settings →
          </button>
        </div>

      </div>

      {/* DANGER ZONE */}
      <div className="mt-8 bg-white p-5 rounded-2xl border border-red-200">

        <h2 className="text-lg font-semibold text-red-600 mb-3">
          Danger Zone
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Once you delete your account, it cannot be recovered.
        </p>

        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
          <LogoutOutlinedIcon fontSize="small" />
          Delete Account
        </button>

      </div>
    </div>
  );
};

export default Settings;