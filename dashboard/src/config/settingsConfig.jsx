import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

export const settingByRole = {
  doctor: [
    {
      id: "verification",
      label: "Identity Verification",
      icon: <BadgeOutlinedIcon />,
      path: "/settings/verification",
    },
    {
      id: "security",
      label: "Account Security",
      icon: <SecurityOutlinedIcon />,
      path: "/settings/security",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <NotificationsNoneOutlinedIcon />,
      path: "/settings/notifications",
    },
    {
      id: "clinic",
      label: "Clinic Info",
      icon: <LocalHospitalOutlinedIcon />,
      path: "/settings/clinic",
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: <CalendarMonthOutlinedIcon />,
      path: "/settings/schedule",
    },
    {
      id: "personal",
      label: "Personal Info",
      icon: <PersonOutlinedIcon />,
      path: "/settings/personal",
    },
    {
      id: "credentials",
      label: "Medical Credentials",
      icon: <VerifiedUserOutlinedIcon />,
      path: "/settings/credentials",
    },
  ],
};