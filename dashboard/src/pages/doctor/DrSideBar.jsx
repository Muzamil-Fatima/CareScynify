import ToggleButton from "../../components/sidebar/ToggleButton";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";

const DrSideBar = ({ isOpen, setIsOpen }) => {
  const menuItem = [
    {
      name: "Dashboard",
      path: "/doctor/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "My Schedule",
      path: "/doctor/schedule",
      icon: <ScheduleIcon />,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: <EventNoteIcon />,
    },
    {
      name: "Messages",
      path: "/chat",
      icon: <ChatIcon />,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: <PeopleIcon />,
    },
    {
      name: "Prescriptions",
      path: "/prescriptions",
      icon: <MedicationIcon />,
    },
    {
      name: "Profile",
      path: "/doctor/profile",
      icon: <PersonIcon />,
    },
    {
      name: "Patient Reviews",
      path: "/doctor/reviews",
      icon: <RateReviewIcon />,
    },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-0"
      } min-h-screen bg-slate-950 text-white p-2 transition-all duration-300`}
    >
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />

      <ul className="space-y-4">
        {menuItem.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `w-full pl-3 h-12 flex items-center gap-3 rounded-lg
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-white hover:text-indigo-400 hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default DrSideBar;