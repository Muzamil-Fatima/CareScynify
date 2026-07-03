import React from "react";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import OrderStatusBadge from "./OrderStatusBadge";

const OrderRow = ({
  order,
  onView,
  onUpdateStatus,
}) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Order ID */}
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="font-semibold text-blue-600">
          #{order._id}
        </p>
      </td>

      {/* Patient */}
      <td className="px-6 py-4 whitespace-nowrap">
        <p className="font-medium text-gray-900">
          {order.patient?.name}
        </p>
      </td>

      {/* Items */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-gray-700">
          {order.items?.length || 0} Items
        </span>
      </td>

      {/* Amount */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-semibold text-gray-900">
          Rs. {order.totalAmount}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <OrderStatusBadge status={order.status} />
      </td>

      {/* Date */}
      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
        {new Date(order.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        })}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onView(order)}
            className="flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
          >
            <VisibilityRoundedIcon fontSize="small" />
            View
          </button>

          <button
            onClick={() => onUpdateStatus(order)}
            className="flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-600 transition hover:bg-green-100"
          >
            <EditRoundedIcon fontSize="small" />
            Status
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;