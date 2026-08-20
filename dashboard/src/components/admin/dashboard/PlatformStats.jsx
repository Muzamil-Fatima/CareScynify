
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

const chartColors = [
  "#2563eb",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
];

const iconConfig = {
  Patients: {
    icon: PeopleAltRoundedIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },

  Doctors: {
    icon: MedicalServicesRoundedIcon,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },

  Pharmacies: {
    icon: LocalPharmacyRoundedIcon,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },

  Laboratories: {
    icon: ScienceRoundedIcon,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },

  Appointments: {
    icon: EventAvailableRoundedIcon,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },

  Prescriptions: {
    icon: MedicationRoundedIcon,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
};

const PlatformStats = ({
  platformDistribution,
  platformGrowth,

  // Backward-compatible props
  data,
  growth,
}) => {
  /*
   * Backend:
   *
   * platformDistribution: {
   *   total: number,
   *   data: [...]
   * }
   *
   * We also support:
   *
   * data: [...]
   */

  let rawPlatformData = [];

  let backendTotal = 0;

  /*
   * Case 1:
   * platformDistribution = {
   *   total,
   *   data
   * }
   */
  if (
    platformDistribution &&
    typeof platformDistribution === "object" &&
    !Array.isArray(platformDistribution)
  ) {
    backendTotal = Number(platformDistribution.total) || 0;

    if (Array.isArray(platformDistribution.data)) {
      rawPlatformData = platformDistribution.data;
    }
  }

  /*
   * Case 2:
   * data = [...]
   */
  if (rawPlatformData.length === 0 && Array.isArray(data)) {
    rawPlatformData = data;
  }

  /*
   * Case 3:
   * Sometimes parent may accidentally pass:
   *
   * data={dashboardData?.platformDistribution}
   *
   * Handle that too.
   */
  if (
    rawPlatformData.length === 0 &&
    data &&
    typeof data === "object" &&
    !Array.isArray(data)
  ) {
    if (Array.isArray(data.data)) {
      rawPlatformData = data.data;
      backendTotal = Number(data.total) || 0;
    }
  }

  /*
   * Normalize backend data
   */
  const platformData = rawPlatformData.map((item) => {
    const title =
      item?.title ||
      item?.name ||
      "Unknown";

    const config =
      iconConfig[title] || {
        icon: PeopleAltRoundedIcon,
        iconBg: "bg-slate-50",
        iconColor: "text-slate-600",
      };

    const value = Number(item?.value) || 0;

    const percentage = Number(item?.percentage) || 0;

    return {
      ...item,
      title,
      value,
      percentage,
      ...config,
    };
  });

  /*
   * Pie chart data
   */
  const chartData = platformData
    .filter((item) => item.value > 0)
    .map((item) => ({
      name: item.title,
      value: item.percentage,
    }));

  /*
   * Total
   */
  const total =
    backendTotal > 0
      ? backendTotal
      : platformData.reduce(
          (sum, item) => sum + item.value,
          0
        );

  /*
   * Growth
   *
   * Backend:
   *
   * platformGrowth: {
   *   value,
   *   formatted,
   *   description
   * }
   */

  const actualGrowth =
    platformGrowth ?? growth ?? null;

  const growthValue =
    typeof actualGrowth === "object" &&
    actualGrowth !== null
      ? Number(actualGrowth.value) || 0
      : Number(actualGrowth) || 0;

  const growthFormatted =
    typeof actualGrowth === "object" &&
    actualGrowth?.formatted
      ? actualGrowth.formatted
      : `${growthValue >= 0 ? "+" : ""}${growthValue}%`;

  const growthDescription =
    typeof actualGrowth === "object" &&
    actualGrowth?.description
      ? actualGrowth.description
      : "Compared with the previous month";

  const formattedTotal =
    total >= 1000
      ? `${(total / 1000).toFixed(1)}K`
      : total.toLocaleString();

  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
      {/* =========================================
          PLATFORM DISTRIBUTION
      ========================================= */}
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
          {chartData.length > 0 ? (
            <>
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
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
                    {chartData.map(
                      (entry, index) => (
                        <Cell
                          key={`${entry.name}-${index}`}
                          fill={
                            chartColors[
                              index %
                                chartColors.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip
                    formatter={(value) => [
                      `${value}%`,
                      "Share",
                    ]}
                    contentStyle={{
                      border:
                        "1px solid #e2e8f0",
                      borderRadius: "12px",
                      backgroundColor:
                        "#ffffff",
                      boxShadow:
                        "0 8px 24px rgba(15, 23, 42, 0.08)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center */}
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
                  {formattedTotal}
                </span>

                <span className="text-xs text-slate-400">
                  Total
                </span>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-600">
                  No platform data
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Statistics will appear here when
                  available.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        {platformData.length > 0 && (
          <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            {platformData.map(
              (item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex items-center gap-2"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        chartColors[
                          index %
                            chartColors.length
                        ],
                    }}
                  />

                  <span className="text-xs text-slate-500">
                    {item.title}
                  </span>

                  <span className="ml-auto text-xs font-semibold text-slate-700">
                    {item.percentage}%
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* =========================================
          PLATFORM STATISTICS
      ========================================= */}
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

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {platformData.length > 0 ? (
            platformData.map(
              (item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={`${item.title}-${index}`}
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
                        className={
                          item.iconColor
                        }
                        sx={{
                          fontSize: 22,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-500">
                        {item.title}
                      </p>

                      <div className="mt-1 flex items-center justify-between gap-2">
                        <h3 className="text-xl font-bold text-slate-900">
                          {item.value.toLocaleString()}
                        </h3>

                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="col-span-full rounded-xl border border-slate-100 p-6 text-center">
              <p className="text-sm font-semibold text-slate-600">
                No statistics available
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Platform statistics will appear here
                when available.
              </p>
            </div>
          )}
        </div>

        {/* =========================================
            PLATFORM GROWTH
        ========================================= */}
        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Platform Growth
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {growthDescription}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xl font-bold ${
                  growthValue >= 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {growthFormatted}
              </span>

              <span className="text-xs font-medium text-slate-400">
                this month
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full ${
                growthValue >= 0
                  ? "bg-emerald-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${Math.min(
                  Math.abs(growthValue),
                  100
                )}%`,
              }}
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