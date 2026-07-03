import React from "react";
import { usePatient } from "../../../../context/patients/PatientContext";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import BloodtypeRoundedIcon from "@mui/icons-material/BloodtypeRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ContactEmergencyRoundedIcon from "@mui/icons-material/ContactEmergencyRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";

const OverviewTab = () => {
  const { patient, loading } = usePatient();

  if (loading || !patient) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500">Loading patient information...</p>
      </div>
    );
  }
  // Helpers
  const calculateAge = (dob) => {
    if (!dob) return "--";

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formattedDob = patient?.dob
    ? new Date(patient?.dob).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "--";

  const age = calculateAge(patient?.dob);

  // Common Classes
  const itemClass =
    "flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0";

  const iconWrapperClass =
    "w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0";

  const iconClass = "text-violet-600";

  const labelClass = "text-sm text-gray-500";

  const valueClass = "font-medium text-gray-800 break-words";

  // Data
  const personalInfo = [
    {
      label: "Full Name",
      value: patient?.name || "--",
      icon: <PersonRoundedIcon className={iconClass} />,
    },
    {
      label: "Email",
      value: patient?.email || "--",
      icon: <EmailRoundedIcon className={iconClass} />,
    },
    {
      label: "Phone Number",
      value: patient?.phone || "--",
      icon: <PhoneRoundedIcon className={iconClass} />,
    },
    {
      label: "Gender",
      value: patient?.gender || "--",
      icon: <FemaleRoundedIcon className={iconClass} />,
    },
    {
      label: "Date of Birth",
      value: `${formattedDob} (${age} Years)`,
      icon: <CakeRoundedIcon className={iconClass} />,
    },
    {
      label: "Blood Group",
      value: patient?.bloodGroup || "--",
      icon: <BloodtypeRoundedIcon className={iconClass} />,
    },
    {
      label: "CNIC",
      value: patient?.cnic || "--",
      icon: <BadgeRoundedIcon className={iconClass} />,
    },
    {
      label: "Address",
      value: patient?.address || "--",
      icon: <HomeRoundedIcon className={iconClass} />,
    },
  ];

  const emergencyInfo = [
    {
      label: "Contact Name",
      value: patient?.emergencyContact?.name || "--",
      icon: <ContactEmergencyRoundedIcon className={iconClass} />,
    },
    {
      label: "Relationship",
      value: patient?.emergencyContact?.relation || "--",
      icon: <FamilyRestroomRoundedIcon className={iconClass} />,
    },
    {
      label: "Phone Number",
      value: patient?.emergencyContact?.phone || "--",
      icon: <CallRoundedIcon className={iconClass} />,
    },
    {
      label: "Address",
      value: patient?.emergencyContact?.address || "--",
      icon: <HomeWorkRoundedIcon className={iconClass} />,
    },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Personal Information
        </h2>

        <div className="space-y-4">
          {personalInfo.map((item) => (
            <div key={item.label} className={itemClass}>
              <div className={iconWrapperClass}>{item.icon}</div>

              <div className="min-w-0">
                <p className={labelClass}>{item.label}</p>
                <p className={valueClass}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Emergency Contact
        </h2>

        <div className="space-y-4">
          {emergencyInfo.map((item) => (
            <div key={item.label} className={itemClass}>
              <div className={iconWrapperClass}>{item.icon}</div>

              <div className="min-w-0">
                <p className={labelClass}>{item.label}</p>
                <p className={valueClass}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
