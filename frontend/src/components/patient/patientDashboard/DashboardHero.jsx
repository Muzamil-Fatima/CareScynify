import React from "react";
import { useNavigate } from "react-router-dom";

import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useAppointment } from "../../../hooks/useAppointments";
import { useAuth } from "../../../hooks/useAuth";

const DashboardHero = () => {
  const navigate = useNavigate();

  // Real logged-in user
  const { user } = useAuth();

  // Real appointments from backend
  const { appointments, loading } = useAppointment();

  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
        ? "Good Afternoon"
        : "Good Evening";

  // Get real patient name
  const patientName =
    user?.name ||
    user?.fullName ||
    user?.firstName ||
    user?.user?.name ||
    "Patient";

  // Get current week's appointments
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);

  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const appointmentsThisWeek = (appointments || []).filter((appointment) => {
    if (!appointment?.appointmentDate) return false;

    // Ignore reserved appointments
    if (appointment?.status === "reserved") return false;

    const appointmentDate = new Date(appointment.appointmentDate);

    return (
      appointmentDate >= startOfWeek &&
      appointmentDate <= endOfWeek
    );
  }).length;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#f5f3ff] via-[#ede9fe] to-[#faf5ff] p-5 sm:p-6 md:p-8 shadow-xl">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-[#8b5cf6]/10" />

      <div className="absolute -bottom-14 -left-10 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-[#a855f7]/8" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
        {/* Left Side */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 sm:px-4 py-2 text-[#7c3aed] mb-4 sm:mb-5 backdrop-blur-sm">
            <WbSunnyRoundedIcon fontSize="small" />

            <span className="text-xs sm:text-sm font-medium">
              {greeting}, {loading ? "..." : patientName}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1e1b4b] leading-tight">
            Welcome Back 👋
          </h1>

          <p className="mt-3 sm:mt-4 text-[#6b7280] text-sm sm:text-base md:text-lg leading-relaxed">
            You have{" "}
            <span className="font-bold text-[#7c3aed]">
              {loading ? "..." : appointmentsThisWeek}{" "}
              {appointmentsThisWeek === 1
                ? "appointment"
                : "appointments"}
            </span>{" "}
            scheduled this week. Stay on top of your health journey with
            CareScynify.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
          {/* Book Appointment */}
          <button
            onClick={() => navigate("/doctor")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-[#7c3aed] text-white px-5 sm:px-6 py-3 sm:py-4 font-semibold shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <EventAvailableRoundedIcon />

            <span className="whitespace-nowrap">
              Book Appointment
            </span>
          </button>

          {/* Symptom Analyzer */}
          <button
            onClick={() => navigate("/symptom-analyzer")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-[#e9d5ff] bg-white/70 backdrop-blur-md text-[#7c3aed] px-5 sm:px-6 py-3 sm:py-4 font-semibold hover:bg-[#f3e8ff] transition-all duration-300 cursor-pointer"
          >
            <PsychologyOutlinedIcon />

            <span className="whitespace-nowrap">
              Analyze Symptoms
            </span>

            <ArrowForwardRoundedIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;