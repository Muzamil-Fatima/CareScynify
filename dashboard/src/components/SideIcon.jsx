import React from "react";
import Profile from "./Profile";
import { FaBell } from "react-icons/fa";

const SideIcon = () => {
  return (
    <div className="fixed top-4 right-6 md:right-8 flex items-center space-x-3 z-50">
      <div className="relative cursor-pointer">
        <FaBell size={22} />
        {/* Notification count badge */}
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          3
        </span>
      </div>
      <Profile />
    </div>
  );
};

export default SideIcon;
