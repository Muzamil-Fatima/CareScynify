import React from "react";

import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const OrdersStats = ({
  totalOrders = 0,
  pendingOrders = 0,
  confirmedOrders = 0,
  completedOrders = 0,
  cancelledOrders = 0,
}) => {
  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingBagRoundedIcon fontSize="large" />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: <PendingActionsRoundedIcon fontSize="large" />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Confirmed",
      value: confirmedOrders,
      icon: <CheckCircleRoundedIcon fontSize="large" />,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      title: "Completed",
      value: completedOrders,
      icon: <LocalShippingRoundedIcon fontSize="large" />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Cancelled",
      value: cancelledOrders,
      icon: <CancelRoundedIcon fontSize="large" />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>

            <div
              className={`h-14 w-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersStats;