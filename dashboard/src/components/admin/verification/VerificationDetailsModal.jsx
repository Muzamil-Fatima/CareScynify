import React, { useState } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const VerificationDetailsModal = ({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectBox, setShowRejectBox] = useState(false);

  if (!isOpen || !request) return null;

  const applicant = request.user || request.applicant || {};

  const name =
    applicant.name ||
    request.name ||
    "Unknown Applicant";

  const email =
    applicant.email ||
    request.email ||
    "No email available";

  const phone =
    applicant.phone ||
    applicant.phoneNumber ||
    request.phone ||
    "Not provided";

  const role =
    request.role ||
    applicant.role ||
    "User";

  const avatar =
    applicant.avatar?.url ||
    applicant.avatar ||
    request.avatar?.url ||
    request.avatar;

  const verificationType =
    request.verificationType ||
    request.type ||
    "Identity Verification";

  const status =
    request.status ||
    request.verificationStatus ||
    "pending";

  const documents = request.documents || [];

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (value = "") => {
    const initials = value
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return initials || "U";
  };

  const handleApprove = () => {
    onApprove?.(request);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) return;

    onReject?.(request, rejectionReason.trim());

    setRejectionReason("");
    setShowRejectBox(false);
  };

  const handleClose = () => {
    setRejectionReason("");
    setShowRejectBox(false);
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <VerifiedUserRoundedIcon
                className="text-blue-600"
                sx={{ fontSize: 21 }}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Verification Review
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                Review applicant information and submitted documents.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <CloseRoundedIcon sx={{ fontSize: 22 }} />
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* Applicant Profile */}
          <div className="border-b border-gray-100 px-6 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-gray-500">
                    {getInitials(name)}
                  </span>
                )}
              </div>

              {/* Applicant */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {name}
                  </h3>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                    {role}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {email}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      status.toLowerCase() === "approved" ||
                      status.toLowerCase() === "verified"
                        ? "bg-emerald-50 text-emerald-700"
                        : status.toLowerCase() === "rejected"
                        ? "bg-red-50 text-red-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {status}
                  </span>

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {verificationType}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Request Information */}
          <div className="px-6 py-6">
            <h4 className="mb-4 text-sm font-semibold text-gray-900">
              Request Information
            </h4>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoItem
                icon={
                  <PersonRoundedIcon sx={{ fontSize: 18 }} />
                }
                label="Applicant"
                value={name}
              />

              <InfoItem
                icon={
                  <BadgeRoundedIcon sx={{ fontSize: 18 }} />
                }
                label="Role"
                value={role}
                capitalize
              />

              <InfoItem
                icon={
                  <EmailRoundedIcon sx={{ fontSize: 18 }} />
                }
                label="Email"
                value={email}
              />

              <InfoItem
                icon={
                  <PhoneRoundedIcon sx={{ fontSize: 18 }} />
                }
                label="Phone"
                value={phone}
              />

              <InfoItem
                icon={
                  <VerifiedUserRoundedIcon
                    sx={{ fontSize: 18 }}
                  />
                }
                label="Verification Type"
                value={verificationType}
              />

              <InfoItem
                icon={
                  <CalendarMonthRoundedIcon
                    sx={{ fontSize: 18 }}
                  />
                }
                label="Submitted"
                value={formatDate(
                  request.submittedAt || request.createdAt
                )}
              />
            </div>
          </div>

          {/* Applicant Details */}
          {(applicant.cnic ||
            request.cnic ||
            applicant.address ||
            request.address ||
            applicant.gender ||
            request.gender) && (
            <div className="border-t border-gray-100 px-6 py-6">
              <h4 className="mb-4 text-sm font-semibold text-gray-900">
                Applicant Details
              </h4>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(applicant.cnic || request.cnic) && (
                  <DetailField
                    label="CNIC"
                    value={applicant.cnic || request.cnic}
                  />
                )}

                {(applicant.gender || request.gender) && (
                  <DetailField
                    label="Gender"
                    value={
                      applicant.gender || request.gender
                    }
                    capitalize
                  />
                )}

                {(applicant.dateOfBirth ||
                  request.dateOfBirth) && (
                  <DetailField
                    label="Date of Birth"
                    value={formatDate(
                      applicant.dateOfBirth ||
                        request.dateOfBirth
                    )}
                  />
                )}

                {(applicant.address ||
                  request.address) && (
                  <div className="sm:col-span-2">
                    <DetailField
                      label="Address"
                      value={
                        applicant.address ||
                        request.address
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="border-t border-gray-100 px-6 py-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  Verification Documents
                </h4>

                <p className="mt-1 text-xs text-gray-500">
                  Review all documents submitted by the applicant.
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {documents.length}{" "}
                {documents.length === 1
                  ? "Document"
                  : "Documents"}
              </span>
            </div>

            {documents.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center">
                <DescriptionRoundedIcon
                  className="text-gray-400"
                  sx={{ fontSize: 28 }}
                />

                <p className="mt-2 text-sm font-medium text-gray-600">
                  No documents submitted
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  The applicant has not uploaded any verification
                  documents.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {documents.map((document, index) => {
                  const documentUrl =
                    document.url ||
                    document.fileUrl ||
                    document.path ||
                    document;

                  const documentName =
                    document.name ||
                    document.title ||
                    `Document ${index + 1}`;

                  return (
                    <div
                      key={
                        document._id ||
                        document.publicId ||
                        index
                      }
                      className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/30"
                    >
                      {/* Icon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600">
                        <DescriptionRoundedIcon
                          sx={{ fontSize: 21 }}
                        />
                      </div>

                      {/* Document Info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">
                          {documentName}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Verification document
                        </p>
                      </div>

                      {/* View */}
                      {documentUrl && (
                        <a
                          href={documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white hover:text-blue-600"
                          title="View document"
                        >
                          <VisibilityRoundedIcon
                            sx={{ fontSize: 19 }}
                          />
                        </a>
                      )}

                      {documentUrl && (
                        <a
                          href={documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white hover:text-blue-600 sm:flex"
                          title="Open document"
                        >
                          <OpenInNewRoundedIcon
                            sx={{ fontSize: 17 }}
                          />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Rejection Reason */}
          {showRejectBox && (
            <div className="border-t border-red-100 bg-red-50/50 px-6 py-5">
              <label
                htmlFor="rejection-reason"
                className="mb-2 block text-sm font-semibold text-red-800"
              >
                Rejection Reason
              </label>

              <textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(event) =>
                  setRejectionReason(event.target.value)
                }
                rows={4}
                placeholder="Explain why this verification request is being rejected..."
                className="w-full resize-none rounded-xl border border-red-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              />

              <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowRejectBox(false);
                    setRejectionReason("");
                  }}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleReject}
                  disabled={!rejectionReason.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CancelRoundedIcon sx={{ fontSize: 18 }} />
                  Confirm Rejection
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Close
          </button>

          {status.toLowerCase() === "pending" && (
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowRejectBox(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <CancelRoundedIcon sx={{ fontSize: 18 }} />
                Reject
              </button>

              <button
                type="button"
                onClick={handleApprove}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                <CheckCircleRoundedIcon
                  sx={{ fontSize: 18 }}
                />
                Approve Verification
              </button>
            </div>
          )}

          {status.toLowerCase() === "approved" && (
            <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
              <CheckCircleRoundedIcon
                sx={{ fontSize: 18 }}
              />
              Verification Approved
            </div>
          )}

          {status.toLowerCase() === "rejected" && (
            <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
              <CancelRoundedIcon sx={{ fontSize: 18 }} />
              Verification Rejected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------
   Information Item
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
        className={`mt-1 wrap-break-word text-sm font-medium text-gray-800 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value || "Not provided"}
      </p>
    </div>
  );
};

export default VerificationDetailsModal;