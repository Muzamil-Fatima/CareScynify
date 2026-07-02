import React from "react";
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
import { FaCapsules, FaShoppingCart, FaUsers, FaArrowUp } from "react-icons/fa";

const PharmacyDashboard = () => {
  const salesData = [
    { name: "Mon", sales: 400 },
    { name: "Tue", sales: 300 },
    { name: "Wed", sales: 600 },
    { name: "Thu", sales: 800 },
    { name: "Fri", sales: 500 },
    { name: "Sat", sales: 900 },
  ];

  const stockData = [
    { name: "Tablets", value: 400 },
    { name: "Syrups", value: 300 },
    { name: "Injections", value: 100 },
    { name: "Capsules", value: 200 },
  ];

  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="p-8 bg-[#f8f9fe] min-h-screen">
      <h1 className="text-4xl font-black text-blue-950 mb-8">
        System Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Daily Sales",
            val: "$2,450",
            icon: <FaShoppingCart />,
            color: "text-blue-600",
            bg: "bg-blue-100",
          },
          {
            label: "Total Stock",
            val: "1,240",
            icon: <FaCapsules />,
            color: "text-emerald-600",
            bg: "bg-emerald-100",
          },
          {
            label: "New Customers",
            val: "84",
            icon: <FaUsers />,
            color: "text-purple-600",
            bg: "bg-purple-100",
          },
          {
            label: "Revenue Growth",
            val: "+12.5%",
            icon: <FaArrowUp />,
            color: "text-orange-600",
            bg: "bg-orange-100",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-4xl shadow-sm flex items-center gap-4 transition-transform hover:scale-105"
          >
            <div className={`${item.bg} ${item.color} p-4 rounded-2xl`}>
              {item.icon}
            </div>
            <div>
              <p className="text-gray-400 font-bold text-xs uppercase">
                {item.label}
              </p>
              <h3 className="text-2xl font-black text-gray-800">{item.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Weekly Sales
          </h2>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#2563eb" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Stock Distribution
          </h2>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stockData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDashboard;
