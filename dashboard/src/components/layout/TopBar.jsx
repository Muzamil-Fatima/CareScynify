import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import GlobalSearch from "./GlobalSearch";
import useGlobalSearch from "../../hooks/doctor/useGlobalSearch";
import { useGlobalSearchContext } from "../../context/doctor/GlobalSearchContext";
import NotificationBell from "../notification/NotificationBell";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NotificationDrawer from "../notification/NotificationDrawer";
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      window.location.href =
        import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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
      {/* RIGHT SIDE ACTIONS */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <NotificationBell />
          <NotificationDrawer />
        </div>

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
            onLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
