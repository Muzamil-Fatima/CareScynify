import React, { useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";

const ClinicAppointmentCard = ({ clinic, onBook }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    onBook?.({
      clinic,
      date: selectedDate,
      time: selectedTime,
    });

    alert("Appointment booked successfully!");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">

      {/* Header */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <LocalHospitalOutlinedIcon fontSize="small" />
        Book Appointment
      </h2>

      {/* Fee */}
      <div className="text-sm text-gray-600">
        Consultation Fee:{" "}
        <span className="font-semibold text-purple-700">
          Rs. {clinic?.fee || 1500}
        </span>
      </div>

      {/* Date Picker */}
      <div>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <CalendarMonthOutlinedIcon fontSize="small" />
          Select Date
        </label>

        <input
          type="date"
          className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Time Slots */}
      <div>
        <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <AccessTimeOutlinedIcon fontSize="small" />
          Available Time Slots
        </label>

        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`text-sm py-2 rounded-lg border transition ${
                selectedTime === time
                  ? "bg-purple-600 text-white border-purple-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={handleBooking}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition"
      >
        Book Appointment
      </button>

      {/* Status */}
      <p className="text-xs text-gray-500 text-center">
        {clinic?.isOpen ? "Clinic is available today" : "Clinic is currently closed"}
      </p>
    </div>
  );
};

export default ClinicAppointmentCard;