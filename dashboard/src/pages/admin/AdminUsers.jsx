
import React, { useCallback, useEffect, useState } from "react";

import UserSearch from "../../components/admin/users/UserSearch";
import UserFilters from "../../components/admin/users/UserFilters";
import UserTable from "../../components/admin/users/UserTable";
import UserDetailsModal from "../../components/admin/users/UserDetailsModal";

import useAdminUser from "../../hooks/admin/useAdminUsers";

const AdminUsers = () => {
  /* 
     ADMIN USER HOOK
   */

  const {
    users,
    selectedUser,
    stats,
    pagination,
    loading,
    actionLoading,
    error,

    fetchUsers,
    fetchUserById,
    fetchUserStats,

    handleVerifyUser,
    handleRejectUser,
    handleSuspendUser,
    handleActivateUser,
    handleToggleUserStatus,
    handleDeleteUser,
    handleRestoreUser,

    clearSelectedUser,
    clearError,
  } = useAdminUser();

  /* 
     SEARCH
   */

  const [search, setSearch] = useState("");

  /* 
     FILTERS

     These values match backend exactly:
       role
       verificationStatus
       status
   */

  const [filters, setFilters] = useState({
    role: "all",
    verificationStatus: "all",
    status: "all",
  });

  /* 
     MODAL
   */

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* 
     INITIAL LOAD
   */

  useEffect(() => {
    fetchUsers({
      page: 1,
      limit: pagination.rowsPerPage || 10,
      search: "",
      role: "all",
      verificationStatus: "all",
      status: "all",
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    fetchUserStats();
  }, []);

  /* 
     FETCH USERS WITH CURRENT FILTERS
   */

  const loadUsers = useCallback(
    ({
      page = 1,
      limit = pagination.rowsPerPage || 10,
      searchValue = search,
      filterValues = filters,
    } = {}) => {
      return fetchUsers({
        page,
        limit,

        search:
          typeof searchValue === "string"
            ? searchValue.trim()
            : "",

        role: filterValues.role || "all",

        verificationStatus:
          filterValues.verificationStatus || "all",

        status:
          filterValues.status || "all",

        sortBy: "createdAt",
        sortOrder: "desc",
      });
    },
    [
      fetchUsers,
      pagination.rowsPerPage,
      search,
      filters,
    ],
  );

  /* 
     SEARCH CHANGE
   */

  const handleSearchChange = (value) => {
    setSearch(value);

    loadUsers({
      page: 1,
      limit: pagination.rowsPerPage || 10,
      searchValue: value,
      filterValues: filters,
    });
  };

  /* 
     CLEAR SEARCH
   */

  const clearSearch = () => {
    setSearch("");

    loadUsers({
      page: 1,
      limit: pagination.rowsPerPage || 10,
      searchValue: "",
      filterValues: filters,
    });
  };

  /* 
     FILTER CHANGE
   */

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value,
    };

    setFilters(newFilters);

    loadUsers({
      page: 1,
      limit: pagination.rowsPerPage || 10,
      searchValue: search,
      filterValues: newFilters,
    });
  };

  /* 
     RESET FILTERS
   */

  const resetFilters = () => {
    const defaultFilters = {
      role: "all",
      verificationStatus: "all",
      status: "all",
    };

    setFilters(defaultFilters);

    loadUsers({
      page: 1,
      limit: pagination.rowsPerPage || 10,
      searchValue: search,
      filterValues: defaultFilters,
    });
  };

  /* 
     CLEAR EVERYTHING
   */

  const clearAll = () => {
    const defaultFilters = {
      role: "all",
      verificationStatus: "all",
      status: "all",
    };

    setSearch("");
    setFilters(defaultFilters);

    loadUsers({
      page: 1,
      limit: pagination.rowsPerPage || 10,
      searchValue: "",
      filterValues: defaultFilters,
    });
  };

  /* 
     ROWS PER PAGE
   */

  const handleRowsPerPageChange = (value) => {
    const limit = Number(value) || 10;

    loadUsers({
      page: 1,
      limit,
      searchValue: search,
      filterValues: filters,
    });
  };

  /* 
     PREVIOUS PAGE
   */

  const handlePreviousPage = () => {
    if (!pagination.hasPreviousPage) {
      return;
    }

    const previousPage =
      Math.max(
        Number(pagination.currentPage || 1) - 1,
        1,
      );

    loadUsers({
      page: previousPage,
      limit: pagination.rowsPerPage || 10,
      searchValue: search,
      filterValues: filters,
    });
  };

  /* 
     NEXT PAGE
   */

  const handleNextPage = () => {
    if (!pagination.hasNextPage) {
      return;
    }

    const nextPage =
      Number(pagination.currentPage || 1) + 1;

    loadUsers({
      page: nextPage,
      limit: pagination.rowsPerPage || 10,
      searchValue: search,
      filterValues: filters,
    });
  };

  /* 
     VIEW USER

     Backend:
       GET /api/admin/users/:id

     Important:
     Use Mongo _id first.
     Backend also supports custom numeric userId.
   */

  const handleViewUser = async (user) => {
    if (!user) return;

    const id =
      user._id ||
      user.userId;

    if (!id) {
      console.error(
        "Cannot view user: User ID missing",
        user,
      );

      return;
    }

    try {
      await fetchUserById(id);

      setIsModalOpen(true);
    } catch (err) {
      console.error(
        "Failed to fetch user details:",
        err,
      );
    }
  };

  /* 
     CLOSE MODAL
   */

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearSelectedUser();
  };

  /* 
     VERIFY USER

     Backend:
       PATCH /api/admin/users/:id/verify
   */

  const handleVerify = async (user) => {
    if (!user) return;

    const id =
      user._id ||
      user.userId;

    if (!id) return;

    try {
      await handleVerifyUser(id);

      /*
        Refresh current page because verificationStatus
        can affect the active verification filter.
      */

      await loadUsers({
        page: pagination.currentPage || 1,
        limit: pagination.rowsPerPage || 10,
        searchValue: search,
        filterValues: filters,
      });

      await fetchUserStats();
    } catch (err) {
      console.error(
        "Verify user failed:",
        err,
      );
    }
  };

  /* 
     REJECT USER

     Backend:
       PATCH /api/admin/users/:id/reject
   */

  const handleReject = async (user) => {
    if (!user) return;

    const id =
      user._id ||
      user.userId;

    if (!id) return;

    try {
      await handleRejectUser(id);

      await loadUsers({
        page: pagination.currentPage || 1,
        limit: pagination.rowsPerPage || 10,
        searchValue: search,
        filterValues: filters,
      });

      await fetchUserStats();
    } catch (err) {
      console.error(
        "Reject user failed:",
        err,
      );
    }
  };

  /* 
     SUSPEND USER

     Backend:
       PATCH /api/admin/users/:id/suspend
   */

  const handleSuspend = async (user) => {
    if (!user) return;

    const id =
      user._id ||
      user.userId;

    if (!id) return;

    try {
      await handleSuspendUser(id);

      await loadUsers({
        page: pagination.currentPage || 1,
        limit: pagination.rowsPerPage || 10,
        searchValue: search,
        filterValues: filters,
      });

      await fetchUserStats();
    } catch (err) {
      console.error(
        "Suspend user failed:",
        err,
      );
    }
  };

  /* 
     ACTIVATE USER

     Backend:
       PATCH /api/admin/users/:id/activate
   */

  const handleActivate = async (user) => {
    if (!user) return;

    const id =
      user._id ||
      user.userId;

    if (!id) return;

    try {
      await handleActivateUser(id);

      await loadUsers({
        page: pagination.currentPage || 1,
        limit: pagination.rowsPerPage || 10,
        searchValue: search,
        filterValues: filters,
      });

      await fetchUserStats();
    } catch (err) {
      console.error(
        "Activate user failed:",
        err,
      );
    }
  };

  /* 
     TOGGLE STATUS

     Backend:
       PATCH /api/admin/users/:id/status
   */

  const handleToggleStatus = async (user) => {
    if (!user) return;

    const id =
      user._id ||
      user.userId;

    if (!id) return;

    try {
      await handleToggleUserStatus(id);

      await loadUsers({
        page: pagination.currentPage || 1,
        limit: pagination.rowsPerPage || 10,
        searchValue: search,
        filterValues: filters,
      });

      await fetchUserStats();
    } catch (err) {
      console.error(
        "Toggle user status failed:",
        err,
      );
    }
  };

  /* 
     DELETE USER

     Backend:
       DELETE /api/admin/users/:id

     Backend does NOT return deleted user.
   */

  const handleDelete = async (user) => {
    if (!user) return;

    const id =
      user._id ||
      user.userId;

    if (!id) return;

    try {
      await handleDeleteUser(id);

      setIsModalOpen(false);

      /*
        Refetch current page because backend uses
        server-side pagination.
      */

      await loadUsers({
        page: pagination.currentPage || 1,
        limit: pagination.rowsPerPage || 10,
        searchValue: search,
        filterValues: filters,
      });

      await fetchUserStats();
    } catch (err) {
      console.error(
        "Delete user failed:",
        err,
      );
    }
  };

  /* 
     RESTORE USER

     Backend:
       PATCH /api/admin/users/:id/restore

     Restored users are not automatically inserted
     into current list by hook.
   */

  const handleRestore = async (user) => {
    if (!user) return;

    const id =
      user._id ||
      user.userId;

    if (!id) return;

    try {
      await handleRestoreUser(id);

      await loadUsers({
        page: pagination.currentPage || 1,
        limit: pagination.rowsPerPage || 10,
        searchValue: search,
        filterValues: filters,
      });

      await fetchUserStats();
    } catch (err) {
      console.error(
        "Restore user failed:",
        err,
      );
    }
  };

  /* 
     STATISTICS

     Backend:
       GET /api/admin/users/stats

     Response:
       {
         totalUsers,
         activeUsers,
         suspendedUsers,
         inactiveUsers,
         verifiedUsers,
         pendingUsers,
         rejectedUsers,
         byRole
       }
   */

  const totalUsers =
    Number(stats?.totalUsers) || 0;

  const activeUsers =
    Number(stats?.activeUsers) || 0;

  const pendingUsers =
    Number(stats?.pendingUsers) || 0;

  const suspendedUsers =
    Number(stats?.suspendedUsers) || 0;

  const verifiedUsers =
    Number(stats?.verifiedUsers) || 0;

  const rejectedUsers =
    Number(stats?.rejectedUsers) || 0;

  /* 
     PAGINATION INFO
   */

  const totalItems =
    Number(pagination?.totalItems) || 0;

  const currentPage =
    Number(pagination?.currentPage) || 1;

  const rowsPerPage =
    Number(pagination?.rowsPerPage) || 10;

  const totalPages =
    Number(pagination?.totalPages) || 1;

  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          rowsPerPage +
        1;

  const endItem =
    totalItems === 0
      ? 0
      : Math.min(
          currentPage * rowsPerPage,
          totalItems,
        );

  /* 
     FILTER / SEARCH ACTIVE
   */

  const hasActiveFilters =
    Boolean(search.trim()) ||
    filters.role !== "all" ||
    filters.verificationStatus !== "all" ||
    filters.status !== "all";

  /* 
     LOADING SCREEN
   */

  if (
    loading &&
    users.length === 0 &&
    !selectedUser
  ) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Users
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage registered users, verification,
              and account status across CareScynify.
            </p>
          </div>

          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

              <p className="mt-4 text-sm font-medium text-gray-700">
                Loading users...
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Please wait
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* 
     ERROR
   */

  if (
    error &&
    users.length === 0 &&
    !loading
  ) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Users
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage registered users, verification,
              and account status across CareScynify.
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <span className="text-xl text-red-600">
                !
              </span>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Failed to load users
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                clearError();

                loadUsers({
                  page: 1,
                  limit:
                    pagination.rowsPerPage ||
                    10,
                  searchValue: search,
                  filterValues: filters,
                });

                fetchUserStats();
              }}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* 
     RENDER
   */

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Users
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage registered users, verification,
                and account status across CareScynify.
              </p>
            </div>

            {loading && users.length > 0 && (
              <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />

                Updating...
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* Total */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Total Users
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {totalUsers}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              All registered users
            </p>
          </div>

          {/* Active */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Active
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {activeUsers}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Active accounts
            </p>
          </div>

          {/* Pending */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-amber-600">
              {pendingUsers}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Awaiting verification
            </p>
          </div>

          {/* Suspended */}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Suspended
            </p>

            <p className="mt-2 text-2xl font-bold text-red-600">
              {suspendedUsers}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Suspended accounts
            </p>
          </div>
        </div>

        {/* =====================================================
            OPTIONAL VERIFICATION SUMMARY
        ===================================================== */}

        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">

          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-xs font-medium text-emerald-700">
              Verified Users
            </p>

            <p className="mt-1 text-xl font-bold text-emerald-800">
              {verifiedUsers}
            </p>
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-xs font-medium text-amber-700">
              Pending Verification
            </p>

            <p className="mt-1 text-xl font-bold text-amber-800">
              {pendingUsers}
            </p>
          </div>

          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-xs font-medium text-red-700">
              Rejected Users
            </p>

            <p className="mt-1 text-xl font-bold text-red-800">
              {rejectedUsers}
            </p>
          </div>
        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div className="mb-4">
          <UserSearch
            value={search}
            onChange={handleSearchChange}
            onClear={clearSearch}

            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            startItem={startItem}
            endItem={endItem}

            onRowsPerPageChange={
              handleRowsPerPageChange
            }

            onPreviousPage={
              handlePreviousPage
            }

            onNextPage={
              handleNextPage
            }
          />
        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div className="mb-6">
          <UserFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        {/* =====================================================
            ERROR WHILE REFRESHING
        ===================================================== */}

        {error && users.length > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={clearError}
              className="text-xs font-semibold text-red-700 hover:text-red-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* =====================================================
            RESULTS INFO
        ===================================================== */}

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {startItem}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-gray-800">
              {endItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {totalItems}
            </span>{" "}
            users
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="w-fit text-xs font-medium text-blue-600 transition hover:text-blue-700"
            >
              Clear all
            </button>
          )}
        </div>

        {/* =====================================================
            USERS TABLE
        ===================================================== */}

        <div className="relative">
          {loading && users.length > 0 && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-[1px]">
              <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-md">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />

                Loading...
              </div>
            </div>
          )}

          <UserTable
            users={users}
            onViewUser={handleViewUser}
          />
        </div>

        {/* =====================================================
            USER DETAILS MODAL
        ===================================================== */}

        <UserDetailsModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}

          onVerify={handleVerify}
          onReject={handleReject}

          onSuspend={handleSuspend}
          onActivate={handleActivate}
          onToggleStatus={handleToggleStatus}

          onDelete={handleDelete}
          onRestore={handleRestore}

          loading={loading}
          actionLoading={actionLoading}
        />
      </div>
    </div>
  );
};

export default AdminUsers;