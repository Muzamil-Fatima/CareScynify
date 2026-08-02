import React, { useEffect } from "react";

import LabDashboardHeader from "../../components/laboratory/dashboard/LabDashboardHeader";
import LabStatsCards from "../../components/laboratory/dashboard/LabStatsCards";
import SampleOverview from "../../components/laboratory/dashboard/SampleOverview";
import RecentSamples from "../../components/laboratory/dashboard/RecentSamples";
import TestPerformance from "../../components/laboratory/dashboard/TestPerformance";
import QuickActions from "../../components/laboratory/dashboard/QuickActions";

import useLabDashboard from "../../hooks/laboratory/useLabDashboard";

const LabDashboard = () => {
  const {
    fetchLabDashboardStats,
    fetchRecentSamples,
    fetchTestPerformance,
    fetchMonthlyReports,
    fetchPendingSamples,
  } = useLabDashboard();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        await Promise.all([
          fetchLabDashboardStats(),
          fetchRecentSamples(),
          fetchTestPerformance(),
          fetchMonthlyReports(),
          fetchPendingSamples(),
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    loadDashboard();
  }, [
    fetchLabDashboardStats,
    fetchRecentSamples,
    fetchTestPerformance,
    fetchMonthlyReports,
    fetchPendingSamples,
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <main className="max-w-7xl mx-auto">
        <LabDashboardHeader />

        <LabStatsCards />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <RecentSamples />
          </div>

          <div>
            <SampleOverview />
          </div>
        </div>
        <div className="mt-8">
          <QuickActions />
        </div>
        <div className=" mt-8">
          <TestPerformance />
        </div>
      </main>
    </div>
  );
};

export default LabDashboard;
