import React from "react";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const pendingVerifications = [
  {
    id: 1,
    name: "Dr. Ahmed Khan",
    email: "ahmed.khan@example.com",
    type: "Doctor",
    submitted: "Today, 10:30 AM",
    status: "Pending",
    initials: "AK",
  },
  {
    id: 2,
    name: "HealthPlus Pharmacy",
    email: "healthplus@example.com",
    type: "Pharmacy",
    submitted: "Today, 09:15 AM",
    status: "Pending",
    initials: "HP",
  },
  {
    id: 3,
    name: "City Diagnostic Lab",
    email: "citylab@example.com",
    type: "Laboratory",
    submitted: "Yesterday, 04:20 PM",
    status: "Pending",
    initials: "CD",
  },
  {
    id: 4,
    name: "Dr. Sara Malik",
    email: "sara.malik@example.com",
    type: "Doctor",
    submitted: "Yesterday, 02:45 PM",
    status: "Pending",
    initials: "SM",
  },
];

const typeStyles = {
  Doctor: "bg-blue-50 text-blue-600",
  Pharmacy: "bg-purple-50 text-purple-600",
  Laboratory: "bg-amber-50 text-amber-600",
};

const PendingVerifications = () => {
  const handleView = (item) => {
    console.log("View verification:", item);
  };

  const handleApprove = (item) => {
    console.log("Approve verification:", item);
  };

  const handleReject = (item) => {
    console.log("Reject verification:", item);
  };

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Pending Verifications
            </h2>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
              {pendingVerifications.length} Pending
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Review and manage pending verification requests
          </p>
        </div>

        <button
          type="button"
          className="
            w-fit
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

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-200">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Applicant
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Type
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Submitted
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {pendingVerifications.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 last:border-b-0 transition hover:bg-slate-50/60"
              >
                {/* Applicant */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                      {item.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {item.name}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        {item.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${typeStyles[item.type]}`}
                  >
                    {item.type}
                  </span>
                </td>

                {/* Submitted */}
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-500">
                    {item.submitted}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />

                    <span className="text-sm font-medium text-amber-600">
                      {item.status}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {/* View */}
                    <button
                      type="button"
                      onClick={() => handleView(item)}
                      title="View"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-500
                        transition
                        hover:bg-slate-100
                        hover:text-slate-700
                      "
                    >
                      <VisibilityRoundedIcon sx={{ fontSize: 19 }} />
                    </button>

                    {/* Approve */}
                    <button
                      type="button"
                      onClick={() => handleApprove(item)}
                      title="Approve"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        text-emerald-500
                        transition
                        hover:bg-emerald-50
                        hover:text-emerald-600
                      "
                    >
                      <CheckCircleRoundedIcon sx={{ fontSize: 20 }} />
                    </button>

                    {/* Reject */}
                    <button
                      type="button"
                      onClick={() => handleReject(item)}
                      title="Reject"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        text-red-400
                        transition
                        hover:bg-red-50
                        hover:text-red-500
                      "
                    >
                      <CancelRoundedIcon sx={{ fontSize: 20 }} />
                    </button>

                    {/* More */}
                    <button
                      type="button"
                      title="More"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-slate-600
                      "
                    >
                      <MoreHorizRoundedIcon sx={{ fontSize: 21 }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-slate-100 md:hidden">
        {pendingVerifications.map((item) => (
          <div key={item.id} className="p-4">
            {/* Applicant */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                  {item.initials}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {item.name}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {item.email}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${typeStyles[item.type]}`}
              >
                {item.type}
              </span>
            </div>

            {/* Details */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Submitted</p>

                <p className="mt-1 text-sm font-medium text-slate-600">
                  {item.submitted}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Status</p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />

                  <span className="text-sm font-medium text-amber-600">
                    Pending
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => handleView(item)}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  py-2
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-slate-50
                "
              >
                <VisibilityRoundedIcon sx={{ fontSize: 18 }} />
                View
              </button>

              <button
                type="button"
                onClick={() => handleApprove(item)}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-emerald-50
                  px-3
                  py-2
                  text-sm
                  font-semibold
                  text-emerald-600
                  transition
                  hover:bg-emerald-100
                "
              >
                <CheckCircleRoundedIcon sx={{ fontSize: 18 }} />
                Approve
              </button>

              <button
                type="button"
                onClick={() => handleReject(item)}
                className="
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-50
                  px-3
                  py-2
                  text-red-500
                  transition
                  hover:bg-red-100
                "
              >
                <CancelRoundedIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {pendingVerifications.length === 0 && (
        <div className="px-5 py-12 text-center">
          <CheckCircleRoundedIcon
            className="text-emerald-500"
            sx={{ fontSize: 45 }}
          />

          <h3 className="mt-3 text-base font-semibold text-slate-800">
            All caught up!
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            There are no pending verification requests.
          </p>
        </div>
      )}
    </section>
  );
};

export default PendingVerifications;