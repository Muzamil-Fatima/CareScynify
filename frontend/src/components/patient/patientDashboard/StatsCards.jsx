import React from "react";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import { useAppointment } from "../../../hooks/useAppointments";

import { useQuery } from "@tanstack/react-query";

import { getReports } from "../../../api/reportApi";

const StatsCards = () => {
  const { appointments, loading: appointmentsLoading } = useAppointment();

  const {
    data: reportsData,
    isLoading: reportsLoading,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const allAppointments = appointments || [];

  // Total appointments
  const totalAppointments = allAppointments.filter(
    (appointment) =>
      appointment?.status && appointment.status !== "reserved"
  ).length;

  // Upcoming appointments
  const upcomingVisits = allAppointments.filter((appointment) => {
    if (!appointment?.appointmentDate) return false;

    const status = appointment.status?.toLowerCase();

    if (status !== "pending" && status !== "confirmed") {
      return false;
    }

    return new Date(appointment.appointmentDate) >= new Date();
  }).length;

  // All reports from backend
  const prescriptions = reportsData?.prescriptions || [];
  const reports = reportsData?.reports || [];
  const labReports = reportsData?.labReports || [];

  const reportsUploaded =
    reports.length + labReports.length + prescriptions.length;

  const stats = [
    {
      title: "Total Appointments",
      value: totalAppointments,
      icon: <CalendarMonthRoundedIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />,
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    {
      title: "Upcoming Visits",
      value: upcomingVisits,
      icon: <EventAvailableRoundedIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />,
      bg: "bg-violet-100",
      text: "text-violet-700",
    },
    {
      title: "Reports Uploaded",
      value: reportsUploaded,
      icon: <DescriptionRoundedIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />,
      bg: "bg-fuchsia-100",
      text: "text-fuchsia-700",
    },
  ];

  const isLoading = appointmentsLoading || reportsLoading;

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {stats.map((item, index) => (
        <div
          key={index}
          className="w-full min-w-0 bg-white rounded-3xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Top */}
          <div className="flex items-start justify-between">
            <div
              className={`${item.bg} ${item.text} p-3 sm:p-4 rounded-2xl flex items-center justify-center shrink-0`}
            >
              {item.icon}
            </div>
          </div>

          {/* Content */}
          <div className="mt-4 sm:mt-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 wrap-break-word">
              {isLoading ? "..." : item.value}
            </h2>

            <p className="mt-1.5 sm:mt-2 text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;