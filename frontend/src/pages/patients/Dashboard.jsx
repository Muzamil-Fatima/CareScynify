
import React from "react";
import DashboardHero from "../../Components/patient/patientDashboard/DashboardHero";
import StatsCards from "../../Components/patient/patientDashboard/StatsCards";
import UpcomingAppointments from "../../Components/patient/patientDashboard/UpcomingAppointments";
import AIAnalyzerCard from "../../Components/patient/patientDashboard/AIAnalyzerCard";
import RecentReports from "../../Components/patient/patientDashboard/RecentReports";
import HealthTips from "../../Components/patient/patientDashboard/HealthTips";
import HealthcareServices from "../../Components/patient/patientDashboard/HealthcareServices";

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
