import React from "react";
import { NavLink } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

const SettingSideBar = () => {
  const [toggle, setToggle] = React.useState(true);

  const menuItem = [
    {
      name: "Profile Settings",
      path: "/settings/profile",
      icon: <PersonIcon />,
    },
    {
      name: "Security",
      path: "/settings/security",
      icon: <SecurityIcon />,
    },
    {
      name: "Notifications",
      path: "/settings/notifications",
      icon: <NotificationsIcon />,
    },
    {
      name: "Clinic Information",
      path: "/settings/clinic",
      icon: <BusinessIcon />,
    },
    {
      name: "System Settings",
      path: "/settings/system",
      icon: <SettingsApplicationsIcon />,
    },
  ];

  return (
    <div
      className={`min-h-screen bg-slate-950 text-white transition-all duration-300 ${
        toggle ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center p-4 border-b border-slate-700">
        {toggle && <h2 className="text-lg font-bold">Settings</h2>}

        <button onClick={() => setToggle(!toggle)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* Menu */}
      <ul className="mt-4 space-y-2 px-2">
        {menuItem.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-blue-600 shadow-md"
                  : "hover:bg-slate-800 hover:pl-4"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            {toggle && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SettingSideBar;