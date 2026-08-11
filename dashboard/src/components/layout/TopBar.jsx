
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import GlobalSearch from "./GlobalSearch";
import useGlobalSearch from "../../hooks/doctor/useGlobalSearch";
import { useGlobalSearchContext } from "../../context/doctor/GlobalSearchContext";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const TopBar = () => {
  const { user, logout } = useAuth() || {};

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const location = useLocation();

  const userRole = user?.role;

  const userName = user?.name || "Dr. Alex Taylor";
  const userEmail = user?.email || "alex.taylor@carescynify.com";

  // Search configuration
  const searchConfig = useGlobalSearch();

  // Global search state
  const { searchValue, setSearchValue } = useGlobalSearchContext();

  // Pages where search bar should appear
  const searchablePages = [
    "/doctor/schedule",
    "/doctor/appointments",
    "/patients",
    "/doctor/reviews",
  ];

  const showSearch =
    userRole?.toLowerCase() === "doctor" &&
    searchablePages.includes(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="
        flex
        justify-between
        items-center
        p-4
        bg-white/80
        backdrop-blur-md
        border-b
        border-purple-50
        relative
        z-30
      "
    >
      {/* LEFT SIDE — SEARCH ONLY ON SELECTED PAGES */}
      {showSearch && searchConfig && (
        <GlobalSearch
          value={searchValue}
          onChange={setSearchValue}
          placeholder={searchConfig.placeholder}
        />
      )}

      {/* RIGHT SIDE ACTIONS */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <button
          type="button"
          className="
            p-2
            text-slate-500
            hover:text-purple-600
            hover:bg-purple-50
            rounded-xl
            transition
            relative
          "
        >
          <NotificationsOutlinedIcon fontSize="small" />

          <span
            className="
              absolute
              top-2
              right-2
              w-2
              h-2
              bg-pink-500
              rounded-full
              ring-2
              ring-white
            "
          />
        </button>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`
              p-2
              rounded-xl
              transition-all
              duration-200
              flex
              items-center
              justify-center
              ${
                isDropdownOpen
                  ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }
            `}
          >
            <PersonOutlinedIcon />
          </button>

          <ProfileDropdown
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
            userName={userName}
            userEmail={userEmail}
            userRole={userRole}
            onLogout={logout}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
