import React, { useState } from "react";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const DoctorAvailability = ({ doctor }) => {
  const workplaces = doctor?.workplaces || [];

  const [selectedWorkplace, setSelectedWorkplace] = useState(workplaces[0]);
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const availability = selectedWorkplace?.availability || {};

  const schedule = weekDays.map((day) => {
    const dayData = availability[day];

    return {
      day,
      time:
        dayData?.start && dayData?.end
          ? `${dayData.start} - ${dayData.end}`
          : "-",
      available: !!(dayData?.start && dayData?.end),
    };
  });
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <EventAvailableOutlinedIcon fontSize="small" />
        Availability
      </h2>
      <div className="flex gap-2 mb-5 overflow-x-auto">
        {workplaces.map((place) => (
          <button
            key={place._id}
            onClick={() => setSelectedWorkplace(place)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
              selectedWorkplace?._id === place._id
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {place.name}
          </button>
        ))}
      </div>
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
            <div className="font-medium text-gray-700">{item.day}</div>

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
        Schedule may change based on any kind of emergencies
      </p>
    </div>
  );
};

export default DoctorAvailability;