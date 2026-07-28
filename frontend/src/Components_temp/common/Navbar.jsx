import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Activity } from "lucide-react";
import CartDrawer from "../pharmacy/cart/CartDrawer.jsx";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAuth } from "../../hooks/useAuth.js";
import { useCartContext } from "../../context/pharmacy/CartContext.js";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user } = useAuth();
  const { cartCount } = useCartContext();
  const navItemClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-purple-100 text-purple-700 font-medium"
        : "text-gray-700 hover:bg-gray-100 hover:text-purple-700"
    }`;
  const location = useLocation();

  const isPharmacy =
    location.pathname.startsWith("/medicine") ||
    location.pathname.startsWith("/cart") ||
    location.pathname.startsWith("/checkout");
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Logo */}

        <Link
          to="/"
          className="flex text-2xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 mr-2">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.4} />
          </span>
          <span> CareScynify</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-2 font-medium text-sm">
          <li>
            <NavLink to="/doctor" className={navItemClass}>
              <MedicalServicesOutlinedIcon fontSize="small" />
              Doctors
            </NavLink>
          </li>
          {/* Pharmacy */}
          <li>
            <NavLink to="/medicine" className={navItemClass}>
              <LocalPharmacyOutlinedIcon fontSize="small" />
              Pharmacy
            </NavLink>
          </li>
          {/* Laboratory */}
          <li>
            <NavLink to="/laboratory" className={navItemClass}>
              <ScienceOutlinedIcon fontSize="small" />
              Laboratory
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
        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {/* Show Cart only on Pharmacy pages */}
              {isPharmacy && (
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 transition"
                >
                  <ShoppingCartOutlinedIcon className="text-gray-700" />

                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}

              {/* Profile */}
              <Link to="/profile">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shadow-sm hover:scale-105 transition">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </Link>
            </>
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
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Navbar;
