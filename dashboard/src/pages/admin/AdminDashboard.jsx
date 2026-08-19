import React from "react";

import AdminStatsCards from "../../components/admin/dashboard/AdminStatsCards";
import RegistrationChart from "../../components/admin/dashboard/RegistrationChart";
import PendingVerifications from "../../components/admin/dashboard/PendingVerifications";
import RecentActivity from "../../components/admin/dashboard//RecentActivity";
import PlatformStats from "../../components/admin/dashboard//PlatformStats";

const AdminDashboard = () => {
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
        <AdminStatsCards />

        {/* Registration Chart */}
        <RegistrationChart />

        {/* Pending Verifications */}
        <PendingVerifications />

        {/* Recent Activity */}
        <RecentActivity />

        {/* Platform Statistics */}
        <PlatformStats />
      </div>
    </div>
  );
};

export default AdminDashboard;
