import React from "react";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

const VerificationTable = ({
  requests = [],
  onViewRequest,
}) => {
  const getRoleStyle = (role) => {
    switch (role?.toLowerCase()) {
      case "doctor":
        return "bg-blue-50 text-blue-700";

      case "patient":
        return "bg-emerald-50 text-emerald-700";

      case "pharmacy":
        return "bg-purple-50 text-purple-700";

      case "laboratory":
      case "lab":
        return "bg-orange-50 text-orange-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "verified":
        return "bg-emerald-50 text-emerald-700";

      case "pending":
        return "bg-amber-50 text-amber-700";

      case "rejected":
        return "bg-red-50 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <VerifiedUserRoundedIcon
              className="text-blue-600"
              sx={{ fontSize: 21 }}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Verification Requests
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review and manage submitted verification requests.
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
          {requests.length} Requests
        </span>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-262.5 w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Applicant
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Verification Type
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Submitted
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {requests.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-14 text-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <VerifiedUserRoundedIcon
                        className="text-gray-400"
                        sx={{ fontSize: 22 }}
                      />
                    </div>

                    <p className="text-sm font-semibold text-gray-700">
                      No verification requests
                    </p>

                    <p className="mt-1 max-w-sm text-xs text-gray-400">
                      There are currently no verification requests
                      matching your filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              requests.map((request) => {
                const applicant =
                  request.user || request.applicant || {};

                const name =
                  applicant.name ||
                  request.name ||
                  "Unknown User";

                const email =
                  applicant.email ||
                  request.email ||
                  "No email";

                const avatar =
                  applicant.avatar?.url ||
                  applicant.avatar ||
                  request.avatar?.url ||
                  request.avatar;

                const role =
                  request.role ||
                  applicant.role ||
                  "User";

                const verificationType =
                  request.verificationType ||
                  request.type ||
                  "Identity Verification";

                const status =
                  request.status ||
                  request.verificationStatus ||
                  "pending";

                return (
                  <tr
                    key={request._id || request.id}
                    className="transition-colors hover:bg-gray-50/70"
                  >
                    {/* Applicant */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt={name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-semibold text-gray-500">
                              {name
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {name}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-gray-500">
                            {email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getRoleStyle(
                          role
                        )}`}
                      >
                        {role}
                      </span>
                    </td>

                    {/* Verification Type */}
                    <td className="px-6 py-4">
                      <div className="max-w-47.5">
                        <p className="truncate text-sm font-medium text-gray-700">
                          {verificationType}
                        </p>

                        {request.documents?.length > 0 && (
                          <p className="mt-1 text-xs text-gray-400">
                            {request.documents.length} document
                            {request.documents.length > 1
                              ? "s"
                              : ""}{" "}
                            submitted
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Submitted */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {formatDate(
                        request.createdAt ||
                          request.submittedAt
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                          status
                        )}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        {status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onViewRequest?.(request)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                        >
                          <VisibilityRoundedIcon
                            sx={{ fontSize: 16 }}
                          />

                          Review
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                          title="More actions"
                        >
                          <MoreHorizRoundedIcon
                            sx={{ fontSize: 20 }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {requests.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {requests.length}
            </span>{" "}
            verification request
            {requests.length !== 1 ? "s" : ""}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-400"
            >
              Previous
            </button>

            <span className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">
              1
            </span>

            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationTable;