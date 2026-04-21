import { NavLink } from "react-router-dom";
import ToggleButton from "./ToggleButton";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import ScienceIcon from "@mui/icons-material/Science";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicationIcon from "@mui/icons-material/Medication";

const SideBar = ({ setActiveSidebar, isOpen, setIsOpen }) => {
  const menuItem = [
    {
      name: "Overview",
      path: "/overview",
      icon: <DashboardIcon />,
    },
    {
      id: "dr",
      name: "Doctor",
      path: "/doctor",
      icon: <MedicalServicesIcon />,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: <PeopleIcon />,
    },
    {
      id: "appointment",
      name: "Appointment",
      path: "/appointment",
      icon: <EventIcon />,
    },
    {
      id: "lab",
      name: "Laboratory",
      path: "/laboratory",
      icon: <ScienceIcon />,
    },
    {
      id: "lab",
      name: "pharmacy",
      path: "/pharmacy",
      icon: <MedicationIcon />,
    },
    {
      id: "settings",
      name: "Setting",
      path: "/settings",
      icon: <SettingsIcon />,
    },
    {
      name: "Logout",
      path: "/login",
      icon: <LogoutIcon />,
    },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } min-h-screen bg-slate-900 text-white transition-all duration-300 shadow-xl`}
    >
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />

      <ul className="mt-6 space-y-2 px-2">
        {menuItem.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => {
              if (item.id) {
                setActiveSidebar(item.id);
              }
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-blue-600 shadow-lg"
                  : "hover:bg-slate-800 hover:pl-4"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            {isOpen && <span className="text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
