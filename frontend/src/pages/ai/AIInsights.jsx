import React from "react";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";

const AIInsights = () => {
  const insights = [
    {
      id: 1,
      title: "Heart Health Analysis",
      status: "Good",
      message: "Your heart rate is stable and within normal range.",
      icon: <FavoriteOutlinedIcon />,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      id: 2,
      title: "Blood Pressure Trend",
      status: "Monitor",
      message: "Slight fluctuation detected. Keep monitoring daily.",
      icon: <TrendingUpOutlinedIcon />,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      id: 3,
      title: "Risk Detection",
      status: "Low Risk",
      message: "No major health risks detected by AI system.",
      icon: <WarningAmberOutlinedIcon />,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <SmartToyOutlinedIcon className="text-purple-600" />
          AI Health Insights
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          AI-powered analysis of your health data
        </p>
      </div>

      {/* AI Summary Card */}
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-md">

        <div className="flex items-center gap-3 mb-3">
          <PsychologyOutlinedIcon />
          <h2 className="text-lg font-semibold">AI Summary</h2>
        </div>

        <p className="text-sm opacity-90">
          Based on your medical records, AI suggests that your overall health is
          stable. Continue regular checkups and maintain a healthy lifestyle.
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {insights.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* Icon */}
            <div className={`p-2 w-fit rounded-xl ${item.bg}`}>
              <span className={item.color}>{item.icon}</span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold mt-3">
              {item.title}
            </h2>

            {/* Message */}
            <p className="text-sm text-gray-600 mt-2">
              {item.message}
            </p>

            {/* Status */}
            <span className={`text-xs font-medium mt-3 inline-block ${item.color}`}>
              Status: {item.status}
            </span>
          </div>
        ))}

      </div>

      {/* AI Chat Suggestion Box */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">

        <h2 className="text-lg font-semibold mb-2">
          Ask AI Doctor
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Get instant answers about your health condition
        </p>

        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Ask something like: Why is my BP high?"
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button className="bg-purple-600 text-white px-4 py-2 rounded-xl">
            Ask
          </button>

        </div>
      </div>

    </div>
  );
};

export default AIInsights;