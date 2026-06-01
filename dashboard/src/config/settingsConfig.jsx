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
      name: "Identity Verification",
      path: "/settings/verification",
      icon: <BadgeOutlinedIcon />,
    },
    {
      name: "Account Security",
      path: "/settings/security",
      icon: <SecurityOutlinedIcon />,
    },
    {
      name: "Notifications",
      path: "/settings/notifications",
      icon: <NotificationsNoneOutlinedIcon />,
    },
    {
      name: "Clinic Info",
      path: "/settings/clinic",
      icon: <LocalHospitalOutlinedIcon />,
    },
    {
      name: "Schedule",
      path: "/settings/schedule",
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      name: "Personal Info",
      path: "/settings/personal",
      icon: <PersonOutlinedIcon />,
    },
    {
      name: "Medical Credentials",
      path: "/settings/credentials",
      icon: <VerifiedUserOutlinedIcon />,
    },
  ],
};