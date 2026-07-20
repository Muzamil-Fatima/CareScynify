import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
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
      name: "Notifications",
      path: "/settings/notifications",
      icon: <NotificationsNoneOutlinedIcon />,
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
  laboratory: [
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
  ],
  pharmacy: [
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
      name: "Medical Credentials",
      path: "/settings/credentials",
      icon: <VerifiedUserOutlinedIcon />,
    },
  ],
};
