
import React from "react";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";

const AdminStatsCards = ({ stats = [] }) => {
  /**
   * Safely extract a value from API data.
   *
   * Supports:
   * 1. Primitive values:
   *    100
   *
   * 2. Statistic objects:
   *    {
   *      value: 100,
   *      change: "+10%",
   *      description: "Registered users"
   *    }
   */
  const normalizeStatistic = (
    statistic,
    fallbackValue = 0,
    fallbackDescription = "",
  ) => {
    if (
      statistic !== null &&
      typeof statistic === "object" &&
      !Array.isArray(statistic)
    ) {
      return {
        value:
          statistic.value !== undefined &&
          statistic.value !== null &&
          typeof statistic.value !== "object"
            ? statistic.value
            : fallbackValue,

        change:
          statistic.change !== undefined &&
          statistic.change !== null &&
          typeof statistic.change !== "object"
            ? statistic.change
            : "",

        description:
          statistic.description !== undefined &&
          statistic.description !== null &&
          typeof statistic.description !== "object"
            ? statistic.description
            : fallbackDescription,
      };
    }

    return {
      value:
        statistic !== undefined &&
        statistic !== null &&
        typeof statistic !== "object"
          ? statistic
          : fallbackValue,
      change: "",
      description: fallbackDescription,
    };
  };

  /**
   * Convert API stats into the format expected by the UI.
   */
  let statsArray = [];

  if (Array.isArray(stats)) {
    statsArray = stats.map((stat, index) => {
      if (!stat || typeof stat !== "object") {
        return {
          title: `Statistic ${index + 1}`,
          value:
            stat !== undefined &&
            stat !== null &&
            typeof stat !== "object"
              ? stat
              : 0,
          iconBg: "bg-blue-50",
          iconColor: "text-blue-600",
          change: "",
          changeColor: "text-blue-600",
          description: "",
        };
      }

      const normalized = normalizeStatistic(
        stat.value,
        0,
        stat.description || "",
      );

      return {
        ...stat,
        value: normalized.value,
        change:
          stat.change !== undefined &&
          stat.change !== null &&
          typeof stat.change !== "object"
            ? stat.change
            : normalized.change,
        description:
          typeof stat.description === "string"
            ? stat.description
            : normalized.description,
        iconBg:
          typeof stat.iconBg === "string" ? stat.iconBg : "bg-blue-50",
        iconColor:
          typeof stat.iconColor === "string"
            ? stat.iconColor
            : "text-blue-600",
        changeColor:
          typeof stat.changeColor === "string"
            ? stat.changeColor
            : "text-blue-600",
      };
    });
  } else if (stats && typeof stats === "object") {
    const totalUsers = normalizeStatistic(
      stats.totalUsers ?? stats.users ?? stats.totalUser,
      0,
      "Registered users",
    );

    const totalDoctors = normalizeStatistic(
      stats.totalDoctors ?? stats.doctors ?? stats.totalDoctor,
      0,
      "Registered doctors",
    );

    const appointments = normalizeStatistic(
      stats.appointments ??
        stats.totalAppointments ??
        stats.totalAppointment,
      0,
      "Total appointments",
    );

    const pendingVerifications = normalizeStatistic(
      stats.pendingVerifications ??
        stats.pendingVerification ??
        stats.pending,
      0,
      "Awaiting review",
    );

    statsArray = [
      {
        title: "Total Users",
        value: totalUsers.value,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        change:
          totalUsers.change ||
          (typeof stats.userGrowth === "string"
            ? stats.userGrowth
            : typeof stats.usersGrowth === "string"
              ? stats.usersGrowth
              : ""),
        changeColor: "text-blue-600",
        description:
          totalUsers.description || "Registered users",
      },

      {
        title: "Total Doctors",
        value: totalDoctors.value,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        change:
          totalDoctors.change ||
          (typeof stats.doctorGrowth === "string"
            ? stats.doctorGrowth
            : typeof stats.doctorsGrowth === "string"
              ? stats.doctorsGrowth
              : ""),
        changeColor: "text-purple-600",
        description:
          totalDoctors.description || "Registered doctors",
      },

      {
        title: "Appointments",
        value: appointments.value,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        change:
          appointments.change ||
          (typeof stats.appointmentGrowth === "string"
            ? stats.appointmentGrowth
            : typeof stats.appointmentsGrowth === "string"
              ? stats.appointmentsGrowth
              : ""),
        changeColor: "text-emerald-600",
        description:
          appointments.description || "Total appointments",
      },

      {
        title: "Pending Verifications",
        value: pendingVerifications.value,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
        change: pendingVerifications.change || "",
        changeColor: "text-amber-600",
        description:
          pendingVerifications.description || "Awaiting review",
      },
    ];
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsArray.map((stat, index) => {
          let Icon = PeopleAltRoundedIcon;

          if (stat.title === "Total Doctors") {
            Icon = MedicalServicesRoundedIcon;
          } else if (stat.title === "Appointments") {
            Icon = EventAvailableRoundedIcon;
          } else if (stat.title === "Pending Verifications") {
            Icon = PendingActionsRoundedIcon;
          }

          return (
            <div
              key={stat.title || index}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <div
                className="
                  absolute
                  -right-8
                  -top-8
                  h-24
                  w-24
                  rounded-full
                  bg-slate-50
                  transition-transform
                  duration-300
                  group-hover:scale-150
                "
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {typeof stat.title === "string" ? stat.title : ""}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                      {stat.value !== undefined &&
                      stat.value !== null &&
                      typeof stat.value !== "object"
                        ? stat.value
                        : 0}
                    </h3>
                  </div>

                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${
                        typeof stat.iconBg === "string"
                          ? stat.iconBg
                          : ""
                      }
                    `}
                  >
                    <Icon
                      className={
                        typeof stat.iconColor === "string"
                          ? stat.iconColor
                          : ""
                      }
                      sx={{ fontSize: 25 }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  {stat.change !== undefined &&
                    stat.change !== null &&
                    stat.change !== "" &&
                    typeof stat.change !== "object" && (
                      <span
                        className={`
                          rounded-md
                          bg-slate-50
                          px-2
                          py-1
                          text-xs
                          font-semibold
                          ${
                            typeof stat.changeColor === "string"
                              ? stat.changeColor
                              : ""
                          }
                        `}
                      >
                        {stat.change}
                      </span>
                    )}

                  <span className="text-xs text-slate-400">
                    {typeof stat.description === "string"
                      ? stat.description
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdminStatsCards;