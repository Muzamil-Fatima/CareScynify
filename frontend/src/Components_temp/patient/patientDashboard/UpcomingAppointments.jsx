// UpcomingAppointments.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const UpcomingAppointments = () => {
  const navigate = useNavigate();

  // Later fetch this data from backend/API
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Ahmed Ali",
      specialty: "Cardiologist",
      date: "28 June 2026",
      time: "10:30 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Khan",
      specialty: "Dermatologist",
      date: "30 June 2026",
      time: "02:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      doctor: "Dr. Usman Tariq",
      specialty: "Neurologist",
      date: "02 July 2026",
      time: "11:15 AM",
      status: "Confirmed",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Upcoming Appointments
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Your upcoming consultations
          </p>
        </div>

        <button
          onClick={() => navigate("/appointments")}
          className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
        >
          View All
          <ArrowForwardRoundedIcon fontSize="small" />
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="border border-gray-100 rounded-2xl p-5 hover:border-purple-200 hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left */}
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {appointment.doctor}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <LocalHospitalRoundedIcon sx={{ fontSize: 18 }} />
                  <span>{appointment.specialty}</span>
                </div>

                <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
                    {appointment.date}
                  </div>

                  <div className="flex items-center gap-1">
                    <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />
                    {appointment.time}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    appointment.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appointment.status}
                </span>

                <button
                  onClick={() => navigate("/appointments")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-medium transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;