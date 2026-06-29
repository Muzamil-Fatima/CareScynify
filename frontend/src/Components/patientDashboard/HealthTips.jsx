import React from "react";

import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import DirectionsWalkRoundedIcon from "@mui/icons-material/DirectionsWalkRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";

const HealthTips = () => {
  const tips = [
    {
      icon: <WaterDropRoundedIcon />,
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily.",
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      icon: <DirectionsWalkRoundedIcon />,
      title: "Daily Exercise",
      description: "Walk for 30 minutes every day.",
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      icon: <RestaurantRoundedIcon />,
      title: "Healthy Diet",
      description: "Eat more fruits and vegetables.",
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    {
      icon: <BedtimeRoundedIcon />,
      title: "Proper Sleep",
      description: "Aim for 7–8 hours of quality sleep.",
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Daily Health Tips
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Small habits can make a big difference.
        </p>
      </div>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-purple-200 transition"
          >
            <div
              className={`${tip.bg} ${tip.text} p-3 rounded-2xl`}
            >
              {tip.icon}
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                {tip.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;