import React, { useEffect } from "react";

import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import { useMedicine } from "../../../context/pharmacy/MedicineContext";

const MedicineStats = () => {
  const {
    stats,
    fetchMedicineStats,
    statsLoading,
  } = useMedicine();

  useEffect(() => {
    fetchMedicineStats();
  }, [fetchMedicineStats]);

  const cards = [
    {
      title: "Total Medicines",
      value: stats?.total || 0,
      subtitle: "Available in inventory",
      icon: <MedicationRoundedIcon />,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      valueColor: "text-slate-800",
      borderColor: "border-indigo-100",
    },
    {
      title: "Low Stock",
      value: stats?.lowStock || 0,
      subtitle: "Need restocking",
      icon: <Inventory2RoundedIcon />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      valueColor: "text-amber-600",
      borderColor: "border-amber-100",
    },
    {
      title: "Expiring Soon",
      value: stats?.expiringSoon || 0,
      subtitle: "Within next 30 days",
      icon: <WarningAmberRoundedIcon />,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      valueColor: "text-red-600",
      borderColor: "border-red-100",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`group bg-white border ${card.borderColor} rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 lg:p-5 overflow-hidden`}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Left Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-500 truncate">
                  {card.title}
                </p>

                <h2
                  className={`mt-2 text-2xl sm:text-3xl font-bold ${card.valueColor}`}
                >
                  {statsLoading ? "..." : card.value}
                </h2>

                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  {card.subtitle}
                </p>
              </div>

              {/* Icon */}
              <div
                className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
              >
                {React.cloneElement(card.icon, {
                  sx: {
                    fontSize:
                      window.innerWidth < 640 ? 24 : 28,
                  },
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs sm:text-sm text-emerald-600">
              <TrendingUpRoundedIcon sx={{ fontSize: 16 }} />
              <span>Updated today</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineStats;