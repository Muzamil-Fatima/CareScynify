import React from "react";

import { useNavigate } from "react-router-dom";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useAppointment } from "../../../hooks/useAppointments";

const UpcomingAppointments = () => {
  const navigate = useNavigate();

  const { appointments, loading } = useAppointment();

  // Get only upcoming pending/confirmed appointments
  const upcomingAppointments = (appointments || [])
    .filter((appointment) => {
      if (!appointment?.status) return false;

      const status = appointment.status.toLowerCase();

      if (status !== "pending" && status !== "confirmed") {
        return false;
      }

      if (!appointment?.appointmentDate) {
        return false;
      }

      const appointmentDate = new Date(appointment.appointmentDate);

      return appointmentDate >= new Date();
    })
    .sort(
      (a, b) =>
        new Date(a.appointmentDate) - new Date(b.appointmentDate)
    )
    .slice(0, 3);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (appointment) => {
    // If backend already provides appointmentTime
    if (appointment?.appointmentTime) {
      return appointment.appointmentTime;
    }

    // Otherwise get time from appointmentDate
    if (appointment?.appointmentDate) {
      const date = new Date(appointment.appointmentDate);

      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }

    return "Time unavailable";
  };

  const getDoctorName = (appointment) => {
    return (
      appointment?.doctor?.user?.name ||
      appointment?.doctor?.name ||
      appointment?.doctorName ||
      appointment?.doctor?.user?.fullName ||
      "Doctor"
    );
  };

  const getSpecialty = (appointment) => {
    return (
      appointment?.doctor?.specialization ||
      appointment?.doctor?.specialty ||
      appointment?.specialty ||
      appointment?.doctor?.specializationName ||
      "Healthcare Specialist"
    );
  };

  const getStatusStyle = (status) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === "confirmed") {
      return "bg-green-100 text-green-700";
    }

    if (normalizedStatus === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-gray-100 text-gray-700";
  };

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
          className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1 cursor-pointer"
        >
          View All
          <ArrowForwardRoundedIcon fontSize="small" />
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="py-8 text-center text-gray-500">
          Loading appointments...
        </div>
      ) : upcomingAppointments.length === 0 ? (
        <div className="py-8 text-center text-gray-400">
          No upcoming appointments
        </div>
      ) : (
        /* Appointments List */
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border border-gray-100 rounded-2xl p-5 hover:border-purple-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left */}
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {getDoctorName(appointment)}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <LocalHospitalRoundedIcon sx={{ fontSize: 18 }} />

                    <span>{getSpecialty(appointment)}</span>
                  </div>

                  <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />

                      {formatDate(appointment.appointmentDate)}
                    </div>

                    <div className="flex items-center gap-1">
                      <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />

                      {formatTime(appointment)}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-start md:items-end gap-3">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                      appointment.status
                    )}`}
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
      )}
    </div>
  );
};

export default UpcomingAppointments;