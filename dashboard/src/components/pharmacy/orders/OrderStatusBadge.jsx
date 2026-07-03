import React from "react";

const OrderStatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "Confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "Preparing":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";

      case "Ready":
        return "bg-purple-100 text-purple-700 border-purple-200";

      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";

      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;