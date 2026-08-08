import React from "react";
import { useNavigate } from "react-router-dom";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const ProfileDropdown = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  userRole,
  onLogout,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const goToSettings = (tab) => {
    navigate(`/settings/${tab}`);
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">

      {/* USER INFO */}
      <div className="px-4 py-3 border-b">
        <p className="text-xs text-gray-500">
          Signed in as
        </p>

        <p className="font-semibold text-gray-800 truncate">
          {userName}
        </p>

        <p className="text-sm text-gray-500 truncate">
          {userEmail}
        </p>
      </div>

      {/* DOCTOR ONLY ACTIONS */}
      {userRole?.toLowerCase() === "doctor" && (
        <div className="p-2 space-y-1">

          {/* My Profile */}
          <button
            onClick={() => goToSettings("personal")}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded-xl text-left"
          >
            <AccountCircleOutlinedIcon fontSize="small" />
            My Profile
          </button>

          {/* Account Settings */}
          <button
            onClick={() => goToSettings("personal")}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded-xl text-left"
          >
            <SettingsOutlinedIcon fontSize="small" />
            Account Settings
          </button>

        </div>
      )}

      {/* LOGOUT */}
      <div className="border-t p-2">
        <button
          onClick={() => {
            onClose();
            onLogout?.();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl text-left"
        >
          <LogoutOutlinedIcon fontSize="small" />
          Sign Out
        </button>
      </div>

    </div>
  );
};

export default ProfileDropdown;