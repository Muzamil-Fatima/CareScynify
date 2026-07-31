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
  onLogout,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const goToSettings = (tab) => {
    navigate(`/settings/${tab}`);
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-2xl shadow-xl py-2 z-50">
      {/* USER INFO */}
      <div className="px-4 py-3 border-b">
        <p className="text-xs text-purple-600 font-semibold uppercase">
          Signed in as
        </p>
        <p className="text-sm font-bold">{userName}</p>
        <p className="text-xs text-slate-400">{userEmail}</p>
      </div>

      {/* ACTIONS */}
      <div className="p-2 space-y-1">
        <button
          onClick={() => goToSettings("personal")}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded-xl"
        >
          <AccountCircleOutlinedIcon fontSize="small" />
          My Profile
        </button>

        <button
          onClick={() => goToSettings("personal")}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-purple-50 rounded-xl"
        >
          <SettingsOutlinedIcon fontSize="small" />
          Account Settings
        </button>
      </div>

      {/* LOGOUT */}
      <div className="border-t p-2">
        <button
          onClick={() => {
            onClose();
            onLogout?.();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl"
        >
          <LogoutOutlinedIcon fontSize="small" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
