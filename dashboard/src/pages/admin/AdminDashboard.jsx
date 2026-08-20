import React from "react";

import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import RegistrationChart from "../../components/admin/dashboard/RegistrationChart";
import PendingVerifications from "../../components/admin/dashboard/PendingVerifications";
import PlatformStats from "../../components/admin/dashboard/PlatformStats";

import useAdminDashboard from "../../hooks/admin/useAdminDashboard";

const AdminDashboard = () => {
  const { dashboardData, period, loading, error, changePeriod } =
    useAdminDashboard(7);

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-slate-50 p-6">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-slate-50">
      <div className="mx-auto w-full max-w-400 space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="text-sm text-slate-500 sm:text-base">
            Monitor and manage your CareScynify platform
          </p>
        </div>

        {/* Statistics Cards */}
        <AdminStatsCards stats={dashboardData?.stats} />

        {/* Registration Chart */}
        <RegistrationChart
          registrationOverview={dashboardData?.registrationOverview}
          period={period}
          onPeriodChange={changePeriod}
        />

        {/* Pending Verifications */}
        <PendingVerifications
          data={dashboardData?.pendingVerificationSummary}
        />

        {/* Platform Statistics */}
        <PlatformStats
          data={dashboardData?.platformDistribution}
          growth={dashboardData?.platformGrowth}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
