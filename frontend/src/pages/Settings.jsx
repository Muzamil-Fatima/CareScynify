import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { deleteAccount } from "../api/authApi";
const Settings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { logout } = useContext(AuthContext);
  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();

      toast.success("Account deleted successfully");

      logout();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    }
  };
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

            <Link
              to="/profile"
              className="text-purple-600 font-medium hover:underline cursor-pointer"
            >
              Go to Profile →
            </Link>
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
            <NavLink
              to="/security"
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600"
            >
              <VisibilityOutlinedIcon fontSize="small" />
              Change Password
            </NavLink>

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
        <h2 className="text-lg font-semibold text-red-600 mb-3">Danger Zone</h2>

        <p className="text-sm text-gray-600 mb-4">
          Once you delete your account, it cannot be recovered.
        </p>

        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
          <LogoutOutlinedIcon fontSize="small" />
          Delete Account
        </button>
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Account
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>

              <div className="flex justify-end gap-3">
                {/* NO BUTTON */}
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  No
                </button>

                {/* YES BUTTON */}
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  <LogoutOutlinedIcon fontSize="small" />
                  Delete Account
                </button>
                {showDeleteModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
                      <h2 className="text-lg font-semibold mb-2">
                        Delete Account
                      </h2>

                      <p className="text-sm text-gray-600 mb-6">
                        This action cannot be undone.
                      </p>

                      <div className="flex justify-end gap-3">
                        {/* NO */}
                        <button
                          onClick={() => setShowDeleteModal(false)}
                          className="px-4 py-2 bg-gray-200 rounded-lg"
                        >
                          No
                        </button>

                        {/* YES */}
                        <button
                          onClick={handleDeleteAccount} // ✅ FIX HERE
                          className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        >
                          Yes, Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
