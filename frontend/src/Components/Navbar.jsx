import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useAuth } from "../hooks/useAuth.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const { user } = useAuth();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dynamic Doctor / Clinic / Hospital title
  const doctorMenu = {
    doctor: {
      label: "Doctor",
      icon: <MedicalServicesOutlinedIcon fontSize="small" />,
    },
    clinic: {
      label: "Clinic",
      icon: <BusinessOutlinedIcon fontSize="small" />,
    },
    hospital: {
      label: "Hospital",
      icon: <LocalHospitalOutlinedIcon fontSize="small" />,
    },
  };

  const currentSection = location.pathname.includes("/clinic")
    ? doctorMenu.clinic
    : location.pathname.includes("/hospital")
      ? doctorMenu.hospital
      : doctorMenu.doctor;

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-purple-100 text-purple-700 font-medium"
        : "text-gray-700 hover:bg-gray-100 hover:text-purple-700"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          CareScynify
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-2 font-medium text-sm">
          {/* Doctor Dropdown */}
          <li
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                location.pathname.includes("/doctor") ||
                location.pathname.includes("/clinic") ||
                location.pathname.includes("/hospital")
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-purple-700"
              }`}
            >
              {currentSection.icon}
              {currentSection.label}

              <KeyboardArrowDownOutlinedIcon
                fontSize="small"
                className={`transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full pt-1 z-50">
                <div className="w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
                  <NavLink
                    to="/doctor"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <MedicalServicesOutlinedIcon fontSize="small" />
                    Doctors
                  </NavLink>

                  <NavLink
                    to="/clinic"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <BusinessOutlinedIcon fontSize="small" />
                    Clinics
                  </NavLink>

                  <NavLink
                    to="/hospital"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LocalHospitalOutlinedIcon fontSize="small" />
                    Hospitals
                  </NavLink>
                </div>
              </div>
            )}
          </li>

          {/* Laboratory */}
          <li>
            <NavLink to="/laboratory" className={navItemClass}>
              <ScienceOutlinedIcon fontSize="small" />
              Laboratory
            </NavLink>
          </li>

          {/* Pharmacy */}
          <li>
            <NavLink to="/pharmacy" className={navItemClass}>
              <LocalPharmacyOutlinedIcon fontSize="small" />
              Pharmacy
            </NavLink>
          </li>

          {/* Appointment */}
          <li>
            <NavLink to="/appointments" className={navItemClass}>
              <EventAvailableOutlinedIcon fontSize="small" />
              Appointment
            </NavLink>
          </li>

          {/* About */}
          <li>
            <NavLink to="/about" className={navItemClass}>
              <InfoOutlinedIcon fontSize="small" />
              About
            </NavLink>
          </li>
        </ul>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-sm hover:scale-105 transition">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-purple-700 transition"
              >
                Login
              </Link>

              <Link
                to="/role-selection"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Join
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? (
            <CloseOutlinedIcon fontSize="large" />
          ) : (
            <MenuOutlinedIcon fontSize="large" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-5 py-4 shadow-md space-y-1 text-sm">
          <NavLink
            to="/doctor"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            Doctors
          </NavLink>

          <NavLink
            to="/clinic"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            Clinics
          </NavLink>

          <NavLink
            to="/hospital"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            Hospitals
          </NavLink>

          <NavLink
            to="/laboratory"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            Laboratory
          </NavLink>

          <NavLink
            to="/pharmacy"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            Pharmacy
          </NavLink>

          <NavLink
            to="/appointments"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            Appointment
          </NavLink>

          <NavLink
            to="/about"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>

          {!user && (
            <>
              <NavLink
                to="/login"
                className="block py-2"
                onClick={() => setOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/role-selection"
                className="block bg-purple-600 text-white text-center py-3 rounded-lg mt-3"
                onClick={() => setOpen(false)}
              >
                Join
              </NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
