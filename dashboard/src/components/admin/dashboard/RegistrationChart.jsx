
import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const RegistrationChart = ({
  registrationOverview = {},
  period = 7,
  onPeriodChange,
}) => {
  const registrationData = Array.isArray(registrationOverview?.data)
    ? registrationOverview.data
    : [];

  const handlePeriodChange = (event) => {
    const selectedPeriod = Number(event.target.value);

    if (typeof onPeriodChange === "function") {
      onPeriodChange(selectedPeriod);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Registration Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            User registrations across the platform
          </p>
        </div>

        {/* Filter */}
        <select
          className="
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-sm
            font-medium
            text-slate-600
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
          value={period}
          onChange={handlePeriodChange}
        >
          <option value={7}>Last 7 Months</option>
          <option value={12}>Last 12 Months</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-87.5 w-full">
        {registrationData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={registrationData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#64748b",
                  fontSize: 12,
                }}
                allowDecimals={false}
              />

              <Tooltip
                contentStyle={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
                labelStyle={{
                  color: "#0f172a",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                height={45}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="patients"
                name="Patients"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 6,
                }}
              />

              <Line
                type="monotone"
                dataKey="doctors"
                name="Doctors"
                stroke="#10b981"
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 6,
                }}
              />

              <Line
                type="monotone"
                dataKey="pharmacies"
                name="Pharmacies"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 6,
                }}
              />

              <Line
                type="monotone"
                dataKey="laboratories"
                name="Laboratories"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-500">
                No registration data available
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Registration data will appear here once available.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationChart;