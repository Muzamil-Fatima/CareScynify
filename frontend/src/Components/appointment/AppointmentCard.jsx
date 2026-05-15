import React from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AppointmentCard = ({ item, onCancel }) => {

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-3">

      {/* Top */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {item.name}
          </h2>
          <p className="text-sm text-gray-500">{item.department}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(
            item.status
          )}`}
        >
          {item.status}
        </span>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-600 space-y-1">

        <div className="flex items-center gap-2">
          <LocationOnIcon fontSize="small" />
          {item.location}
        </div>

        <div className="flex items-center gap-2">
          <EventAvailableIcon fontSize="small" />
          {item.date} at {item.time}
        </div>

        <p>
          Mode: <b>{item.mode}</b>
        </p>

      </div>

      {/* Actions */}
      <div className="flex justify-end">

        {item.status !== "cancelled" &&
         item.status !== "completed" && (
          <button
            onClick={() => onCancel(item.id)}
            className="flex items-center gap-1 text-red-600"
          >
            <CancelIcon fontSize="small" />
            Cancel
          </button>
        )}

      </div>

    </div>
  );
};

export default AppointmentCard;