import React, { useMemo, useState } from "react";

import VerificationTable from "../../components/admin/verification/VerificationTable";
import VerificationFilters from "../../components/admin/verification/VerificationFilters";
import VerificationDetailsModal from "../../components/admin/verification/VerificationDetailsModal";

import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import useAdminVerification from "../../hooks/admin/useAdminVerification";

const RequestToVerify = () => {
  //
  // Verification API
  //
  const {
    requests = [],
    loading,
    error,
    approveRequest,
    rejectRequest,
  } = useAdminVerification();

  //
  // Filters
  //
  const [filters, setFilters] = useState({
    role: "all",
    verificationType: "all",
    status: "all",
  });

  //
  // Selected Request / Modal
  //
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //
  // Filter Change
  //
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //
  // Reset Filters
  //
  const resetFilters = () => {
    setFilters({
      role: "all",
      verificationType: "all",
      status: "all",
    });
  };

  //
  // Filter Requests
  //
  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const role = request.role || request.user?.role || "";

      const verificationType = request.verificationType || request.type || "";

      const status = request.status || request.verificationStatus || "";

      const matchesRole =
        filters.role === "all" ||
        role.toLowerCase() === filters.role.toLowerCase();

      const matchesType =
        filters.verificationType === "all" ||
        verificationType
          .toLowerCase()
          .replaceAll(" ", "_")
          .includes(filters.verificationType.toLowerCase());

      const matchesStatus =
        filters.status === "all" ||
        status.toLowerCase() === filters.status.toLowerCase();

      return matchesRole && matchesType && matchesStatus;
    });
  }, [requests, filters]);

  //
  // Open Details Modal
  //
  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  //
  // Close Details Modal
  //
  const handleCloseModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  //
  // Approve Request
  //
  const handleApprove = async (request) => {
    if (!request) return;

    try {
      const updatedRequest = await approveRequest(request);

      setSelectedRequest((prev) =>
        prev
          ? {
              ...prev,
              ...(updatedRequest || {}),
              status: "approved",
            }
          : prev,
      );
    } catch (err) {
      console.error("Failed to approve verification request:", err);
    }
  };

  //
  // Reject Request
  //
  const handleReject = async (request, reason) => {
    if (!request || !reason?.trim()) return;

    try {
      const updatedRequest = await rejectRequest(request, reason);

      setSelectedRequest((prev) =>
        prev
          ? {
              ...prev,
              ...(updatedRequest || {}),
              status: "rejected",
              rejectionReason: reason.trim(),
            }
          : prev,
      );
    } catch (err) {
      console.error("Failed to reject verification request:", err);
    }
  };

  //
  // Statistics
  //
  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status?.toLowerCase() === "pending",
  ).length;

  const approvedRequests = requests.filter(
    (request) =>
      request.status?.toLowerCase() === "approved" ||
      request.status?.toLowerCase() === "verified",
  ).length;

  const rejectedRequests = requests.filter(
    (request) => request.status?.toLowerCase() === "rejected",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* 
            Page Header
        - */}
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 sm:flex">
              <VerifiedUserRoundedIcon
                className="text-blue-600"
                sx={{ fontSize: 25 }}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Verification Requests
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Review submitted documents and manage verification requests from
                CareScynify users.
              </p>
            </div>
          </div>
        </div>

        {/* 
            Statistics Cards
        - */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Total */}
          <StatCard
            icon={<VerifiedUserRoundedIcon sx={{ fontSize: 21 }} />}
            label="Total Requests"
            value={totalRequests}
            description="All verification requests"
            iconClass="bg-blue-50 text-blue-600"
          />

          {/* Pending */}
          <StatCard
            icon={<PendingActionsRoundedIcon sx={{ fontSize: 21 }} />}
            label="Pending"
            value={pendingRequests}
            description="Awaiting review"
            iconClass="bg-amber-50 text-amber-600"
          />

          {/* Approved */}
          <StatCard
            icon={<CheckCircleRoundedIcon sx={{ fontSize: 21 }} />}
            label="Approved"
            value={approvedRequests}
            description="Successfully verified"
            iconClass="bg-emerald-50 text-emerald-600"
          />

          {/* Rejected */}
          <StatCard
            icon={<CancelRoundedIcon sx={{ fontSize: 21 }} />}
            label="Rejected"
            value={rejectedRequests}
            description="Verification rejected"
            iconClass="bg-red-50 text-red-600"
          />
        </div>

        {/* 
            Filters
        - */}
        <div className="mb-6">
          <VerificationFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        {/* 
            API Error
        - */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* 
            Results Info
        - */}
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredRequests.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">{totalRequests}</span>{" "}
            requests
          </p>

          {(filters.role !== "all" ||
            filters.verificationType !== "all" ||
            filters.status !== "all") && (
            <button
              type="button"
              onClick={resetFilters}
              className="w-fit text-xs font-medium text-blue-600 transition hover:text-blue-700"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* 
            Verification Table
        - */}
        {loading ? (
          <div className="w-full rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-600">
              Loading verification requests...
            </p>
          </div>
        ) : (
          <VerificationTable
            requests={filteredRequests}
            onViewRequest={handleViewRequest}
          />
        )}

        {/* 
            Details Modal
         */}
        <VerificationDetailsModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

/* 
   Statistics Card
 */

const StatCard = ({ icon, label, value, description, iconClass }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>

          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default RequestToVerify;
