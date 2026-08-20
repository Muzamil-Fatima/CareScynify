import { useCallback, useEffect, useState } from "react";

import {
  getVerificationRequests,
  getVerificationRequestById,
  approveVerification,
  rejectVerification,
  getVerificationStats,
} from "../../api/admin/adminVerificationApi";

const useAdminVerification = ({
  role = "all",
  verificationType = "all",
  status = "all",
  page = 1,
  limit = 10,
} = {}) => {
  const [requests, setRequests] = useState([]);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit,
    totalPages: 0,
  });

  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
  });

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH VERIFICATION REQUESTS

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getVerificationRequests({
        role,
        verificationType,
        status,
        page,
        limit,
      });

      setRequests(response?.data || []);

      setPagination(
        response?.pagination || {
          total: 0,
          page,
          limit,
          totalPages: 0,
        },
      );
    } catch (error) {
      console.error("Fetch Verification Requests Error:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to fetch verification requests",
      );

      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [role, verificationType, status, page, limit]);

  // FETCH VERIFICATION STATS

  const fetchStats = useCallback(async () => {
    try {
      const response = await getVerificationStats();

      setStats(
        response?.data || {
          totalRequests: 0,
          pendingRequests: 0,
          approvedRequests: 0,
          rejectedRequests: 0,
        },
      );
    } catch (error) {
      console.error("Fetch Verification Stats Error:", error);
    }
  }, []);

  // FETCH SINGLE VERIFICATION REQUEST

  const fetchRequestById = useCallback(async (userId) => {
    try {
      if (!userId) return null;

      const response = await getVerificationRequestById(userId);

      return response?.data || null;
    } catch (error) {
      console.error("Fetch Verification Request Error:", error);

      throw error;
    }
  }, []);

  // APPROVE VERIFICATION

  const handleApprove = useCallback(
    async (request) => {
      if (!request?._id) return null;

      try {
        setActionLoading(true);
        setError("");

        const response = await approveVerification(request._id);

        await Promise.all([fetchRequests(), fetchStats()]);

        return response?.data || null;
      } catch (error) {
        console.error("Approve Verification Error:", error);

        setError(
          error?.response?.data?.message || "Failed to approve verification",
        );

        throw error;
      } finally {
        setActionLoading(false);
      }
    },
    [fetchRequests, fetchStats],
  );

  // REJECT VERIFICATION

  const handleReject = useCallback(
    async (request, reason) => {
      if (!request?._id || !reason?.trim()) {
        return null;
      }

      try {
        setActionLoading(true);
        setError("");

        const response = await rejectVerification(request._id, reason.trim());

        await Promise.all([fetchRequests(), fetchStats()]);

        return response?.data || null;
      } catch (error) {
        console.error("Reject Verification Error:", error);

        setError(
          error?.response?.data?.message || "Failed to reject verification",
        );

        throw error;
      } finally {
        setActionLoading(false);
      }
    },
    [fetchRequests, fetchStats],
  );

  // INITIAL / FILTERED REQUESTS FETCH

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // INITIAL STATS FETCH

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // RETURN

  return {
    requests,
    pagination,
    stats,
    loading,
    actionLoading,
    error,

    fetchRequests,
    fetchStats,
    fetchRequestById,

    approveVerification: handleApprove,
    rejectVerification: handleReject,
  };
};

export default useAdminVerification;
