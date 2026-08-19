import React from "react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";

const platformData = [
  {
    title: "Patients",
    value: "10,876",
    percentage: "68%",
    icon: PeopleAltRoundedIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Doctors",
    value: "1,284",
    percentage: "12%",
    icon: MedicalServicesRoundedIcon,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Pharmacies",
    value: "428",
    percentage: "8%",
    icon: LocalPharmacyRoundedIcon,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Laboratories",
    value: "216",
    percentage: "5%",
    icon: ScienceRoundedIcon,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "Appointments",
    value: "8,642",
    percentage: "5%",
    icon: EventAvailableRoundedIcon,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    title: "Prescriptions",
    value: "4,328",
    percentage: "2%",
    icon: MedicationRoundedIcon,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
];

const chartData = [
  {
    name: "Patients",
    value: 68,
  },
  {
    name: "Doctors",
    value: 12,
  },
  {
    name: "Pharmacies",
    value: 8,
  },
  {
    name: "Laboratories",
    value: 5,
  },
  {
    name: "Appointments",
    value: 5,
  },
  {
    name: "Prescriptions",
    value: 2,
  },
];

const chartColors = [
  "#2563eb",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
];

const PlatformStats = () => {
  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
      {/* Platform Distribution */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
        {/* Header */}
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Platform Distribution
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Overview of platform users and services
          </p>
        </div>

        {/* Chart */}
        <div className="relative mt-4 h-70">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={chartColors[index]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [`${value}%`, "Share"]}
                contentStyle={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              flex
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
            "
          >
            <span className="text-2xl font-bold text-slate-900">
              18.2K
            </span>

            <span className="text-xs text-slate-400">
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
          {chartData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center gap-2"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: chartColors[index],
                }}
              />

              <span className="text-xs text-slate-500">
                {item.name}
              </span>

              <span className="ml-auto text-xs font-semibold text-slate-700">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-3">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Platform Statistics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current numbers across CareScynify
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {platformData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  border
                  border-slate-100
                  p-4
                  transition-all
                  duration-300
                  hover:border-slate-200
                  hover:bg-slate-50
                "
              >
                {/* Icon */}
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${item.iconBg}
                  `}
                >
                  <Icon
                    className={item.iconColor}
                    sx={{ fontSize: 22 }}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.value}
                    </h3>

                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                      {item.percentage}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Summary */}
        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Platform Growth
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Compared with the previous month
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-600">
                +14.8%
              </span>

              <span className="text-xs font-medium text-slate-400">
                this month
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="
                h-full
                w-[74%]
                rounded-full
                bg-emerald-500
              "
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>Previous month</span>
            <span>Current growth</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;