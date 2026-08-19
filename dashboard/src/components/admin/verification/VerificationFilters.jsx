import React from "react";

import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const VerificationFilters = ({
  filters = {
    role: "all",
    verificationType: "all",
    status: "all",
  },
  onFilterChange,
  onReset,
}) => {
  const handleChange = (field, value) => {
    onFilterChange?.(field, value);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <FilterAltRoundedIcon
              className="text-blue-600"
              sx={{ fontSize: 20 }}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Verification Filters
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Filter verification requests by role, type, and status.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <RestartAltRoundedIcon sx={{ fontSize: 16 }} />
          Reset
        </button>
      </div>

      {/* Filter Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Role */}
        <div>
          <label
            htmlFor="verification-role"
            className="mb-2 block text-xs font-semibold text-gray-700"
          >
            Applicant Role
          </label>

          <div className="relative">
            <select
              id="verification-role"
              value={filters.role}
              onChange={(e) =>
                handleChange("role", e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Roles</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="laboratory">Laboratory</option>
              <option value="patient">Patient</option>
            </select>

            <KeyboardArrowDownRoundedIcon
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              sx={{ fontSize: 20 }}
            />
          </div>
        </div>

        {/* Verification Type */}
        <div>
          <label
            htmlFor="verification-type"
            className="mb-2 block text-xs font-semibold text-gray-700"
          >
            Verification Type
          </label>

          <div className="relative">
            <select
              id="verification-type"
              value={filters.verificationType}
              onChange={(e) =>
                handleChange(
                  "verificationType",
                  e.target.value
                )
              }
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">
                All Verification Types
              </option>

              <option value="cnic">
                CNIC Verification
              </option>

              <option value="medical_license">
                Medical License
              </option>

              <option value="pharmacy_license">
                Pharmacy License
              </option>

              <option value="laboratory_license">
                Laboratory License
              </option>

              <option value="professional_documents">
                Professional Documents
              </option>
            </select>

            <KeyboardArrowDownRoundedIcon
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              sx={{ fontSize: 20 }}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="verification-status"
            className="mb-2 block text-xs font-semibold text-gray-700"
          >
            Request Status
          </label>

          <div className="relative">
            <select
              id="verification-status"
              value={filters.status}
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <KeyboardArrowDownRoundedIcon
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              sx={{ fontSize: 20 }}
            />
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
        <span className="text-xs font-medium text-gray-500">
          Active filters:
        </span>

        {filters.role !== "all" && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700">
            Role: {filters.role}
          </span>
        )}

        {filters.verificationType !== "all" && (
          <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
            Type:{" "}
            {filters.verificationType.replaceAll("_", " ")}
          </span>
        )}

        {filters.status !== "all" && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
              filters.status === "pending"
                ? "bg-amber-50 text-amber-700"
                : filters.status === "approved"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            Status: {filters.status}
          </span>
        )}

        {filters.role === "all" &&
          filters.verificationType === "all" &&
          filters.status === "all" && (
            <span className="text-xs text-gray-400">
              None
            </span>
          )}
      </div>
    </div>
  );
};

export default VerificationFilters;