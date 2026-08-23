import React, { useState } from "react";
import { Box } from "@mui/material";

import DashboardHero from "../../components/doctor/dashboard/DashboardHero";
import PatientTrendChart from "../../components/doctor/dashboard/PatientTrendChart";
import ProfileStatusCard from "../../components/doctor/dashboard/ProfileStatusCard";
import QuickActionsCard from "../../components/doctor/dashboard/QuickActionsCard";
import RevenueChart from "../../components/doctor/dashboard/RevenueChart";
import StatsSection from "../../components/doctor/dashboard/StatsSection";

import useDoctorDashboard from "../../hooks/doctor/useDoctorDashboard";
const DrDashboard = () => {
  const [period, setPeriod] = useState("week");

  const { dashboard } = useDoctorDashboard(period);
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      {/* Hero Section */}
      <DashboardHero data={dashboard?.hero} />

      {/* Stats Section */}
      <Box mt={3}>
        <StatsSection data={dashboard?.stats} />
      </Box>

      {/* Charts + Profile Section */}
      <Box
        mt={3}
        sx={{
          display: "grid",
          gap: 3,

          gridTemplateColumns: {
            xs: "repeat(3, minmax(260px, 1fr))",
            lg: "4fr 3fr 3fr",
          },

          overflowX: "auto",
          pb: 1,

          "&::-webkit-scrollbar": {
            height: 8,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#cbd5e1",
            borderRadius: "10px",
          },
        }}
      >
        <RevenueChart
          data={dashboard?.revenue}
          period={period}
          setPeriod={setPeriod}
        />
        <PatientTrendChart data={dashboard?.patientTrend} />
        <ProfileStatusCard data={dashboard?.profile} />
      </Box>

      {/* Quick Actions */}
      <Box mt={3}>
        <QuickActionsCard />
      </Box>
    </Box>
  );
};

export default DrDashboard;
