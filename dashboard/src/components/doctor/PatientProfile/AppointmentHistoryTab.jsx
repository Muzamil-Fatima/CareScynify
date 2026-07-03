import React from "react";
import { usePatient } from "../../../../context/patients/PatientContext";
import usePatientAppointments from "../../../../hooks/usePatientAppointments";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

const AppointmentHistoryTab = () => {
  const { patient } = usePatient();
  // console.log("Patient:", patient);
  const patientId = patient?._id;
  // console.log("Patient ID:", patient?._id);
  const { appointments, loading } = usePatientAppointments(patientId);
  // console.log("Patient patientId:", patient?.patientId);
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500">Loading appointments...</p>
      </div>
    );
  }

  const getStatus = (status) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircleRoundedIcon fontSize="small" />,
          className:
            "bg-emerald-100 text-emerald-700 border border-emerald-200",
          label: "Completed",
        };

      case "confirmed":
        return {
          icon: <PendingActionsRoundedIcon fontSize="small" />,
          className: "bg-blue-100 text-blue-700 border border-blue-200",
          label: "Confirmed",
        };

      case "cancelled":
        return {
          icon: <CancelRoundedIcon fontSize="small" />,
          className: "bg-red-100 text-red-700 border border-red-200",
          label: "Cancelled",
        };

      default:
        return {
          icon: <EventBusyRoundedIcon fontSize="small" />,
          className: "bg-amber-100 text-amber-700 border border-amber-200",
          label: "Pending",
        };
    }
  };

  if (!appointments.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <HistoryRoundedIcon sx={{ fontSize: 60 }} className="text-violet-400" />

        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          No Appointment History
        </h2>

        <p className="mt-2 text-gray-500">
          This patient has no previous appointments with you.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {appointments.map((appointment) => {
        const badge = getStatus(appointment.status);

        return (
          <div
            key={appointment._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-6">
              {/* Left */}
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                    <CalendarMonthRoundedIcon className="text-violet-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {new Date(appointment.appointmentDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </h3>

                    <p className="text-sm text-gray-500">Appointment Date</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <AccessTimeRoundedIcon className="text-violet-500" />

                    <div>
                      <p className="text-xs text-gray-500">Time</p>

                      <p className="font-medium">
                        {appointment.appointmentTime} - {appointment.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MonitorHeartRoundedIcon className="text-violet-500" />

                    <div>
                      <p className="text-xs text-gray-500">Appointment Type</p>

                      <p className="font-medium">
                        {appointment.appointmentType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-start lg:items-end gap-4">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${badge.className}`}
                >
                  {badge.icon}
                  {badge.label}
                </span>

                <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentHistoryTab;
