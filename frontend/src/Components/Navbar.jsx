import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";

import { useAuth } from "../context/auth/useAuth.js";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex flex-row mt-1.5 space-x-2.5 justify-between items-center px-4 sm:px-6 py-4 border-b-2 border-gray-200 fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md">
      <h1 className="text-xl sm:text-3xl lg:text-3xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        <NavLink to="/">CareScynify</NavLink>
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden font-semibold md:flex flex-row ml-10 space-x-8 text-xl lg:text-xl">
        <li className="flex items-center gap-2 hover:text-purple-700 cursor-pointer">
          <NavLink
            to="/doctor"
            className={({ isActive }) =>
              `flex items-center pb-1 relative group space-x-1.5 ${
                isActive ? "text-purple-700" : "text-gray-800"
              }`
            }
          >
            <MedicalServicesOutlinedIcon />
            <span>Doctor</span>
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </li>

        <li className="flex items-center gap-2 hover:text-purple-700 cursor-pointer">
          <NavLink
            to="/clinic"
            className={({ isActive }) =>
              `flex items-center pb-1 relative group space-x-1.5 ${
                isActive ? "text-purple-700" : "text-gray-800"
              }`
            }
          >
            <LocalHospitalOutlinedIcon />
            <span>Clinic</span>
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </li>
        <li className="flex items-center gap-2 hover:text-purple-700 cursor-pointer">
          <NavLink
            to="/hospital"
            className={({ isActive }) =>
              `flex items-center pb-1 relative group space-x-1.5 ${
                isActive ? "text-purple-700" : "text-gray-800"
              }`
            }
          >
            <LocalHospitalOutlinedIcon />
            <span>Hospital</span>
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </li>

        <li className="flex items-center gap-2 hover:text-purple-700 cursor-pointer">
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `flex items-center pb-1 relative group space-x-1.5 ${
                isActive ? "text-purple-700" : "text-gray-800"
              }`
            }
          >
            <WorkOutlineOutlinedIcon />
            <span>Jobs</span>
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </li>

        <li className="flex items-center gap-2 hover:text-purple-700 cursor-pointer">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center pb-1 relative group space-x-1.5 ${
                isActive ? "text-purple-700" : "text-gray-800"
              }`
            }
          >
            <InfoOutlinedIcon />
            <span>About</span>
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </NavLink>
        </li>
      </ul>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
        {user ? (
          <Link
            to="/profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="border-purple-800 text-black border hover:bg-purple-600 rounded-2xl px-4 py-2 hover:text-white font-semibold cursor-pointer">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="bg-purple-600 hover:bg-transparent hover:border hover:border-purple-800 rounded-2xl px-4 py-2 text-white hover:text-purple-700 font-semibold cursor-pointer">
                Become a Provider
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Toggle */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-3xl">
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 p-6 font-semibold text-lg">
            <li>
              <Link to="/doctor">Doctor</Link>
            </li>
            <li>
              <Link to="/clinic">Clinic</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/login">
                <button className="w-full border border-purple-800 rounded-xl py-2 font-semibold">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full bg-purple-600 text-white rounded-xl py-2 font-semibold">
                  Sign Up
                </button>
              </Link>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
