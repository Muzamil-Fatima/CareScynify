import React, { useMemo, useState } from "react";

import UserSearch from "../../components/admin/users/UserSearch";
import UserFilters from "../../components/admin/users/UserFilters";
import UserTable from "../../components/admin/users/UserTable";
import UserDetailsModal from "../../components/admin/users/UserDetailsModal";

const AdminUsers = () => {
  /* ----------------------------------
     Demo Users
     Replace with API data later
  ----------------------------------- */

  const [users, setUsers] = useState([
    {
      _id: "USR001",
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      phone: "+92 300 1234567",
      role: "doctor",
      verificationStatus: "verified",
      status: "active",
      isVerified: true,
      createdAt: "2026-08-10T10:30:00.000Z",
      cnic: "35202-1234567-1",
      gender: "male",
      address: "Gujranwala, Punjab",
    },
    {
      _id: "USR002",
      name: "Fatima Ali",
      email: "fatima@example.com",
      phone: "+92 301 9876543",
      role: "patient",
      verificationStatus: "verified",
      status: "active",
      isVerified: true,
      createdAt: "2026-08-08T12:20:00.000Z",
      cnic: "35202-7654321-2",
      gender: "female",
      address: "Lahore, Punjab",
    },
    {
      _id: "USR003",
      name: "Usman Medical Store",
      email: "usmanpharmacy@example.com",
      phone: "+92 302 5556677",
      role: "pharmacy",
      verificationStatus: "pending",
      status: "active",
      isVerified: false,
      createdAt: "2026-08-05T09:15:00.000Z",
      address: "Gujranwala, Punjab",
    },
    {
      _id: "USR004",
      name: "City Diagnostic Lab",
      email: "citylab@example.com",
      phone: "+92 303 1112233",
      role: "laboratory",
      verificationStatus: "pending",
      status: "active",
      isVerified: false,
      createdAt: "2026-08-03T14:45:00.000Z",
      address: "Gujranwala, Punjab",
    },
    {
      _id: "USR005",
      name: "Bilal Ahmed",
      email: "bilal@example.com",
      phone: "+92 304 7778899",
      role: "patient",
      verificationStatus: "rejected",
      status: "suspended",
      isVerified: false,
      createdAt: "2026-07-29T16:10:00.000Z",
      cnic: "35202-9876543-3",
      gender: "male",
      address: "Wazirabad, Punjab",
    },
  ]);

  /* ----------------------------------
     Search
  ----------------------------------- */

  const [search, setSearch] = useState("");

  /* ----------------------------------
     Filters
  ----------------------------------- */

  const [filters, setFilters] = useState({
    role: "all",
    verificationStatus: "all",
    status: "all",
  });

  /* ----------------------------------
     Modal
  ----------------------------------- */

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ----------------------------------
     Search Handler
  ----------------------------------- */

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  /* ----------------------------------
     Filter Handler
  ----------------------------------- */

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      role: "all",
      verificationStatus: "all",
      status: "all",
    });
  };

  /* ----------------------------------
     Filtered Users
  ----------------------------------- */

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      /* Search */
      const matchesSearch =
        !searchValue ||
        user.name?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue) ||
        user._id?.toLowerCase().includes(searchValue) ||
        user.phone?.toLowerCase().includes(searchValue);

      /* Role */
      const matchesRole =
        filters.role === "all" ||
        user.role?.toLowerCase() === filters.role.toLowerCase();

      /* Verification */
      const matchesVerification =
        filters.verificationStatus === "all" ||
        user.verificationStatus?.toLowerCase() ===
          filters.verificationStatus.toLowerCase();

      /* Account Status */
      const matchesStatus =
        filters.status === "all" ||
        user.status?.toLowerCase() === filters.status.toLowerCase();

      return (
        matchesSearch && matchesRole && matchesVerification && matchesStatus
      );
    });
  }, [users, search, filters]);

  /* ----------------------------------
     View User
  ----------------------------------- */

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  /* ----------------------------------
     Close Modal
  ----------------------------------- */

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  /* ----------------------------------
     Verify User
  ----------------------------------- */

  const handleVerifyUser = (user) => {
    if (!user) return;

    setUsers((prevUsers) =>
      prevUsers.map((item) =>
        item._id === user._id
          ? {
              ...item,
              verificationStatus: "verified",
              isVerified: true,
            }
          : item,
      ),
    );

    setSelectedUser((prev) =>
      prev
        ? {
            ...prev,
            verificationStatus: "verified",
            isVerified: true,
          }
        : prev,
    );
  };

  /* ----------------------------------
     Suspend / Activate User
  ----------------------------------- */

  const handleSuspendUser = (user) => {
    if (!user) return;

    const newStatus =
      user.status?.toLowerCase() === "active" ? "suspended" : "active";

    setUsers((prevUsers) =>
      prevUsers.map((item) =>
        item._id === user._id
          ? {
              ...item,
              status: newStatus,
            }
          : item,
      ),
    );

    setSelectedUser((prev) =>
      prev
        ? {
            ...prev,
            status: newStatus,
          }
        : prev,
    );
  };

  /* ----------------------------------
     Statistics
  ----------------------------------- */

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status?.toLowerCase() === "active",
  ).length;

  const pendingUsers = users.filter(
    (user) => user.verificationStatus?.toLowerCase() === "pending",
  ).length;

  const suspendedUsers = users.filter(
    (user) => user.status?.toLowerCase() === "suspended",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ----------------------------------
            Page Header
        ----------------------------------- */}

        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Users
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage registered users, verification, and account status across
            CareScynify.
          </p>
        </div>

        {/* ----------------------------------
            Statistics
        ----------------------------------- */}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Total Users
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {totalUsers}
            </p>

            <p className="mt-1 text-xs text-gray-500">All registered users</p>
          </div>

          {/* Active */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Active
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {activeUsers}
            </p>

            <p className="mt-1 text-xs text-gray-500">Active accounts</p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-amber-600">
              {pendingUsers}
            </p>

            <p className="mt-1 text-xs text-gray-500">Awaiting verification</p>
          </div>

          {/* Suspended */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Suspended
            </p>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {suspendedUsers}
            </p>

            <p className="mt-1 text-xs text-gray-500">Suspended accounts</p>
          </div>
        </div>

        {/* ----------------------------------
            Search
        ----------------------------------- */}

        <div className="mb-4">
          <UserSearch
            value={search}
            onChange={handleSearchChange}
            onClear={clearSearch}
          />
        </div>

        {/* ----------------------------------
            Filters
        ----------------------------------- */}

        <div className="mb-6">
          <UserFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        {/* ----------------------------------
            Results Info
        ----------------------------------- */}

        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredUsers.length}
            </span>{" "}
            of <span className="font-semibold text-gray-800">{totalUsers}</span>{" "}
            users
          </p>

          {(search ||
            filters.role !== "all" ||
            filters.verificationStatus !== "all" ||
            filters.status !== "all") && (
            <button
              type="button"
              onClick={() => {
                clearSearch();
                resetFilters();
              }}
              className="text-xs font-medium text-blue-600 transition hover:text-blue-700"
            >
              Clear all
            </button>
          )}
        </div>

        {/* ----------------------------------
            Users Table
        ----------------------------------- */}

        <UserTable users={filteredUsers} onViewUser={handleViewUser} />

        {/* ----------------------------------
            User Details Modal
        ----------------------------------- */}

        <UserDetailsModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onVerify={handleVerifyUser}
          onSuspend={handleSuspendUser}
        />
      </div>
    </div>
  );
};

export default AdminUsers;
