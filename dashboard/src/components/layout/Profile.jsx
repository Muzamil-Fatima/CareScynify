import React, { useState, useRef, useEffect } from "react";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-amber-400 h-10 w-10 rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-amber-500 transition"
      >
        M
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              View Profile
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Settings
            </li>

            <li className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;