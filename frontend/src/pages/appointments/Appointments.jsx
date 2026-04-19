import React, { useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Ahmed Khan",
      type: "General Checkup",
      date: "2026-04-22",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Ali",
      type: "Skin Consultation",
      date: "2026-03-18",
      time: "12:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      doctor: "Dr. Usman Tariq",
      type: "Cardiology",
      date: "2026-02-10",
      time: "09:30 AM",
      status: "Cancelled",
    },
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCancel = (id) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "Cancelled" } : a
    );
    setAppointments(updated);
  };

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Appointments
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your doctor appointments
          </p>
        </div>

        {/* Book Button */}
        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl">
          <AddCircleOutlineOutlinedIcon />
          Book Appointment
        </button>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {appointments.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* Doctor */}
            <div className="flex items-center gap-2 mb-3">
              <CalendarMonthOutlinedIcon className="text-purple-600" />
              <h2 className="text-lg font-semibold">{item.doctor}</h2>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p><b>Type:</b> {item.type}</p>
              <p><b>Date:</b> {item.date}</p>
              <p><b>Time:</b> {item.time}</p>
            </div>

            {/* Bottom */}
            <div className="flex justify-between items-center mt-4">

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                  item.status
                )}`}
              >
                {item.status}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2">

                {item.status === "Upcoming" && (
                  <button
                    onClick={() => handleCancel(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <CancelOutlinedIcon fontSize="small" />
                  </button>
                )}

                {item.status === "Completed" && (
                  <CheckCircleOutlineOutlinedIcon className="text-green-600" />
                )}

              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Appointments;