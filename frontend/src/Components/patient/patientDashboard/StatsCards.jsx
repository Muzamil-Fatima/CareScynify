// StatsCards.jsx

import React from "react";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const StatsCards = () => {
  // Later fetch these values from API/backend
  const stats = [
    {
      title: "Total Appointments",
      value: 12,
      icon: <CalendarMonthRoundedIcon fontSize="large" />,
      growth: "+12%",
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    {
      title: "Upcoming Visits",
      value: 3,
      icon: <EventAvailableRoundedIcon fontSize="large" />,
      growth: "+5%",
      bg: "bg-violet-100",
      text: "text-violet-700",
    },
    {
      title: "Reports Uploaded",
      value: 8,
      icon: <DescriptionRoundedIcon fontSize="large" />,
      growth: "+18%",
      bg: "bg-fuchsia-100",
      text: "text-fuchsia-700",
    },
    {
      title: "Doctors Consulted",
      value: 5,
      icon: <MedicalServicesRoundedIcon fontSize="large" />,
      growth: "+8%",
      bg: "bg-indigo-100",
      text: "text-indigo-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Top */}
          <div className="flex items-start justify-between">
            <div className={`${item.bg} ${item.text} p-4 rounded-2xl`}>
              {item.icon}
            </div>

            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUpRoundedIcon sx={{ fontSize: 18 }} />
              {item.growth}
            </div>
          </div>

          {/* Content */}
          <div className="mt-5">
            <h2 className="text-3xl font-bold text-gray-800">
              {item.value}
            </h2>

            <p className="mt-2 text-gray-500 font-medium text-sm">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;