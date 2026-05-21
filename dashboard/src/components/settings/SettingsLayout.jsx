import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Fixed & Added Missing Icon Imports
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

import PersonalInfoTab from "./tabs/PersonalInfoTab";
import VerificationTab from "./tabs/VerificationTab";
import ContactVerifyTab from "./tabs/ContactVerifyTab";
import SecurityTab from "./tabs/SecurityTab";
import NotificationsTab from "./tabs/NotificationsTab";
import ClinicInfoTab from "./tabs/ClinicInfoTab";
import ScheduleTab from "./tabs/ScheduleTab";
import ProfessionalTab from "./tabs/ProfessionalTab";
import CredentialsTab from "./tabs/CredentialsTab";
import EducationTab from "./tabs/EducationTab";
const SettingsLayout = () => {
  const navigate = useNavigate();
  const { tab } = useParams();

  const activeTab = tab || "personal";

  const tabs = [
    {
      id: "verification",
      label: "Identity Verification",
      icon: <BadgeOutlinedIcon />,
    },
    {
      id: "contact",
      label: "Contact Verification",
      icon: <PhoneAndroidOutlinedIcon />,
    },
    {
      id: "security",
      label: "Account Security",
      icon: <SecurityOutlinedIcon />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <NotificationsNoneOutlinedIcon />,
    },
    { id: "clinic", label: "Clinic Info", icon: <LocalHospitalOutlinedIcon /> },
    { id: "schedule", label: "Schedule", icon: <CalendarMonthOutlinedIcon /> },
    {
      id: "professional",
      label: "Professional Details",
      icon: <BadgeOutlinedIcon />,
    },
    { id: "personal", label: "Personal Info", icon: <PersonOutlinedIcon /> },
    {
      id: "credentials",
      label: "Medical Credentials",
      icon: <VerifiedUserOutlinedIcon />,
    },
    { id: "education", label: "Education", icon: <SchoolOutlinedIcon /> },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case "verification":
        return <VerificationTab />;
      case "contact":
        return <ContactVerifyTab />;
      case "security":
        return <SecurityTab />;
      case "notifications":
        return <NotificationsTab />;
      case "clinic":
        return <ClinicInfoTab />;
      case "schedule":
        return <ScheduleTab />;
      case "professional":
        return <ProfessionalTab />;
      case "personal":
        return <PersonalInfoTab />;
      case "credentials":
        return <CredentialsTab />;
      case "education":
        return <EducationTab />;
      default:
        return <PersonalInfoTab />;
    }
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] grid grid-cols-[288px_1fr] overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 h-full shrink-0">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight pl-2">
          Account Settings
        </h2>

        <div className="space-y-1">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => navigate(`/settings/${tabItem.id}`)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-150 cursor-pointer
                ${
                  activeTab === tabItem.id
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              {tabItem.icon}
              <span>{tabItem.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="h-full overflow-y-auto p-10 flex flex-col items-center justify-start w-full">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-5xl shadow-xs">
          {renderTab()}
        </div>
      </main>
    </div>
  );
};

export default SettingsLayout;
