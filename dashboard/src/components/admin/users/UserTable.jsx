import React from "react";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const ROLE_CONFIG = {
  doctor: {
    label: "Doctor",
    icon: MedicalServicesRoundedIcon,
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  patient: {
    label: "Patient",
    icon: PeopleAltRoundedIcon,
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  pharmacy: {
    label: "Pharmacy",
    icon: LocalPharmacyRoundedIcon,
    className: "bg-purple-50 text-purple-700 border-purple-100",
  },
  laboratory: {
    label: "Laboratory",
    icon: ScienceRoundedIcon,
    className: "bg-orange-50 text-orange-700 border-orange-100",
  },
  admin: {
    label: "Admin",
    icon: PersonRoundedIcon,
    className: "bg-gray-100 text-gray-700 border-gray-200",
  },
};

const VERIFICATION_CONFIG = {
  verified: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    dotClassName: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-100",
    dotClassName: "bg-amber-500",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-700 border-red-100",
    dotClassName: "bg-red-500",
  },
};

const STATUS_CONFIG = {
  active: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    dotClassName: "bg-emerald-500",
  },
  suspended: {
    label: "Suspended",
    className: "bg-red-50 text-red-700 border-red-100",
    dotClassName: "bg-red-500",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-700 border-gray-200",
    dotClassName: "bg-gray-400",
  },
};

const getInitials = (name = "") => {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return "U";
  }

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const UserTable = ({ users = [], onViewUser }) => {
  const handleView = (user) => {
    if (typeof onViewUser === "function") {
      onViewUser(user);
    }
  };

  /* 
     Empty State
   */

  if (!users.length) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <PeopleAltRoundedIcon
              className="text-gray-400"
              sx={{ fontSize: 30 }}
            />
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            No users found
          </h3>

          <p className="mt-1 max-w-sm text-sm text-gray-500">
            There are no users matching your current search or filter
            criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* 
          Desktop Table
      - */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                User
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Role
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Contact
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Verification
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Status
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Registered
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {users.map((user) => {
              const role = user.role?.toLowerCase() || "unknown";

              const roleConfig =
                ROLE_CONFIG[role] || {
                  label: role
                    ? role.charAt(0).toUpperCase() + role.slice(1)
                    : "Unknown",
                  icon: PersonRoundedIcon,
                  className:
                    "bg-gray-100 text-gray-700 border-gray-200",
                };

              const RoleIcon = roleConfig.icon;

              const verification =
                user.verificationStatus?.toLowerCase() || "pending";

              const verificationConfig =
                VERIFICATION_CONFIG[verification] ||
                VERIFICATION_CONFIG.pending;

              const status = user.status?.toLowerCase() || "inactive";

              const statusConfig =
                STATUS_CONFIG[status] || STATUS_CONFIG.inactive;

              return (
                <tr
                  key={String(user._id || user.userId)}
                  className="transition hover:bg-gray-50"
                >
                  {/* User */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      {user.avatar?.url ? (
                        <img
                          src={user.avatar.url}
                          alt={user.name || "User"}
                          className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-100"
                        />
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                          {getInitials(user.name)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {user.name || "Unnamed User"}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          ID:{" "}
                          {user.userId ||
                            user._id ||
                            "—"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${roleConfig.className}`}
                    >
                      <RoleIcon sx={{ fontSize: 15 }} />

                      {roleConfig.label}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">
                    <div className="max-w-55">
                      <p
                        className="truncate text-sm font-medium text-gray-800"
                        title={user.email || ""}
                      >
                        {user.email || "—"}
                      </p>

                      <p
                        className="mt-1 truncate text-xs text-gray-500"
                        title={user.phone || ""}
                      >
                        {user.phone || "No phone"}
                      </p>
                    </div>
                  </td>

                  {/* Verification */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${verificationConfig.className}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${verificationConfig.dotClassName}`}
                      />

                      {verificationConfig.label}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusConfig.className}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotClassName}`}
                      />

                      {statusConfig.label}
                    </span>
                  </td>

                  {/* Created */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {formatDate(user.createdAt)}
                  </td>

                  {/* Action */}
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleView(user)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <VisibilityRoundedIcon
                        sx={{ fontSize: 16 }}
                      />

                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 
          Mobile / Tablet Cards
      - */}

      <div className="divide-y divide-gray-100 lg:hidden">
        {users.map((user) => {
          const role = user.role?.toLowerCase() || "unknown";

          const roleConfig =
            ROLE_CONFIG[role] || {
              label: role
                ? role.charAt(0).toUpperCase() + role.slice(1)
                : "Unknown",
              icon: PersonRoundedIcon,
              className:
                "bg-gray-100 text-gray-700 border-gray-200",
            };

          const RoleIcon = roleConfig.icon;

          const verification =
            user.verificationStatus?.toLowerCase() || "pending";

          const verificationConfig =
            VERIFICATION_CONFIG[verification] ||
            VERIFICATION_CONFIG.pending;

          const status = user.status?.toLowerCase() || "inactive";

          const statusConfig =
            STATUS_CONFIG[status] || STATUS_CONFIG.inactive;

          return (
            <div
              key={String(user._id || user.userId)}
              className="p-4 transition hover:bg-gray-50 sm:p-5"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {user.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      alt={user.name || "User"}
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-gray-100"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                      {getInitials(user.name)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {user.name || "Unnamed User"}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      ID:{" "}
                      {user.userId ||
                        user._id ||
                        "—"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleView(user)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  title="View user"
                >
                  <VisibilityRoundedIcon
                    sx={{ fontSize: 18 }}
                  />
                </button>
              </div>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${roleConfig.className}`}
                >
                  <RoleIcon sx={{ fontSize: 14 }} />

                  {roleConfig.label}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${verificationConfig.className}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${verificationConfig.dotClassName}`}
                  />

                  {verificationConfig.label}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusConfig.className}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotClassName}`}
                  />

                  {statusConfig.label}
                </span>
              </div>

              {/* Details */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 truncate text-sm text-gray-700">
                    {user.email || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {user.phone || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Registered
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {formatDate(user.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Account Verified
                  </p>

                  <p className="mt-1 text-sm text-gray-700">
                    {user.isVerified ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 
          Footer
      - */}

      <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 sm:px-6">
        <p className="text-xs text-gray-500">
          Showing {users.length} user
          {users.length === 1 ? "" : "s"} on this page
        </p>
      </div>
    </div>
  );
};

export default UserTable;