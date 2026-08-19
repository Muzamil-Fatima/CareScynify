import React from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

const UserTable = ({ users = [], onViewUser }) => {
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
      case "admin":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "verified":
        return "bg-emerald-50 text-emerald-700";

      case "pending":
        return "bg-amber-50 text-amber-700";

      case "suspended":
      case "blocked":
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
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            All Users
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor registered CareScynify users.
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
          {users.length} Users
        </span>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-250 w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                User
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Verification
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Joined
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <VisibilityRoundedIcon
                        className="text-gray-400"
                        fontSize="small"
                      />
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      No users found
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Try changing your search or filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id || user.id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                        {user.avatar?.url || user.avatar ? (
                          <img
                            src={user.avatar?.url || user.avatar}
                            alt={user.name || "User"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-gray-600">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        )}
                      </div>

                      {/* User Info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {user.name || "Unknown User"}
                          </p>

                          {user.isVerified && (
                            <VerifiedRoundedIcon
                              className="text-blue-500"
                              sx={{ fontSize: 16 }}
                            />
                          )}
                        </div>

                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {user.email || "No email"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${getRoleStyle(
                        user.role
                      )}`}
                    >
                      {user.role || "User"}
                    </span>
                  </td>

                  {/* Verification */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                        user.verificationStatus
                      )}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />

                      {user.verificationStatus || "Pending"}
                    </span>
                  </td>

                  {/* Account Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                        user.status
                      )}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />

                      {user.status || "Active"}
                    </span>
                  </td>

                  {/* Joined */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                    {formatDate(user.createdAt)}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onViewUser?.(user)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                      >
                        <VisibilityRoundedIcon
                          sx={{ fontSize: 16 }}
                        />

                        View
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {users.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">
              {users.length}
            </span>{" "}
            users
          </p>

          <button
            type="button"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;