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
import AssessmentIcon from "@mui/icons-material/Assessment";
import DescriptionIcon from "@mui/icons-material/Description";
// admin
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export const menuByRole = {
  doctor: [
    {
      name: "Dashboard",
      path: "/doctor/dashboard",
      icon: <DashboardIcon />,
      title: "Dashboard",
    },
    {
      name: "My Schedule",
      path: "/doctor/schedule",
      icon: <ScheduleIcon />,
      title: "My Schedule",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: <EventNoteIcon />,
      title: "Appointments",
    },

    {
      name: "Patients",
      path: "/patients",
      icon: <PeopleIcon />,
      title: "Patients",
    },
    {
      name: "Workplace Schedule",
      path: "/workplace/schedule",
      icon: <MedicationIcon />,
      title: "Workplace Schedule",
    },
    {
      name: "Profile",
      path: "/doctor/profile",
      icon: <PersonIcon />,
      title: "Profile",
    },
    {
      name: "Patient Reviews",
      path: "/doctor/reviews",
      icon: <RateReviewIcon />,
      title: "Patient Reviews",
    },
  ],
  laboratory: [
    {
      name: "Dashboard",
      path: "/lab/dashboard",
      icon: <DashboardIcon />,
      title: "dashboard",
    },
    {
      name: "Patients",
      path: "/lab/patients",
      icon: <PeopleIcon />,
      title: "Patients",
    },
    {
      name: "Test Orders",
      path: "/lab/tests",
      icon: <AssignmentIcon />,
      title: "Test Orders",
    },
    {
      name: "Sample Queue",
      path: "/lab/samples",
      icon: <HourglassEmptyIcon />,
      title: "Sample Queue",
    },
    {
      name: "Test Processing",
      path: "/lab/processing",
      icon: <ScienceIcon />,
      title: "Test Processing",
    },
    {
      name: "Reports",
      path: "/lab/reports",
      icon: <DescriptionIcon />,
      title: "Reports",
    },
    {
      name: "Profile",
      path: "/lab/profile",
      icon: <PersonIcon />,
      title: "Profile",
    },
  ],

  pharmacy: [
    {
      name: "Dashboard",
      path: "/pharmacy/dashboard",
      icon: <DashboardRoundedIcon />,
      title: "Dashboard",
    },
    {
      name: "All Medicines",
      path: "/pharmacy/medicines",
      icon: <MedicationRoundedIcon />,
      title: "All Medicines",
    },
    {
      name: "Add Medicine",
      path: "/pharmacy/add-medicine",
      icon: <AddCircleRoundedIcon />,
      title: "Add Medicine",
    },
    {
      name: "Orders",
      path: "/pharmacy/order",
      icon: <ShoppingBagRoundedIcon />,
      title: "Orders",
    },
    {
      name: "Profile",
      path: "/pharmacy/profile",
      icon: <PersonIcon />,
      title: "Profile",
    },
  ],
  admin: [
    {
      name: "Overview",
      path: "/admin/dashboard",
      icon: <DashboardIcon />,
      title: "Overview",
    },
    {
      name: "Request to Verify",
      path: "/admin/verify/person",
      icon: <BadgeOutlinedIcon />,
      title: "Request to Verify",
    },

    {
      name: "Notifications",
      path: "/admin/notification",
      icon: <NotificationsNoneOutlinedIcon />,
      title: "Notifications",
    },
    {
      id: "dr",
      name: "Doctor",
      path: "/doctor",
      icon: <MedicalServicesIcon />,
      title: "Doctor",
    },
    {
      name: "Patients",
      path: "/patients",
      icon: <PeopleIcon />,
      title: "Patients",
    },
    {
      id: "lab",
      name: "Laboratory",
      path: "/laboratory",
      icon: <ScienceIcon />,
      title: "Laboratory",
    },
    {
      id: "lab",
      name: "Pharmacy",
      path: "/pharmacy",
      icon: <MedicationIcon />,
      title: "pharmacy",
    },
    {
      id: "settings",
      name: "Setting",
      path: "/settings",
      icon: <SettingsIcon />,
      title: "Setting",
    },
    {
      name: "Logout",
      path: "/login",
      icon: <LogoutIcon />,
      title: "Logout",
    },
  ],
};
