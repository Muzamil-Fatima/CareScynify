
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Footer = () => {
  return (
    <footer className="bg-linear-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center text-2xl font-bold mb-5"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 mr-3">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.4} />
              </span>

              <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CareScynify
              </span>
            </Link>

            <p className="text-gray-400 leading-7 mb-6">
              Book doctors, order medicines, schedule lab tests, and manage
              your healthcare journey in one secure platform.
            </p>

            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <LocationOnOutlinedIcon
                  fontSize="small"
                  className="text-purple-400"
                />
                <span>Gujranwala, Pakistan</span>
              </div>

              <div className="flex items-center gap-2">
                <PhoneOutlinedIcon
                  fontSize="small"
                  className="text-purple-400"
                />
                <span>+92 XXX XXXXXXX</span>
              </div>

              <div className="flex items-center gap-2">
                <EmailOutlinedIcon
                  fontSize="small"
                  className="text-purple-400"
                />
                <span>support@carescynify.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-purple-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/doctor" className="hover:text-purple-400 transition">
                  Doctors
                </Link>
              </li>

              <li>
                <Link
                  to="/medicine"
                  className="hover:text-purple-400 transition"
                >
                  Pharmacy
                </Link>
              </li>

              <li>
                <Link
                  to="/laboratory"
                  className="hover:text-purple-400 transition"
                >
                  Laboratory
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-purple-400 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Legal</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-purple-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-purple-400 transition"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/refund-policy"
                  className="hover:text-purple-400 transition"
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-purple-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Newsletter</h3>

            <p className="text-gray-400 text-sm mb-5">
              Subscribe to receive healthcare tips, updates, and exclusive
              offers.
            </p>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-purple-500"
              />

              <button className="w-full rounded-xl bg-purple-600 py-3 font-medium hover:bg-purple-700 transition">
                Subscribe
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center transition"
              >
                <FacebookRoundedIcon fontSize="small" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center transition"
              >
                <InstagramIcon fontSize="small" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center transition"
              >
                <LinkedInIcon fontSize="small" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 sm:mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-sm text-gray-400 text-center md:text-left">
          <p>© 2026 CareScynify. All rights reserved.</p>

          <p>
            Built with <span className="text-purple-400">♥</span> for better
            healthcare.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;