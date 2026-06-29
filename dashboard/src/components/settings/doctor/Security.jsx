import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { toggleTwoFactor, changePassword } from "../../../api/authApi";
import { toast } from "react-toastify";
const Security = () => {
  // PASSWORD VISIBILITY STATES
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { user, updateUser } = useAuth();

  const [twoFactor, setTwoFactor] = useState(user?.twoFactorEnabled || false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        return toast("Passwords do not match");
      }

      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast("Password updated successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast(error.response?.data?.message || "Failed to update password");
    }
  };
  const handleToggle2FA = async () => {
    try {
      const res = await toggleTwoFactor();

      setTwoFactor(res.twoFactorEnabled);

      updateUser({
        twoFactorEnabled: res.twoFactorEnabled,
      });
    } catch (error) {
      console.log(error);
    }
  };
console.log("USER:", user);
console.log("2FA:", user?.twoFactorEnabled);
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
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2 text-sm pr-10 outline-none focus:border-purple-500 focus:bg-white transition"
                type={showCurrent ? "text" : "password"}
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
                onClick={() => setShowCurrent(!showCurrent)}
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
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2 text-sm pr-10 outline-none focus:border-purple-500 focus:bg-white transition"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
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
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
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
            <button
              onClick={handleChangePassword}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl py-2 transition"
            >
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
            <span className="text-gray-700 text-sm">Enable 2FA</span>

            <button
              onClick={handleToggle2FA}
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
