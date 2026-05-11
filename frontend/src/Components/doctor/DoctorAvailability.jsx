import React from "react";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const DoctorAvailability = ({ doctor }) => {
  const schedule = doctor?.schedule || [
    { day: "Monday", time: "5:00 PM - 8:00 PM", available: true },
    { day: "Tuesday", time: "3:00 PM - 7:00 PM", available: true },
    { day: "Wednesday", time: "-", available: false },
    { day: "Thursday", time: "4:00 PM - 8:00 PM", available: true },
    { day: "Friday", time: "2:00 PM - 6:00 PM", available: true },
    { day: "Saturday", time: "-", available: false },
    { day: "Sunday", time: "Emergency Only", available: true },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      
      {/* Header */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <EventAvailableOutlinedIcon fontSize="small" />
        Availability
      </h2>

      {/* Schedule */}
      <div className="space-y-3">
        {schedule.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-xl border ${
              item.available
                ? "bg-green-50 border-green-100"
                : "bg-gray-50 border-gray-100"
            }`}
          >
            {/* Day */}
            <div className="font-medium text-gray-700">
              {item.day}
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AccessTimeOutlinedIcon fontSize="small" />
              {item.time}
            </div>

            {/* Status */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                item.available
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {item.available ? "Available" : "Not Available"}
            </span>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="text-xs text-gray-400 mt-4 text-center">
        Schedule may change based on hospital emergencies
      </p>
    </div>
  );
};

export default DoctorAvailability;