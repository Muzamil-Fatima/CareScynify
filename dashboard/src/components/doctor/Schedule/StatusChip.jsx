import React from "react";

const StatusChip = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
        status === "confirmed"
          ? "bg-green-100 text-green-700 border-green-300"
          : status === "pending"
          ? "bg-yellow-100 text-yellow-700 border-yellow-300"
          : status === "completed"
          ? "bg-blue-100 text-blue-700 border-blue-300"
          : "bg-red-100 text-red-700 border-red-300"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusChip;