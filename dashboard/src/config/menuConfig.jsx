import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import ScienceIcon from "@mui/icons-material/Science";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicationIcon from "@mui/icons-material/Medication";
// doctor
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";

export const menuByRole = {
  doctor: [
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
  ],
  lab: [
    { name: "Dashboard", path: "/lab" },
    { name: "Reports", path: "/reports" },
  ],

  pharmacy: [
    { name: "Dashboard", path: "/pharmacy" },
    { name: "Medicines", path: "/medicines" },
  ],
  admin: [
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
  ],
};