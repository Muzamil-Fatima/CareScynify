// import React from "react";
// import { Link } from "react-router-dom";
// const Footer = () => {
//   return (
//     <div className="bg-gray-900 text-white p-4 sm:px-8 lg-px-16 py-10 space-y-10 font-medium">
//       <div className="space-y-2">
//         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 ">
//           CareScynify
//         </h2>
//         <p>Address xyz.</p>
//         <p>
//           <span>+92 XXXXXXXXXX</span>
//         </p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         <div className="space-y-2">
//           <h3 className="text-white font-semibold text-xl">Quick Link</h3>
//           <ul className="text-gray-500 space-y-1">
//             <li>
//               <Link to="/doctor">Doctor</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/clinic">Clinic</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//             <li>
//               <Link to="/why">Why choose</Link>
//             </li>
//           </ul>
//         </div>
//         <div className="space-y-2">
//           <h3 className="text-white font-semibold text-xl">Legal</h3>
//           <ul className="text-gray-500">
//             <li>Privacy Policy</li>
//             <li>Terms & Condition</li>
//             <li>Refund & Cancellation</li>
//           </ul>
//         </div>
//         <div className="space-y-2">
//           <h3 className="text-white font-semibold text-xl">
//             Trusted References
//           </h3>
//           <ul className="text-gray-500">
//             <li>HEC</li>
//             <li>Digital Pakistan</li>
//             <li>XYZ</li>
//             <li>XYZ</li>
//             <li>XYZ</li>
//           </ul>
//         </div>
//       </div>
//       <div className="space-y-3">
//         <h6 className="text-white font-semibold text-xl">NewsLetter</h6>
//         <p className="text-gray-500 ">
//           Subscribe to get the latest updates, offers, and news from CareScynify.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
//           <input
//             type="text"
//             className="w-full sm:w-64 px-3 py-2 rounded-xl border-2"
//           />
//           <button className="bg-blue-700  px-4 py-2  rounded-xl transform transition duration-200 hover:scale-105 ">
//             Subscribe
//           </button>
//         </div>
//       </div>
//       <div className="space-y-3">
//         <p className="text-white font-semibold text-xl">Follow Us</p>
//         <ul className="flex gap-4 items-center">
//           <li>
//             <a href="">
//               <svg
//                 fill="#ffffff"
//                 width="36px"
//                 height="36px"
//                 viewBox="-3 0 19 19"
//                 xmlns="http://www.w3.org/2000/svg"
//                 class="cf-icon-svg"
//                 className="transform transition duration-200 hover:scale-105"
//               >
//                 <path d="M12.538 9.62a6.038 6.038 0 1 0-6.981 5.964v-4.22H4.023V9.62h1.534V8.29a2.13 2.13 0 0 1 2.28-2.349 9.285 9.285 0 0 1 1.352.118v1.486h-.762a.873.873 0 0 0-.984.943V9.62h1.675l-.268 1.746H7.443v4.22a6.04 6.04 0 0 0 5.095-5.966z" />
//               </svg>
//             </a>
//           </li>
//           <li>
//             <a href="">
//               <svg
//                 fill="#ffffff"
//                 width="28px"
//                 height="28px"
//                 viewBox="0 0 256 256"
//                 id="Flat"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="transform transition duration-200 hover:scale-105"
//               >
//                 <path d="M160,128a32,32,0,1,1-32-32A32.03667,32.03667,0,0,1,160,128Zm68-44v88a56.06353,56.06353,0,0,1-56,56H84a56.06353,56.06353,0,0,1-56-56V84A56.06353,56.06353,0,0,1,84,28h88A56.06353,56.06353,0,0,1,228,84Zm-52,44a48,48,0,1,0-48,48A48.05436,48.05436,0,0,0,176,128Zm16-52a12,12,0,1,0-12,12A12,12,0,0,0,192,76Z" />
//               </svg>
//             </a>
//           </li>
//           <li>
//             <a href="">
//               <svg
//                 width="24px"
//                 height="24px"
//                 viewBox="0 0 16 16"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="transform transition duration-200 hover:scale-105"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   clip-rule="evenodd"
//                   d="M3 1a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2H3zm1.102 4.297a1.195 1.195 0 100-2.39 1.195 1.195 0 000 2.39zm1 7.516V6.234h-2v6.579h2zM6.43 6.234h2v.881c.295-.462.943-1.084 2.148-1.084 1.438 0 2.219.953 2.219 2.766 0 .087.008.484.008.484v3.531h-2v-3.53c0-.485-.102-1.438-1.18-1.438-1.079 0-1.17 1.198-1.195 1.982v2.986h-2V6.234z"
//                   fill="#ffffff"
//                 />
//               </svg>
//             </a>
//           </li>
//         </ul>
//       </div>
//       <hr />
//       <div>
//         <p className="text-center text-sm text-gray-400">
//           © 2025-26 CareScynify. All right reserved
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Footer;import React from "react";
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
    <footer className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center text-2xl font-bold mb-5"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mr-3">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.4} />
              </span>

              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
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
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
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