import React, { useState } from "react";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";

const AppointmentCard = ({ doctor }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="w-full md:w-[340px] bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
          {doctor?.user?.name?.charAt(0) || "D"}
        </div>

        <div>
          <h2 className="font-semibold text-gray-800">
            {doctor?.user?.name || "Doctor Name"}
          </h2>
          <p className="text-sm text-gray-500">
            {doctor?.specialization || "Specialist"}
          </p>
        </div>
      </div>

      {/* Fee */}
      <div className="flex items-center justify-between bg-purple-50 p-3 rounded-xl mb-4">
        <span className="text-sm text-gray-600">Consultation Fee</span>
        <span className="font-semibold text-purple-700">
          Rs. {doctor?.workplaces?.[0]?.settings?.appointmentFee || 2000}
        </span>
      </div>

      {/* Availability */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Available Slots
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          {["Mon", "Tue", "Wed", "Fri"].map((day) => (
            <span
              key={day}
              className="px-3 py-1 bg-gray-100 rounded-full text-gray-600"
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Date */}
      <div className="mb-3">
        <label className="text-sm text-gray-600 flex items-center gap-1 mb-1">
          <EventAvailableOutlinedIcon fontSize="small" />
          Select Date
        </label>
        <input
          type="date"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Time */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 flex items-center gap-1 mb-1">
          <AccessTimeOutlinedIcon fontSize="small" />
          Select Time
        </label>

        <select
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">Choose time</option>
          <option>10:00 AM</option>
          <option>12:00 PM</option>
          <option>03:00 PM</option>
          <option>06:00 PM</option>
        </select>
      </div>

      {/* Book Button */}
      <button
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl font-medium transition"
        onClick={() => {
          if (!date || !time) {
            alert("Please select date and time");
            return;
          }

          alert(
            `Appointment booked with ${doctor?.user?.name} on ${date} at ${time}`,
          );
        }}
      >
        Book Appointment
      </button>

      {/* Info */}
      <p className="text-xs text-gray-400 text-center mt-3">
        You can reschedule anytime before 2 hours
      </p>
    </div>
  );
};

export default AppointmentCard;
