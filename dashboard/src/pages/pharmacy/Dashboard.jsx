
import React from "react";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import {
  FaCapsules,
  FaClipboardList,
  FaUsers,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import usePharmacyDashboard from "../../hooks/pharmacy/usePharmacyDashboard";
const Dashboard = () => {
  const {
    dashboard,
    loading,
    error,
  } = usePharmacyDashboard();

  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  const {
    stats: dashboardStats,
    salesData,
    inventoryData,
    recentOrders,
  } = dashboard;

  const COLORS = [
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#06b6d4",
    "#64748b",
  ];

  const stats = [
    {
      title: "Total Medicines",

      value:
        dashboardStats.totalMedicines.toLocaleString(),

      icon: <Inventory2RoundedIcon />,

      style:
        "bg-purple-50 text-purple-600",
    },

    {
      title: "Total Orders",

      value:
        dashboardStats.totalOrders.toLocaleString(),

      icon: <ShoppingBagRoundedIcon />,

      style:
        "bg-blue-50 text-blue-600",
    },

    {
      title: "Customers",

      value:
        dashboardStats.customers.toLocaleString(),

      icon: <PeopleAltRoundedIcon />,

      style:
        "bg-green-50 text-green-600",
    },

    {
      title: "Revenue",

      value: `Rs. ${dashboardStats.revenue.toLocaleString()}`,

      icon: <TrendingUpRoundedIcon />,

      style:
        "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div>
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Pharmacy Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage medicines, orders and pharmacy performance
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${item.style}`}
              >
                {item.icon}
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                  {item.value}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Sales */}

        <div className="rounded-3xl border border-slate-200 bg-white p-5">

          <h2 className="font-semibold text-slate-900">
            Weekly Sales
          </h2>

          <p className="mb-5 text-sm text-slate-500">
            Order revenue overview
          </p>

          <div className="h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={salesData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="sales"
                  fill="#6366f1"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Inventory */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">
            Medicine Inventory
          </h2>
          <p className="mb-5 text-sm text-slate-500">
            Stock category distribution
          </p>
          <div className="h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={inventoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                >
                  {inventoryData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-900">
          Recent Activity
        </h2>
        <div className="mt-4 space-y-3">
          {recentOrders.length === 0 ? (
            <p className="text-sm text-slate-500">
              No recent orders.
            </p>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm last:border-0"
              >
                <div>
                  <p className="font-medium text-slate-700">
                    New order received
                  </p>
                  <span className="text-blue-600">
                    {order.orderId}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-700">
                    Rs.{" "}
                    {order.totalAmount.toLocaleString()}
                  </p>
                  <span className="text-xs text-slate-500">
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};
export default Dashboard;