import React, { useState } from "react";
import Profile from "./Profile";
import { FaBell } from "react-icons/fa";

const SideIcon = () => {
  const [openNotifications, setOpenNotifications] = useState(false);

  const notifications = [
    "New appointment booked",
    "Patient uploaded report",
    "Prescription approved",
  ];

  return (
    <div className="fixed top-4 right-6 md:right-8 flex items-center space-x-4 z-50">
      
      {/* Notification Icon */}
      <div className="relative">
        <button
          onClick={() => setOpenNotifications(!openNotifications)}
          className="relative cursor-pointer"
        >
          <FaBell size={22} />

          {/* Notification badge */}
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {openNotifications && (
          <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-lg p-3 text-black">
            <h4 className="font-semibold mb-2">Notifications</h4>

            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No notifications</p>
            ) : (
              <ul className="space-y-2">
                {notifications.map((note, index) => (
                  <li
                    key={index}
                    className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Profile Component */}
      <Profile />
    </div>
  );
};

export default SideIcon;