// src/components/pharmacy/MedicineStats.jsx

import React from "react";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const MedicineStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Medicines",
      value: stats?.total || 0,
      subtitle: "Available in inventory",
      icon: <MedicationRoundedIcon sx={{ fontSize: 32 }} />,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      valueColor: "text-slate-800",
      borderColor: "border-indigo-100",
    },
    {
      title: "Low Stock",
      value: stats?.lowStock || 0,
      subtitle: "Need restocking",
      icon: <Inventory2RoundedIcon sx={{ fontSize: 32 }} />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      valueColor: "text-amber-600",
      borderColor: "border-amber-100",
    },
    {
      title: "Expiring Soon",
      value: stats?.expiringSoon || 0,
      subtitle: "Within next 30 days",
      icon: <WarningAmberRoundedIcon sx={{ fontSize: 32 }} />,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      valueColor: "text-red-600",
      borderColor: "border-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`group bg-white rounded-3xl border ${card.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 p-6`}
        >
          <div className="flex items-start justify-between">
            {/* Left */}
            <div>
              <p className="text-sm font-medium text-slate-500">
                {card.title}
              </p>

              <h2
                className={`text-4xl font-bold mt-3 ${card.valueColor}`}
              >
                {card.value}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {card.subtitle}
              </p>
            </div>

            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-2xl ${card.iconBg} flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}
            >
              {card.icon}
            </div>
          </div>

          {/* Bottom Indicator */}
          <div className="mt-6 flex items-center gap-2 text-sm text-emerald-600">
            <TrendingUpRoundedIcon sx={{ fontSize: 18 }} />
            <span>Updated today</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicineStats;