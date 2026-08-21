
import React from "react";

import { useNavigate } from "react-router-dom";

import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const HealthcareServices = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Find Doctors",
      description: "Book appointments with experienced doctors.",
      icon: <MedicalServicesRoundedIcon sx={{ fontSize: 32 }} />,
      path: "/doctor",
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    {
      title: "Pharmacy",
      description: "Browse medicines and pharmacy services.",
      icon: <LocalPharmacyRoundedIcon sx={{ fontSize: 32 }} />,
      path: "/pharmacy",
      bg: "bg-green-100",
      text: "text-green-700",
    },
    {
      title: "Laboratory",
      description: "Book lab tests and view laboratory services.",
      icon: <ScienceRoundedIcon sx={{ fontSize: 32 }} />,
      path: "/laboratory",
      bg: "bg-orange-100",
      text: "text-orange-700",
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-5 md:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-7 md:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Healthcare Services
        </h2>

        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
          Quickly access healthcare services from one place.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.path)}
            className="group w-full min-w-0 cursor-pointer rounded-3xl border border-gray-100 p-5 sm:p-6 hover:border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icon */}
            <div
              className={`${service.bg} ${service.text} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-5`}
            >
              {service.icon}
            </div>

            {/* Content */}
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
              {service.title}
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              {service.description}
            </p>

            {/* Arrow */}
            <div className="mt-4 sm:mt-5 flex items-center gap-1 text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition">
              Explore
              <ArrowForwardRoundedIcon fontSize="small" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareServices;