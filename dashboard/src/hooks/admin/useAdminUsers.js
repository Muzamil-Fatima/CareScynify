
import { useCallback, useState } from "react";

import {
  getUsers,
  getUserById,
  getUserStats,
  verifyUser,
  rejectUser,
  suspendUser,
  activateUser,
  toggleUserStatus,
  deleteUser,
  restoreUser,
} from "../../api/admin/adminUsersApi";

/* ==
   INITIAL PAGINATION
== */

const INITIAL_PAGINATION = {
  currentPage: 1,
  rowsPerPage: 10,
  totalItems: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

/* ==
   HELPER
== */

const getUserId = (user) => {
  if (!user) return null;

  return user._id ?? user.userId ?? null;
};

/* ==
   ADMIN USERS HOOK
== */

const useAdminUser = () => {
  /* ------
     STATE
  ------ */

  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [stats, setStats] = useState(null);

  const [pagination, setPagination] = useState(
    INITIAL_PAGINATION,
  );

  const [loading, setLoading] = useState(false);

  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState(null);

  /* 
     UPDATE USER IN CURRENT LIST
   */

  const updateUserInList = useCallback((updatedUser) => {
    if (!updatedUser) return;

    const updatedId = String(getUserId(updatedUser));

    setUsers((previousUsers) =>
      previousUsers.map((user) => {
        const currentId = String(getUserId(user));

        if (currentId === updatedId) {
          return updatedUser;
        }

        return user;
      }),
    );
  }, []);

  /* 
     FETCH USERS
     
     Backend:
     GET /api/admin/users

     Query:
     page
     limit
     search
     role
     verificationStatus
     status
     sortBy
     sortOrder

     Response:
     {
       success,
       message,
       data: [],
       pagination: {}
     }
   */

  const fetchUsers = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const requestParams = {
        page: Number(params.page) || 1,

        limit: Number(params.limit) || 10,

        search:
          typeof params.search === "string"
            ? params.search.trim()
            : "",

        role: params.role || "all",

        verificationStatus:
          params.verificationStatus || "all",

        status: params.status || "all",

        sortBy: params.sortBy || "createdAt",

        sortOrder: params.sortOrder || "desc",
      };

      console.log(
        "Fetching admin users:",
        requestParams,
      );

      const response = await getUsers(requestParams);

      console.log(
        "Admin users response:",
        response,
      );

      /* --
         BACKEND ERROR
      -- */

      if (!response?.success) {
        setUsers([]);

        setPagination(INITIAL_PAGINATION);

        const message =
          response?.message ||
          "Failed to fetch users";

        setError(message);

        return response;
      }

      /* --
         USERS
      -- */

      const userData = Array.isArray(response.data)
        ? response.data
        : [];

      setUsers(userData);

      /* --
         PAGINATION
      -- */

      if (response.pagination) {
        const backendPagination =
          response.pagination;

        setPagination({
          currentPage:
            Number(
              backendPagination.currentPage,
            ) || requestParams.page,

          rowsPerPage:
            Number(
              backendPagination.rowsPerPage,
            ) || requestParams.limit,

          totalItems:
            Number(
              backendPagination.totalItems,
            ) || 0,

          totalPages:
            Math.max(
              1,
              Number(
                backendPagination.totalPages,
              ) || 1,
            ),

          hasNextPage:
            Boolean(
              backendPagination.hasNextPage,
            ),

          hasPreviousPage:
            Boolean(
              backendPagination.hasPreviousPage,
            ),
        });
      } else {
        setPagination({
          ...INITIAL_PAGINATION,

          currentPage: requestParams.page,

          rowsPerPage: requestParams.limit,

          totalItems: userData.length,

          totalPages: 1,
        });
      }

      return response;
    } catch (err) {
      console.error(
        "fetchUsers error:",
        err,
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch users";

      setError(message);

      setUsers([]);

      setPagination(INITIAL_PAGINATION);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /* 
     FETCH SINGLE USER
     
     Backend:
     GET /api/admin/users/:id
   */

  const fetchUserById = useCallback(async (id) => {
    try {
      if (!id) {
        throw new Error(
          "User ID is required",
        );
      }

      setLoading(true);
      setError(null);

      console.log(
        "Fetching admin user:",
        id,
      );

      const response =
        await getUserById(id);

      console.log(
        "Admin user details response:",
        response,
      );

      if (!response?.success) {
        setSelectedUser(null);

        setError(
          response?.message ||
            "Failed to fetch user",
        );

        return response;
      }

      setSelectedUser(
        response.data || null,
      );

      return response;
    } catch (err) {
      console.error(
        "fetchUserById error:",
        err,
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch user";

      setError(message);

      setSelectedUser(null);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /* 
     FETCH USER STATISTICS
     
     Backend:
     GET /api/admin/users/stats

     Response:
     {
       success,
       message,
       data: {
         totalUsers,
         activeUsers,
         suspendedUsers,
         inactiveUsers,
         verifiedUsers,
         pendingUsers,
         rejectedUsers,
         byRole: {
           doctor,
           patient,
           pharmacy,
           laboratory,
           admin
         }
       }
     }
   */

  const fetchUserStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(
        "Fetching admin user statistics...",
      );

      const response =
        await getUserStats();

      console.log(
        "Admin user stats response:",
        response,
      );

      if (!response?.success) {
        setStats(null);

        setError(
          response?.message ||
            "Failed to fetch user statistics",
        );

        return response;
      }

      setStats(
        response.data || null,
      );

      return response;
    } catch (err) {
      console.error(
        "fetchUserStats error:",
        err,
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch user statistics";

      setError(message);

      setStats(null);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /* 
     COMMON USER ACTION
     
     Used by:
     - verify
     - reject
     - suspend
     - activate
     - toggle status
   */

  const performUserAction = useCallback(
    async ({
      id,
      action,
      actionName,
    }) => {
      try {
        if (!id) {
          throw new Error(
            "User ID is required",
          );
        }

        setActionLoading(true);
        setError(null);

        console.log(
          `Performing ${actionName}:`,
          id,
        );

        const response =
          await action(id);

        console.log(
          `${actionName} response:`,
          response,
        );

        /* 
           SUCCESS
         */

        if (response?.success) {
          /*
            Backend returns updated user in:

            response.data
          */

          if (response.data) {
            setSelectedUser(
              response.data,
            );

            updateUserInList(
              response.data,
            );
          }

          return response;
        }

        /* 
           BACKEND RETURNED success:false
         */

        const message =
          response?.message ||
          `Failed to ${actionName}`;

        setError(message);

        return response;
      } catch (err) {
        console.error(
          `${actionName} error:`,
          err,
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          `Failed to ${actionName}`;

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [updateUserInList],
  );

  /* 
     VERIFY USER
     
     PATCH /api/admin/users/:id/verify
   */

  const handleVerifyUser = useCallback(
    (id) =>
      performUserAction({
        id,
        action: verifyUser,
        actionName: "verify user",
      }),
    [performUserAction],
  );

  /* 
     REJECT USER
     
     PATCH /api/admin/users/:id/reject
   */

  const handleRejectUser = useCallback(
    (id) =>
      performUserAction({
        id,
        action: rejectUser,
        actionName: "reject user",
      }),
    [performUserAction],
  );

  /* 
     SUSPEND USER
     
     PATCH /api/admin/users/:id/suspend
   */

  const handleSuspendUser = useCallback(
    (id) =>
      performUserAction({
        id,
        action: suspendUser,
        actionName: "suspend user",
      }),
    [performUserAction],
  );

  /* 
     ACTIVATE USER
     
     PATCH /api/admin/users/:id/activate
   */

  const handleActivateUser = useCallback(
    (id) =>
      performUserAction({
        id,
        action: activateUser,
        actionName: "activate user",
      }),
    [performUserAction],
  );

  /* 
     TOGGLE USER STATUS
     
     PATCH /api/admin/users/:id/status
   */

  const handleToggleUserStatus =
    useCallback(
      (id) =>
        performUserAction({
          id,
          action: toggleUserStatus,
          actionName:
            "update user status",
        }),
      [performUserAction],
    );

  /* 
     DELETE USER
     
     DELETE /api/admin/users/:id

     Backend response:
     {
       success: true,
       message: "User deleted successfully"
     }

     NOTE:
     Backend does NOT return deleted user data.
   */

  const handleDeleteUser = useCallback(
    async (id) => {
      try {
        if (!id) {
          throw new Error(
            "User ID is required",
          );
        }

        setActionLoading(true);
        setError(null);

        console.log(
          "Deleting admin user:",
          id,
        );

        const response =
          await deleteUser(id);

        console.log(
          "Delete user response:",
          response,
        );

        if (!response?.success) {
          const message =
            response?.message ||
            "Failed to delete user";

          setError(message);

          return response;
        }

        /* 
           Remove user from current UI list
         */

        const deletedId = String(id);

        setUsers((previousUsers) =>
          previousUsers.filter(
            (user) =>
              String(
                getUserId(user),
              ) !== deletedId,
          ),
        );

        /* 
           Clear selected user
         */

        setSelectedUser(null);

        /* 
           Update total count
         */

        setPagination((previous) => ({
          ...previous,

          totalItems: Math.max(
            0,
            previous.totalItems - 1,
          ),
        }));

        return response;
      } catch (err) {
        console.error(
          "handleDeleteUser error:",
          err,
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to delete user";

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [],
  );

  /* 
     RESTORE USER
     
     PATCH /api/admin/users/:id/restore

     Backend response:
     {
       success: true,
       message: "User restored successfully",
       data: user
     }

     IMPORTANT:
     Your getUsers endpoint ONLY returns:
     isDeleted: false

     Therefore, after restoring a deleted user,
     it is safer to let the page refetch its current
     filters rather than blindly inserting the user.
   */

  const handleRestoreUser = useCallback(
    async (id) => {
      try {
        if (!id) {
          throw new Error(
            "User ID is required",
          );
        }

        setActionLoading(true);
        setError(null);

        console.log(
          "Restoring admin user:",
          id,
        );

        const response =
          await restoreUser(id);

        console.log(
          "Restore user response:",
          response,
        );

        if (!response?.success) {
          const message =
            response?.message ||
            "Failed to restore user";

          setError(message);

          return response;
        }

        /* 
           Backend returns restored user
         */

        if (response.data) {
          setSelectedUser(
            response.data,
          );

          /*
            Do NOT automatically insert it into the
            current users list because the current list
            may have search/filter/pagination conditions.

            The component can call fetchUsers() afterward.
          */
        }

        return response;
      } catch (err) {
        console.error(
          "handleRestoreUser error:",
          err,
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to restore user";

        setError(message);

        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    [],
  );

  /* 
     CLEAR SELECTED USER
   */

  const clearSelectedUser =
    useCallback(() => {
      setSelectedUser(null);
    }, []);

  /* 
     CLEAR ERROR
   */

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /* 
     RESET PAGINATION
   */

  const resetPagination =
    useCallback(() => {
      setPagination(
        INITIAL_PAGINATION,
      );
    }, []);

  /* 
     RETURN
   */

  return {
    /* 
       USERS
     */

    users,

    selectedUser,

    stats,

    pagination,

    /* 
       LOADING
     */

    loading,

    actionLoading,

    /* 
       ERROR
     */

    error,

    /* 
       FETCH
     */

    fetchUsers,

    fetchUserById,

    fetchUserStats,

    /* 
       USER ACTIONS
     */

    handleVerifyUser,

    handleRejectUser,

    handleSuspendUser,

    handleActivateUser,

    handleToggleUserStatus,

    handleDeleteUser,

    handleRestoreUser,

    /* 
       HELPERS
     */

    clearSelectedUser,

    clearError,

    resetPagination,
  };
};

export default useAdminUser;