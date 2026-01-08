import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className=" flex flex-row mt-1.5 space-x-2.5 justify-between items-center px-4 sm:px-6 py-4 border-b-2 border-gray-200 fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        TecHub

      </h1>
      <div>
        <ul className="hidden font-semibold md:flex flex-row ml-10 space-x-8 text-xl lg:text-xl">
          <li className="flex flex-row items-center gap-2 hover:text-purple-700 cursor-pointer ">
            <Link
              to="/"
              className="flex flex-row items-center pb-1 relative group space-x-1.5 group"
            >
              <svg
                fill="#000000"
                width="24px"
                height="24px"
                viewBox="-2 -2 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
                class="jam jam-home"
                className="fill-current text-gray-800 group-hover:text-purple-700 transition-colors"
              >
                <path d="M18 18V7.132l-8-4.8-8 4.8V18h4v-2.75a4 4 0 1 1 8 0V18h4zm-6 2v-4.75a2 2 0 1 0-4 0V20H2a2 2 0 0 1-2-2V7.132a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.132V18a2 2 0 0 1-2 2h-6z" />
              </svg>
              <span className=""> Home</span>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </li>
          <li className="flex flex-row items-center gap-1.5 hover:text-purple-600 cursor-pointer ">
            <Link
              to="/about"
              className="flex flex-row items-center pb-1 relative group space-x-1.5 group"
            >
              <svg
                fill="#000000"
                width="22px"
                height="22px"
                viewBox="0 0 128 128"
                id="Layer_1"
                version="1.1"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                className="fill-current text-gray-800 group-hover:text-purple-700 transition-colors"
              >
                <g>
                  <path d="M64,1C29.3,1,1,29.3,1,64s28.3,63,63,63s63-28.3,63-63S98.7,1,64,1z M64,119C33.7,119,9,94.3,9,64S33.7,9,64,9   s55,24.7,55,55S94.3,119,64,119z" />

                  <rect height="40" width="8" x="60" y="54.5" />

                  <rect height="8" width="8" x="60" y="35.5" />
                </g>
              </svg>
              <span> About</span>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </li>
          <li className="flex flex-row items-center gap-1.5 hover:text-purple-600 cursor-pointer ">
            <Link
              to="/internship"
              className="flex flex-row items-center pb-1 relative group space-x-1.5 group"
            >
              <svg
                fill="#000000"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-gray-800 group-hover:text-purple-700 transition-colors"
              >
                <path d="M19,6H16V5a2,2,0,0,0-2-2H10A2,2,0,0,0,8,5V6H5A3,3,0,0,0,2,9v9a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9A3,3,0,0,0,19,6ZM10,5h4V6H10ZM20,18a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12.39L8.68,14A1.19,1.19,0,0,0,9,14h6a1.19,1.19,0,0,0,.32-.05L20,12.39Zm0-7.72L14.84,12H9.16L4,10.28V9A1,1,0,0,1,5,8H19a1,1,0,0,1,1,1Z" />
              </svg>
              <span> Internship</span>
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </li>

          <li className="flex flex-row items-center gap-1.5 hover:text-purple-600 cursor-pointer ">
            <Link
              to="/contact"
              className="flex flex-row items-center pb-1 relative group space-x-1.5 group"
            >
              <svg
                fill="#000000"
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                version="1.2"
                baseProfile="tiny"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-gray-800 group-hover:text-purple-700 transition-colors"
              >
                <path d="M19 7h-14c-1.104 0-2 .896-2 2v9c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2v-9c0-1.104-.896-2-2-2zm-9.684 7.316l1.602 1.4c.305.266.691.398 1.082.398s.777-.133 1.082-.398l1.602-1.4-.037.037 3.646 3.646h-12.586l3.646-3.646-.037-.037zm-4.316 2.977v-6.753l3.602 3.151-3.602 3.602zm10.398-3.602l3.602-3.151v6.75l-3.602-3.599zm3.602-4.691v.21l-6.576 5.754c-.227.198-.621.198-.848 0l-6.576-5.754v-.21h14z" />
              </svg>
              <span>Contact Us</span>
              <span
                className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-700 
                   scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
              ></span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link to="/login">
          <button className="border-purple-800 text-black border hover:bg-purple-600 rounded-2xl px-4 py-2 hover:text-white font-semibold cursor-pointer">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-purple-600 hover:bg-transparent hover:border hover:border-purple-800 rounded-2xl px-4 py-2  text-white hover:text-purple-700 font-semibold cursor-pointer">
            SignUp
          </button>
        </Link>
      </div>
      <button onClick={() => setOpen(!open)} className="md:hidden text-3xl">
        ☰
      </button>
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 p-6 font-semibold text-lg">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/internship">Internship</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
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
