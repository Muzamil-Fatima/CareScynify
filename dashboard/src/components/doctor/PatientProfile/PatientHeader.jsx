import React from "react";
import { usePatient } from "../../../context/patients/PatientContext";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BloodtypeRoundedIcon from "@mui/icons-material/BloodtypeRounded";
import FemaleRoundedIcon from "@mui/icons-material/FemaleRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";

const PatientHeader = () => {
   const { patient, loading } = usePatient();
  
    if (loading || !patient) {
      return (
        <div className="flex justify-center items-center py-10">
          <p className="text-gray-500">Loading patient information...</p>
        </div>
      );
    }



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

  const age = calculateAge(patient?.dob || null);

  const badges = [
    {
      icon: <CakeRoundedIcon fontSize="small" className="text-violet-600" />,
      value: `${age} Years`,
      bg: "bg-violet-50",
    },
    {
      icon: <FemaleRoundedIcon fontSize="small" className="text-violet-600" />,
      value: patient?.gender || "--",
      bg: "bg-violet-50",
    },
    {
      icon: (
        <BloodtypeRoundedIcon fontSize="small" className="text-violet-600" />
      ),
      value: patient?.bloodGroup || "--",
      bg: "bg-violet-50",
    },
  ];

  const infoCards = [
    {
      icon: <PhoneRoundedIcon className="text-violet-600" />,
      label: "Phone",
      value: patient?.phone || "--",
    },
    {
      icon: <EmailRoundedIcon className="text-violet-600" />,
      label: "Email",
      value: patient?.email || "--",
    },
    {
      icon: <EventAvailableRoundedIcon className="text-violet-600" />,
      label: "Last Appointment",
      value: "Pending",
      span: true,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-violet-100 flex items-center justify-center shrink-0">
            {patient?.avatar ? (
              <img
                src={patient?.avatar}
                alt={patient?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <PersonRoundedIcon
                sx={{ fontSize: 46 }}
                className="text-violet-600"
              />
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {patient?.name || "--"}
            </h2>

            <p className="text-gray-500 mt-1">Patient Profile</p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-5">
              {badges.map((item, index) => (
                <div
                  key={index}
                  className={`${item.bg} flex items-center gap-2 rounded-xl px-4 py-2`}
                >
                  {item.icon}
                  <span className="text-sm font-medium text-gray-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoCards.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl border border-gray-200 bg-gray-50 p-4 flex gap-3 ${
                item.span ? "sm:col-span-2" : ""
              }`}
            >
              <div className="mt-1">{item.icon}</div>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {item.label}
                </p>

                <p className="font-medium text-gray-800 break-all">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
