import React, { useMemo, useState } from "react";

import VerificationTable from "../../components/admin/verification/VerificationTable";
import VerificationFilters from "../../components/admin/verification/VerificationFilters";
import VerificationDetailsModal from "../../components/admin/verification/VerificationDetailsModal";

import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const RequestToVerify = () => {
  /* ----------------------------------
     Demo Verification Requests
     Replace with API data later
  ----------------------------------- */

  const [requests, setRequests] = useState([
    {
      _id: "VER001",
      user: {
        _id: "USR001",
        name: "Dr. Ahmed Khan",
        email: "ahmed@example.com",
        phone: "+92 300 1234567",
        role: "doctor",
        cnic: "35202-1234567-1",
        gender: "male",
        address: "Gujranwala, Punjab",
      },
      role: "doctor",
      verificationType: "Medical License",
      status: "pending",
      submittedAt: "2026-08-18T10:30:00.000Z",
      documents: [
        {
          _id: "DOC001",
          name: "CNIC",
          url: "https://example.com/cnic.pdf",
        },
        {
          _id: "DOC002",
          name: "Medical License",
          url: "https://example.com/license.pdf",
        },
        {
          _id: "DOC003",
          name: "Medical Degree",
          url: "https://example.com/degree.pdf",
        },
      ],
    },

    {
      _id: "VER002",
      user: {
        _id: "USR002",
        name: "Usman Medical Store",
        email: "usmanpharmacy@example.com",
        phone: "+92 301 9876543",
        role: "pharmacy",
        address: "Gujranwala, Punjab",
      },
      role: "pharmacy",
      verificationType: "Pharmacy License",
      status: "pending",
      submittedAt: "2026-08-17T12:20:00.000Z",
      documents: [
        {
          _id: "DOC004",
          name: "CNIC",
          url: "https://example.com/cnic.pdf",
        },
        {
          _id: "DOC005",
          name: "Pharmacy License",
          url: "https://example.com/license.pdf",
        },
      ],
    },

    {
      _id: "VER003",
      user: {
        _id: "USR003",
        name: "City Diagnostic Lab",
        email: "citylab@example.com",
        phone: "+92 302 5556677",
        role: "laboratory",
        address: "Lahore, Punjab",
      },
      role: "laboratory",
      verificationType: "Laboratory License",
      status: "pending",
      submittedAt: "2026-08-16T09:15:00.000Z",
      documents: [
        {
          _id: "DOC006",
          name: "Laboratory License",
          url: "https://example.com/license.pdf",
        },
        {
          _id: "DOC007",
          name: "Registration Certificate",
          url: "https://example.com/certificate.pdf",
        },
      ],
    },

    {
      _id: "VER004",
      user: {
        _id: "USR004",
        name: "Fatima Ali",
        email: "fatima@example.com",
        phone: "+92 303 1112233",
        role: "patient",
        cnic: "35202-7654321-2",
        gender: "female",
        address: "Lahore, Punjab",
      },
      role: "patient",
      verificationType: "CNIC Verification",
      status: "approved",
      submittedAt: "2026-08-14T14:45:00.000Z",
      documents: [
        {
          _id: "DOC008",
          name: "CNIC",
          url: "https://example.com/cnic.pdf",
        },
      ],
    },

    {
      _id: "VER005",
      user: {
        _id: "USR005",
        name: "Bilal Ahmed",
        email: "bilal@example.com",
        phone: "+92 304 7778899",
        role: "doctor",
        cnic: "35202-9876543-3",
        gender: "male",
        address: "Wazirabad, Punjab",
      },
      role: "doctor",
      verificationType: "Medical License",
      status: "rejected",
      submittedAt: "2026-08-12T16:10:00.000Z",
      rejectionReason: "Medical license document could not be verified.",
      documents: [
        {
          _id: "DOC009",
          name: "Medical License",
          url: "https://example.com/license.pdf",
        },
      ],
    },
  ]);

  /* ----------------------------------
     Filters
  ----------------------------------- */

  const [filters, setFilters] = useState({
    role: "all",
    verificationType: "all",
    status: "all",
  });

  /* ----------------------------------
     Selected Request / Modal
  ----------------------------------- */

  const [selectedRequest, setSelectedRequest] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ----------------------------------
     Filter Change
  ----------------------------------- */

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ----------------------------------
     Reset Filters
  ----------------------------------- */

  const resetFilters = () => {
    setFilters({
      role: "all",
      verificationType: "all",
      status: "all",
    });
  };

  /* ----------------------------------
     Filter Requests
  ----------------------------------- */

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

  /* ----------------------------------
     Open Details Modal
  ----------------------------------- */

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  /* ----------------------------------
     Close Details Modal
  ----------------------------------- */

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  /* ----------------------------------
     Approve Request
  ----------------------------------- */

  const handleApprove = (request) => {
    if (!request) return;

    setRequests((prevRequests) =>
      prevRequests.map((item) =>
        item._id === request._id
          ? {
              ...item,
              status: "approved",
            }
          : item,
      ),
    );

    setSelectedRequest((prev) =>
      prev
        ? {
            ...prev,
            status: "approved",
          }
        : prev,
    );
  };

  /* ----------------------------------
     Reject Request
  ----------------------------------- */

  const handleReject = (request, reason) => {
    if (!request) return;

    setRequests((prevRequests) =>
      prevRequests.map((item) =>
        item._id === request._id
          ? {
              ...item,
              status: "rejected",
              rejectionReason: reason,
            }
          : item,
      ),
    );

    setSelectedRequest((prev) =>
      prev
        ? {
            ...prev,
            status: "rejected",
            rejectionReason: reason,
          }
        : prev,
    );
  };

  /* ----------------------------------
     Statistics
  ----------------------------------- */

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status?.toLowerCase() === "pending",
  ).length;

  const approvedRequests = requests.filter(
    (request) => request.status?.toLowerCase() === "approved",
  ).length;

  const rejectedRequests = requests.filter(
    (request) => request.status?.toLowerCase() === "rejected",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ----------------------------------
            Page Header
        ----------------------------------- */}

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

        {/* ----------------------------------
            Statistics Cards
        ----------------------------------- */}

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

        {/* ----------------------------------
            Filters
        ----------------------------------- */}

        <div className="mb-6">
          <VerificationFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        {/* ----------------------------------
            Results Info
        ----------------------------------- */}

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

        {/* ----------------------------------
            Verification Table
        ----------------------------------- */}

        <VerificationTable
          requests={filteredRequests}
          onViewRequest={handleViewRequest}
        />

        {/* ----------------------------------
            Details Modal
        ----------------------------------- */}

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

/* ==================================
   Statistics Card
=================================== */

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
