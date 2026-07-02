
import React from "react";
import DashboardHero from "../../Components/patientDashboard/DashboardHero";
import StatsCards from "../../Components/patientDashboard/StatsCards";
import UpcomingAppointments from "../../Components/patientDashboard/UpcomingAppointments";
import AIAnalyzerCard from "../../Components/patientDashboard/AIAnalyzerCard";
import RecentReports from "../../Components/patientDashboard/RecentReports";
import HealthTips from "../../Components/patientDashboard/HealthTips";
import HealthcareServices from "../../Components/patientDashboard/HealthcareServices";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Hero Section */}
      <DashboardHero />

      {/* Statistics Cards */}
      <div className="mt-6">
        <StatsCards />
      </div>

      {/* Appointments + AI Analyzer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <UpcomingAppointments />
        </div>

        <div>
          <AIAnalyzerCard />
        </div>
      </div>

      {/* Reports + Health Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentReports />
        <HealthTips />
      </div>

      {/* Healthcare Services */}
      <div className="mt-6">
        <HealthcareServices />
      </div>
    </div>
  );
};

export default Dashboard;
