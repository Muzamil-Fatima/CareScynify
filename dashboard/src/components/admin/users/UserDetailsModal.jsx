import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const UserDetailsModal = ({
  user,
  isOpen,
  onClose,
  onVerify,
  onSuspend,
}) => {
  if (!isOpen || !user) return null;

  /*
   * Backend normalizeUser() returns:
   * {
   *   _id,
   *   userId,
   *   name,
   *   email,
   *   phone,
   *   role,
   *   status,
   *   accountVerified,
   *   verificationStatus,
   *   isVerified,
   *   dateOfBirth,
   *   avatar,
   *   profile
   * }
   */

  const avatarUrl =
    typeof user.avatar === "string"
      ? user.avatar
      : user.avatar?.url || "";

  const profile = user.profile || {};

  const getInitials = (name = "") => {
    return (
      name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"
    );
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  /*
   * Backend role-specific profile data is returned
   * inside user.profile.
   *
   * We keep fallbacks so this modal remains compatible
   * with any existing profile fields.
   */
  const cnic =
    user.cnic ||
    profile.cnic ||
    profile.CNIC ||
    profile.cnicNumber ||
    "";

  const gender =
    user.gender ||
    profile.gender ||
    "";

  const dateOfBirth =
    user.dateOfBirth ||
    profile.dateOfBirth ||
    profile.dob ||
    "";

  const address =
    user.address ||
    profile.address ||
    profile.location ||
    "";

  const roleStyles = {
    doctor: "bg-blue-50 text-blue-700",
    patient: "bg-emerald-50 text-emerald-700",
    pharmacy: "bg-purple-50 text-purple-700",
    laboratory: "bg-orange-50 text-orange-700",
    lab: "bg-orange-50 text-orange-700",
    admin: "bg-red-50 text-red-700",
  };

  const verificationStyles = {
    verified: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    rejected: "bg-red-50 text-red-700",
  };

  const statusStyles = {
    active: "bg-emerald-50 text-emerald-700",
    suspended: "bg-red-50 text-red-700",
    blocked: "bg-red-50 text-red-700",
    inactive: "bg-gray-100 text-gray-700",
  };

  const role = user.role?.toLowerCase() || "user";

  /*
   * Backend always normalizes verification status
   * to:
   * verified | pending | rejected
   */
  const verificationStatus =
    user.verificationStatus?.toLowerCase() || "pending";

  /*
   * Backend status values:
   * active | suspended | inactive
   */
  const accountStatus =
    user.status?.toLowerCase() || "active";

  /*
   * Backend supports numeric userId OR Mongo _id.
   */
  const displayUserId =
    user.userId || user._id || user.id || "—";

  /*
   * Handle address if backend profile returns an object.
   */
  const formatAddress = (value) => {
    if (!value) return "";

    if (typeof value === "string") {
      return value;
    }

    if (typeof value === "object") {
      return (
        value.fullAddress ||
        value.address ||
        value.street ||
        [
          value.street,
          value.city,
          value.state,
          value.country,
        ]
          .filter(Boolean)
          .join(", ")
      );
    }

    return String(value);
  };

  const formattedAddress = formatAddress(address);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              User Details
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              View complete user information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close modal"
          >
            <CloseRoundedIcon sx={{ fontSize: 22 }} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Profile Section */}
          <div className="border-b border-gray-100 px-6 py-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-500">
                    {getInitials(user.name)}
                  </span>
                )}
              </div>

              {/* Name */}
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {user.name || "Unknown User"}
                  </h3>

                  {user.isVerified && (
                    <VerifiedRoundedIcon
                      className="text-blue-500"
                      sx={{ fontSize: 20 }}
                    />
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {user.email || "No email available"}
                </p>

                <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      roleStyles[role] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {role}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      verificationStyles[verificationStatus] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {verificationStatus}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      statusStyles[accountStatus] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {accountStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="px-6 py-6">
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              Account Information
            </h4>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Email */}
              <InfoItem
                icon={<EmailRoundedIcon sx={{ fontSize: 19 }} />}
                label="Email Address"
                value={user.email}
              />

              {/* Phone */}
              <InfoItem
                icon={<PhoneRoundedIcon sx={{ fontSize: 19 }} />}
                label="Phone Number"
                value={user.phone}
              />

              {/* Role */}
              <InfoItem
                icon={<BadgeRoundedIcon sx={{ fontSize: 19 }} />}
                label="Account Role"
                value={role}
                capitalize
              />

              {/* User ID */}
              <InfoItem
                icon={<PersonRoundedIcon sx={{ fontSize: 19 }} />}
                label="User ID"
                value={displayUserId}
              />

              {/* Joined */}
              <InfoItem
                icon={<CalendarMonthRoundedIcon sx={{ fontSize: 19 }} />}
                label="Joined Date"
                value={formatDate(user.createdAt)}
              />

              {/* Verification */}
              <InfoItem
                icon={<VerifiedRoundedIcon sx={{ fontSize: 19 }} />}
                label="Verification"
                value={verificationStatus}
                capitalize
              />
            </div>
          </div>

          {/* Additional Details */}
          {(cnic ||
            gender ||
            dateOfBirth ||
            formattedAddress) && (
            <div className="border-t border-gray-100 px-6 py-6">
              <h4 className="mb-4 text-sm font-semibold text-gray-900">
                Additional Information
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cnic && (
                  <DetailField
                    label="CNIC"
                    value={cnic}
                  />
                )}

                {gender && (
                  <DetailField
                    label="Gender"
                    value={gender}
                    capitalize
                  />
                )}

                {dateOfBirth && (
                  <DetailField
                    label="Date of Birth"
                    value={formatDate(dateOfBirth)}
                  />
                )}

                {formattedAddress && (
                  <div className="sm:col-span-2">
                    <DetailField
                      label="Address"
                      value={formattedAddress}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Close
          </button>

          <div className="flex flex-col gap-2 sm:flex-row">
            {verificationStatus !== "verified" && (
              <button
                type="button"
                onClick={() => onVerify?.(user)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                <CheckCircleRoundedIcon
                  sx={{ fontSize: 18 }}
                />
                Verify User
              </button>
            )}

            {accountStatus === "active" ? (
              <button
                type="button"
                onClick={() => onSuspend?.(user)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                <BlockRoundedIcon
                  sx={{ fontSize: 18 }}
                />
                Suspend
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSuspend?.(user)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <CheckCircleRoundedIcon
                  sx={{ fontSize: 18 }}
                />
                Activate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------
   Reusable Information Item
----------------------------------- */

const InfoItem = ({
  icon,
  label,
  value,
  capitalize = false,
}) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400">
          {label}
        </p>

        <p
          className={`mt-1 wrap-break-word text-sm font-medium text-gray-800 ${
            capitalize ? "capitalize" : ""
          }`}
        >
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
};

/* ----------------------------------
   Detail Field
----------------------------------- */

const DetailField = ({
  label,
  value,
  capitalize = false,
}) => {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-medium text-gray-800 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value || "Not provided"}
      </p>
    </div>
  );
};

export default UserDetailsModal;