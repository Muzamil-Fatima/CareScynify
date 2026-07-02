import React from "react";
import { Box } from "@mui/material";

import DashboardHero from "../../components/dashboard/DashboardHero";
import PatientTrendChart from "../../components/dashboard/PatientTrendChart";
import ProfileStatusCard from "../../components/dashboard/ProfileStatusCard";
import QuickActionsCard from "../../components/dashboard/QuickActionsCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import StatsSection from "../../components/dashboard/StatsSection";

const DrDashboard = () => {
  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      {/* Hero Section */}
      <DashboardHero />

      {/* Stats Section */}
      <Box mt={3}>
        <StatsSection />
      </Box>

      {/* Charts + Profile Section */}
      <Box
        mt={3}
        sx={{
          display: "grid",
          gap: 3,

          // Large screens: 40% | 30% | 30%
          // Small screens: keep all in one row with horizontal scroll
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
        <RevenueChart />
        <PatientTrendChart />
        <ProfileStatusCard />
      </Box>

      {/* Quick Actions */}
      <Box mt={3}>
        <QuickActionsCard />
      </Box>
    </Box>
  );
};

export default DrDashboard;