// DashboardHero.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const DashboardHero = () => {
  const navigate = useNavigate();

  // Later you can fetch these values from backend/context
  const patient = {
    name: "Muzamil",
    appointmentsThisWeek: 2,
  };

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 via-violet-600 to-fuchsia-600 p-6 md:p-8 shadow-xl">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-14 -left-10 h-32 w-32 rounded-full bg-white/10"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Side */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white mb-5 backdrop-blur-sm">
            <WbSunnyRoundedIcon fontSize="small" />
            <span className="text-sm font-medium">
              {greeting}, {patient.name}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Welcome Back 👋
          </h1>

          <p className="mt-4 text-purple-100 text-base md:text-lg leading-relaxed">
            You have{" "}
            <span className="font-bold text-white">
              {patient.appointmentsThisWeek} appointments
            </span>{" "}
            scheduled this week. Stay on top of your health journey with
            CareScynify.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Book Appointment */}
          <button
            onClick={() => navigate("/doctor")}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white text-purple-700 px-6 py-4 font-semibold shadow-md hover:scale-105 transition-all duration-300"
          >
            <EventAvailableRoundedIcon />
            Book Appointment
          </button>

          {/* Symptom Analyzer */}
          <button
            onClick={() => navigate("/symptom-analyzer")}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md text-white px-6 py-4 font-semibold hover:bg-white/20 transition-all duration-300"
          >
            <PsychologyOutlinedIcon />
            Analyze Symptoms
            <ArrowForwardRoundedIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;