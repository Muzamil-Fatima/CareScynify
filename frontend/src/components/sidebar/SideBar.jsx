import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../api/authApi";
const SideBar = ({ setActiveSidebar, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser(); // backend cookie clear

      logout(); // frontend context + localStorage clear

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const menuItem = [
    { name: "Dashboard", icon: <HomeOutlinedIcon />, path: "/dashboard" },
    { name: "Profile", icon: <PersonOutlineOutlinedIcon />, path: "/profile" },
    {
      name: "Appointments",
      icon: <CalendarMonthOutlinedIcon />,
      path: "/appointments",
    },
    { name: "Reports", icon: <DescriptionOutlinedIcon />, path: "/reports" },
    {
      name: "My Orders",
      icon: <ShoppingBagOutlinedIcon />,
      path: "/orders",
    },
    {
      name: "Lab Test",
      icon: <ShoppingBagOutlinedIcon />,
      path: "/lab-tests",
    },
    {
      name: "Symptom Analyzer",
      icon: <PsychologyOutlinedIcon />,
      path: "/symptom-analyzer",
    },

    { name: "Settings", icon: <SettingsOutlinedIcon />, path: "/settings" },
  ];
  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-40 md:relative
        ${isOpen ? "w-64 translate-x-0" : "w-16 md:translate-x-0 -translate-x-full"}
        flex flex-col h-screen overflow-hidden
        bg-white border-r border-purple-100 text-gray-600
        transition-all duration-300 ease-in-out shadow-xl shadow-purple-900/5
      `}
    >
      <div className="flex h-16 items-center border-b border-purple-50/80 px-2">
        {isOpen && (
          <span className="ml-2 text-base font-extrabold tracking-tight bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            CareScynify
          </span>
        )}

        <div className={`flex items-center justify-center w-full`}>
          <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* Navigation list featuring */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 scrollbar-none">
        <ul className="space-y-1">
          {menuItem.map((item) => (
            <li key={item.name} title={item.title}>
              <NavLink
                to={item.path}
                onClick={() => {
                  if (item.id) setActiveSidebar(item.id);
                }}
                className={({ isActive }) => `
    relative flex items-center rounded-xl font-medium text-sm
    transition-all duration-200 group
    ${isOpen ? "gap-4 px-3 py-2" : "justify-center py-2"}
    
    ${
      isActive
        ? "bg-purple-50/80 text-purple-700 font-semibold"
        : "hover:bg-gray-50 hover:text-gray-900"
    }
  `}
              >
                <span
                  className={({ isActive }) => `
                  absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md transition-all duration-200
                  ${isActive ? "bg-purple-600" : "bg-transparent group-hover:bg-gray-200"}
                `}
                />
                {/* Icon Layout container */}
                <span
                  className={`
                    text-lg transition-colors duration-200 min-w-6 flex justify-center
                    ${isOpen ? "" : "mx-auto"}
                  `}
                >
                  {item.icon}
                </span>
                {/* Animated Text label view toggling */}
                <span
                  className={`
                    whitespace-nowrap transition-all duration-200
                    ${isOpen ? "opacity-100 visible" : "opacity-0 invisible w-0 overflow-hidden"}
                  `}
                >
                  {item.name}
                </span>
                {/* Hover Flyout Tooltip bubble when sidebar structure collapsed */}
                {!isOpen && (
                  <div className="absolute left-20 scale-0 group-hover:scale-100 transition-all duration-150 origin-left bg-gray-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
         {/* Bottom Section */}
      <div className=" p-3.5 mt-14  border-t">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer text-gray-700 hover:text-red-500 transition"
        >
          <LogoutOutlinedIcon />
          <span className="font-medium">Logout</span>
        </div>
      </div>
      </nav>
     
    </div>
  );
};

export default SideBar;
