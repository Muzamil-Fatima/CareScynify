
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

const Dashboard = () => {
  const salesData = [
    { name: "Mon", sales: 400 },
    { name: "Tue", sales: 650 },
    { name: "Wed", sales: 500 },
    { name: "Thu", sales: 900 },
    { name: "Fri", sales: 700 },
    { name: "Sat", sales: 1100 },
  ];

  const inventoryData = [
    {
      name: "Tablets",
      value: 450,
    },
    {
      name: "Syrup",
      value: 200,
    },
    {
      name: "Capsules",
      value: 300,
    },
    {
      name: "Injection",
      value: 100,
    },
  ];

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

  const stats = [
    {
      title: "Total Medicines",
      value: "1,240",
      icon: <Inventory2RoundedIcon />,
      style: "bg-purple-50 text-purple-600",
    },

    {
      title: "Total Orders",
      value: "356",
      icon: <ShoppingBagRoundedIcon />,
      style: "bg-blue-50 text-blue-600",
    },

    {
      title: "Customers",
      value: "842",
      icon: <PeopleAltRoundedIcon />,
      style: "bg-green-50 text-green-600",
    },

    {
      title: "Revenue",
      value: "$12,450",
      icon: <TrendingUpRoundedIcon />,
      style: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-5 lg:px-6">
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

        <div
          className="
grid 
grid-cols-1 
sm:grid-cols-2 
xl:grid-cols-4 
gap-5
"
        >
          {stats.map((item, index) => (
            <div
              key={index}
              className="
rounded-3xl
border
border-slate-200
bg-white
p-5
flex
items-center
gap-4
"
            >
              <div
                className={`
h-12
w-12
rounded-2xl
flex
items-center
justify-center
text-xl
${item.style}
`}
              >
                {item.icon}
              </div>

              <div>
                <p className="text-sm text-slate-500">{item.title}</p>

                <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                  {item.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}

        <div
          className="
grid 
grid-cols-1 
lg:grid-cols-2 
gap-6 
mt-6
"
        >
          {/* Sales */}

          <div
            className="
rounded-3xl
border
border-slate-200
bg-white
p-5
"
          >
            <h2
              className="text-lg font-semibold text-slate-900"
            >
              Weekly Sales
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Order revenue overview
            </p>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="sales" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Inventory */}

          <div
            className="
rounded-3xl
border
border-slate-200
bg-white
p-5
"
          >
            <h2
              className="
text-lg
font-semibold
text-slate-900
"
            >
              Medicine Inventory
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Stock category distribution
            </p>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                  >
                    {inventoryData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}

        <div
          className="
mt-6
rounded-3xl
border
border-slate-200
bg-white
p-5
"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h2>

          <div className="mt-4 space-y-3">
            <div
              className="
flex
justify-between
border-b
pb-3
text-sm
"
            >
              <span className="text-slate-600">New order received</span>

              <span className="text-blue-600">ORD-10245</span>
            </div>

            <div
              className="
flex
justify-between
border-b
pb-3
text-sm
"
            >
              <span className="text-slate-600">Medicine stock updated</span>

              <span className="text-green-600">Paracetamol</span>
            </div>

            <div
              className="
flex
justify-between
text-sm
"
            >
              <span className="text-slate-600">Prescription uploaded</span>

              <span className="text-purple-600">Patient</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
