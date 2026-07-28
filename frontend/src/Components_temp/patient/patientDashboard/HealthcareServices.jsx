// HealthcareServices.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
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
      title: "Hospitals",
      description: "Explore nearby hospitals and healthcare centers.",
      icon: <LocalHospitalRoundedIcon sx={{ fontSize: 32 }} />,
      path: "/hospital",
      bg: "bg-pink-100",
      text: "text-pink-700",
    },
    {
      title: "Clinics",
      description: "Find specialized clinics for your healthcare needs.",
      icon: <BusinessRoundedIcon sx={{ fontSize: 32 }} />,
      path: "/clinic",
      bg: "bg-indigo-100",
      text: "text-indigo-700",
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
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Healthcare Services
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Quickly access healthcare services from one place.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.path)}
            className="group cursor-pointer rounded-3xl border border-gray-100 p-6 hover:border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icon */}
            <div
              className={`${service.bg} ${service.text} w-16 h-16 rounded-2xl flex items-center justify-center mb-5`}
            >
              {service.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {service.title}
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              {service.description}
            </p>

            {/* Arrow */}
            <div className="mt-5 flex items-center gap-1 text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition">
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