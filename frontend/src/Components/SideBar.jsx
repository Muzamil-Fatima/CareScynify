import React from "react";
import { NavLink } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const SideBar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <HomeOutlinedIcon />, path: "/dashboard" },
    { name: "Profile", icon: <PersonOutlineOutlinedIcon />, path: "/profile" },
    {
      name: "Appointments",
      icon: <CalendarMonthOutlinedIcon />,
      path: "/appointments",
    },
    { name: "Reports", icon: <DescriptionOutlinedIcon />, path: "/reports" },
    {
      name: "AI Insights",
      icon: <SmartToyOutlinedIcon />,
      path: "/ai-insights",
    },
    { name: "Settings", icon: <SettingsOutlinedIcon />, path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between border-r">
      <div>
        {/* Menu */}
        <div className="mt-6">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 transition relative group ${
                  isActive
                    ? "text-purple-700 bg-purple-50 border-r-4 border-purple-600"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>

              {/* Hover underline effect */}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-5 border-t">
        <div className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-red-500 transition">
          <LogoutOutlinedIcon />
          <span className="font-medium">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
