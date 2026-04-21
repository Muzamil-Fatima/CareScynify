import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useAuth } from "../hooks/useAuth.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-1 rounded-md transition ${
      isActive ? "text-purple-700" : "text-gray-700 hover:text-purple-700"
    }`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">

      <div className="flex items-center justify-between px-4 sm:px-6 py-3">

        {/* Logo */}
        <h1 className="text-xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          <Link to="/">CareScynify</Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-5 font-medium text-sm">

          <li>
            <NavLink to="/doctor" className={navItemClass}>
              <MedicalServicesOutlinedIcon fontSize="small" />
              Doctor
            </NavLink>
          </li>

          <li>
            <NavLink to="/clinic" className={navItemClass}>
              <LocalHospitalOutlinedIcon fontSize="small" />
              Clinic
            </NavLink>
          </li>

          <li>
            <NavLink to="/hospital" className={navItemClass}>
              <LocalHospitalOutlinedIcon fontSize="small" />
              Hospital
            </NavLink>
          </li>

          <li>
            <NavLink to="/jobs" className={navItemClass}>
              <WorkOutlineOutlinedIcon fontSize="small" />
              Jobs
            </NavLink>
          </li>

          <li>
            <NavLink to="/laboratory" className={navItemClass}>
              <ScienceOutlinedIcon fontSize="small" />
              Laboratory
            </NavLink>
          </li>

          <li>
            <NavLink to="/pharmacy" className={navItemClass}>
              <LocalPharmacyOutlinedIcon fontSize="small" />
              Pharmacy
            </NavLink>
          </li>

        </ul>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (
            <Link to="/profile">
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/signup" className="bg-purple-600 text-white px-3 py-1.5 rounded-lg text-sm">
                Join
              </Link>
            </>
          )}

        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-white border-t text-sm">

          <NavLink to="/doctor" className="block py-2">Doctor</NavLink>
          <NavLink to="/clinic" className="block py-2">Clinic</NavLink>
          <NavLink to="/hospital" className="block py-2">Hospital</NavLink>
          <NavLink to="/laboratory" className="block py-2">Laboratory</NavLink>
          <NavLink to="/pharmacy" className="block py-2">Pharmacy</NavLink>
          <NavLink to="/jobs" className="block py-2">Jobs</NavLink>

        </div>
      )}

    </div>
  );
};

export default Navbar;
