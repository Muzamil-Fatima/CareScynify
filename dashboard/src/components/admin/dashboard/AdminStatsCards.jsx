import React from "react";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";

const stats = [
  {
    title: "Total Users",
    value: "12,540",
    change: "+12.5%",
    description: "vs last month",
    icon: PeopleAltRoundedIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    changeColor: "text-emerald-600",
  },
  {
    title: "Total Doctors",
    value: "1,284",
    change: "+8.2%",
    description: "vs last month",
    icon: MedicalServicesRoundedIcon,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    changeColor: "text-emerald-600",
  },
  {
    title: "Appointments",
    value: "8,642",
    change: "+15.8%",
    description: "vs last month",
    icon: EventAvailableRoundedIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    changeColor: "text-emerald-600",
  },
  {
    title: "Pending Verifications",
    value: "126",
    change: "-4.3%",
    description: "vs last month",
    icon: PendingActionsRoundedIcon,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    changeColor: "text-red-500",
  },
];

const AdminStatsCards = () => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
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
              {/* Decorative background */}
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
                {/* Top section */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${stat.iconBg}
                    `}
                  >
                    <Icon
                      className={`${stat.iconColor}`}
                      sx={{ fontSize: 25 }}
                    />
                  </div>
                </div>

                {/* Bottom section */}
                <div className="mt-5 flex items-center gap-2">
                  <span
                    className={`
                      rounded-md
                      bg-slate-50
                      px-2
                      py-1
                      text-xs
                      font-semibold
                      ${stat.changeColor}
                    `}
                  >
                    {stat.change}
                  </span>

                  <span className="text-xs text-slate-400">
                    {stat.description}
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