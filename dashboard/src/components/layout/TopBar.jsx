import React, { useState, useRef, useEffect } from "react";
// import { ColorModeContext } from "../theme";
import { useAuth } from "../../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";

// Material UI Icons
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const TopBar = () => {
  // const colorMode = useContext(ColorModeContext);
  const { user, logout } = useAuth() || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fallbacks for user info
  const userName = user?.name || "Dr. Alex Taylor";
  const userEmail = user?.email || "alex.taylor@carescynify.com";

  // Handles closing when clicking anywhere outside of the dropdown container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-md border-b border-purple-50 relative z-30">
      {/* Search Input Bar */}
      <div className="flex items-center bg-slate-50 border border-purple-100/80 rounded-xl px-3 group focus-within:border-purple-400 focus-within:bg-white transition-all duration-200">
        <SearchIcon
          fontSize="small"
          className="text-slate-400 group-focus-within:text-purple-600 transition-colors"
        />
        <input
          type="text"
          placeholder="Search patients, records..."
          className="ml-2 bg-transparent outline-none py-2 text-sm text-slate-700 w-48 md:w-64 placeholder-slate-400"
        />
      </div>

      {/* Action System Buttons */}
      <div className="flex items-center gap-2">
        {/* button */}
        <button className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition relative">
          <NotificationsOutlinedIcon fontSize="small" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile Action Trigger with Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center
              ${
                isDropdownOpen
                  ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }
            `}
          >
            <PersonOutlinedIcon />
          </button>

          {/* Calling your separate profile component here */}
          <ProfileDropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            userName={userName}
            userEmail={userEmail}
            onLogout={logout}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
