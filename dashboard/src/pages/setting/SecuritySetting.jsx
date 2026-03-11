import React, { useState } from "react";

const SecuritySetting = () => {
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurity({ ...security, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = () => {
    alert("Security settings updated!");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Security Settings</h2>

        {/* Password Change */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <div className="space-y-4">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={security.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={security.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={security.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Two-Factor Authentication (2FA)</h3>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="twoFactor"
              checked={security.twoFactor}
              onChange={handleChange}
              className="h-5 w-5 text-blue-500"
            />
            <span className="text-gray-700">Enable Two-Factor Authentication</span>
          </label>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Recent Login Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Date & Time</th>
                  <th className="py-2 px-4 border-b">Location / IP</th>
                  <th className="py-2 px-4 border-b">Device</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">2026-03-11 09:45 AM</td>
                  <td className="py-2 px-4 border-b">Gujranwala, PK (192.168.1.10)</td>
                  <td className="py-2 px-4 border-b">Chrome - Windows 10</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">2026-03-10 05:30 PM</td>
                  <td className="py-2 px-4 border-b">Lahore, PK (192.168.1.15)</td>
                  <td className="py-2 px-4 border-b">Firefox - MacOS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySetting;