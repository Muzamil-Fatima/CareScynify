
import React from "react";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";

const StatsSection = ({ data }) => {
  const stats = [
    {
      title: "Today's Appointments",
      value: data?.todayAppointments || 0,
      growth: `${data?.pendingAppointments || 0} upcoming`,
      icon: <EventAvailableRoundedIcon />,
      color: "#4f46e5",
      bg: "#eef2ff",
    },
    {
      title: "Total Patients",
      value: data?.totalPatients || 0,
      growth: `${data?.completedAppointments || 0} treated`,
      icon: <PeopleAltRoundedIcon />,
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      title: "Monthly Revenue",
      value: `Rs ${(data?.monthlyRevenue || 0).toLocaleString()}`,
      growth: `${data?.completedAppointments || 0} completed appointments`,
      icon: <AttachMoneyRoundedIcon />,
      color: "#ea580c",
      bg: "#fff7ed",
    },
    {
      title: "Patient Reviews",
      value: data?.reviews || 0,
      growth: `${data?.averageRating || 0} ★ Average`,
      icon: <StarRoundedIcon />,
      color: "#eab308",
      bg: "#fefce8",
    },
    {
      title: "Workplaces",
      value: data?.totalWorkplaces || 0,
      growth: `${data?.onlineWorkplaces || 0} online available`,
      icon: <LocalHospitalRoundedIcon />,
      color: "#0891b2",
      bg: "#ecfeff",
    },
  ];

  return (
    <div
      className="grid grid-cols-[repeat(5,minmax(220px,1fr))] lg:grid-cols-5 gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-[10px] "
    >
      {stats.map((item, index) => (
        <div
          key={index}
          className="
            min-w-0
            rounded-[18px]
            border
            border-slate-200
            bg-white
            shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_20px_rgba(0,0,0,0.04)]
            transition-all
            duration-300
            ease-in-out
            hover:-translate-y-1
            hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]
          "
        >
          <div
            className="
              flex
              items-center
              p-3
              sm:p-4
              gap-3
              md:gap-4
            "
          >
            {/* Icon */}
            <div
              className="
                w-10
                h-10
                min-w-10
                sm:w-11.5
                sm:h-11.5
                sm:min-w-11.5
                md:w-13
                md:h-13
                md:min-w-13
                rounded-[14px]
                flex
                items-center
                justify-center
              "
              style={{
                backgroundColor: item.bg,
                color: item.color,
              }}
            >
              {React.cloneElement(item.icon, {
                sx: {
                  fontSize: "1.1rem",
                  "@media (min-width: 640px)": {
                    fontSize: "1.3rem",
                  },
                  "@media (min-width: 768px)": {
                    fontSize: "1.6rem",
                  },
                },
              })}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 self-start">
              {/* Title */}
              <div
                className="
                  text-slate-500
                  font-medium
                  whitespace-nowrap
                  overflow-hidden
                  text-ellipsis
                  text-[0.65rem]
                  sm:text-[0.75rem]
                  md:text-[0.85rem]
                  lg:text-[0.9rem]
                "
              >
                {item.title}
              </div>

              {/* Value */}
              <div
                className="
                  text-slate-900
                  font-bold
                  leading-[1.2]
                  mt-1
                  text-base
                  sm:text-[1.2rem]
                  md:text-[1.4rem]
                  lg:text-[1.6rem]
                "
              >
                {item.value}
              </div>

              {/* Growth */}
              {item.growth && (
                <div
                  className="
                    text-emerald-500
                    font-semibold
                    mt-1
                    text-[0.6rem]
                    sm:text-[0.7rem]
                    md:text-[0.8rem]
                  "
                >
                  {item.growth} this month
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;