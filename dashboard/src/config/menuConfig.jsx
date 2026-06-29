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
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
// pharmacy
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
// lab
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
export const menuByRole = {
  doctor: [
    {
      name: "Dashboard",
      path: "/doctor-dashboard",
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
      name: "Patients",
      path: "/patients",
      icon: <PeopleIcon />,
    },
    {
      name: "Workplace Schedule",
      path: "/workplace/schedule",
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
    {
      name: "Dashboard",
      path: "/lab/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Test Orders",
      path: "/lab/tests",
      icon: <AssignmentIcon />,
    },
    {
      name: "Sample Queue",
      path: "/lab/samples",
      icon: <HourglassEmptyIcon />,
    },
    {
      name: "Test Processing",
      path: "/lab/processing",
      icon: <ScienceIcon />,
    },
    {
      name: "Completed Reports",
      path: "/lab/reports",
      icon: <CheckCircleIcon />,
    },
    {
      name: "Analytics",
      path: "/lab/analytics",
      icon: <AssessmentIcon />,
    },
    {
      name: "Patients",
      path: "/lab/patients",
      icon: <PeopleIcon />,
    },
  ],
  pharmacy: [
    {
      name: "Dashboard",
      path: "/pharmacy/dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      name: "Medicines",
      path: "/pharmacy/medicines",
      icon: <MedicationRoundedIcon />,
    },
    {
      name: "Stock",
      path: "/pharmacy/stock",
      icon: <Inventory2RoundedIcon />,
    },
    {
      name: "Sales",
      path: "/pharmacy/sales",
      icon: <ShoppingCartRoundedIcon />,
    },
    {
      name: "Reports",
      path: "/pharmacy/reports",
      icon: <AssessmentRoundedIcon />,
    },
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
