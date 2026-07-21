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
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
// lab
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
// admin
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

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
  laboratory: [
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
      name: "All Medicines",
      path: "/pharmacy/medicines",
      icon: <MedicationRoundedIcon />,
    },
    {
      name: "Add Medicine",
      path: "/pharmacy/add-medicine",
      icon: <AddCircleRoundedIcon />,
    },
    {
      name: "Orders",
      path: "/pharmacy/order",
      icon: <ShoppingBagRoundedIcon />,
    },
    {
      name: "Profile",
      path: "/pharmacy/profile",
      icon: <PersonIcon />,
    },
  ],
  admin: [
    {
      name: "Overview",
      path: "/admin/dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Request to Verify",
      path: "/admin/verify/person",
      icon: <BadgeOutlinedIcon />,
    },

    {
      name: "Notifications",
      path: "/admin/notification",
      icon: <NotificationsNoneOutlinedIcon />,
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
