import React from "react";

import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const activities = [
  {
    id: 1,
    type: "user",
    title: "New patient registered",
    description: "Ayesha Malik created a new patient account.",
    time: "5 minutes ago",
    icon: PersonAddAltRoundedIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    type: "appointment",
    title: "New appointment booked",
    description: "Appointment booked with Dr. Ahmed Khan.",
    time: "18 minutes ago",
    icon: EventAvailableRoundedIcon,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: 3,
    type: "verification",
    title: "Doctor verified",
    description: "Dr. Sara Malik has been successfully verified.",
    time: "42 minutes ago",
    icon: VerifiedRoundedIcon,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 4,
    type: "prescription",
    title: "Prescription created",
    description: "A new prescription was generated for a patient.",
    time: "1 hour ago",
    icon: MedicalInformationRoundedIcon,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: 5,
    type: "pharmacy",
    title: "Pharmacy registration submitted",
    description: "HealthPlus Pharmacy submitted verification documents.",
    time: "2 hours ago",
    icon: LocalPharmacyRoundedIcon,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    id: 6,
    type: "laboratory",
    title: "Laboratory registered",
    description: "City Diagnostic Lab joined the platform.",
    time: "3 hours ago",
    icon: ScienceRoundedIcon,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
];

const RecentActivity = () => {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest activities across the platform
          </p>
        </div>

        <button
          type="button"
          className="
            rounded-lg
            px-3
            py-2
            text-sm
            font-semibold
            text-blue-600
            transition
            hover:bg-blue-50
          "
        >
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="p-5">
        <div className="relative">
          {/* Timeline line */}
          <div
            className="
              absolute
              bottom-5
              left-5
              top-5
              hidden
              w-px
              bg-slate-200
              sm:block
            "
          />

          <div className="space-y-6">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.id}
                  className="relative flex gap-4"
                >
                  {/* Icon */}
                  <div
                    className={`
                      relative
                      z-10
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      ${activity.iconBg}
                    `}
                  >
                    <Icon
                      className={activity.iconColor}
                      sx={{ fontSize: 20 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                          {activity.title}
                        </h3>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                          {activity.description}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs font-medium text-slate-400">
                        {activity.time}
                      </span>
                    </div>
                  </div>

                  {/* More button */}
                  <button
                    type="button"
                    title="More"
                    className="
                      hidden
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      text-slate-400
                      transition
                      hover:bg-slate-100
                      hover:text-slate-600
                      sm:flex
                    "
                  >
                    <MoreHorizRoundedIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-5 py-4">
        <button
          type="button"
          className="
            w-full
            rounded-lg
            border
            border-slate-200
            px-4
            py-2.5
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
          "
        >
          View All Activities
        </button>
      </div>
    </section>
  );
};

export default RecentActivity;