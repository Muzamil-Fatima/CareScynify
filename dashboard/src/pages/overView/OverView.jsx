import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventIcon from "@mui/icons-material/Event";
import ScienceIcon from "@mui/icons-material/Science";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const stats = [
  {
    title: "Total Doctors",
    value: 24,
    icon: <MedicalServicesIcon fontSize="large" />,
    color: "#1976d2"
  },
  {
    title: "Total Patients",
    value: 340,
    icon: <PeopleIcon fontSize="large" />,
    color: "#2e7d32"
  },
  {
    title: "Today's Appointments",
    value: 18,
    icon: <EventIcon fontSize="large" />,
    color: "#ed6c02"
  },
  {
    title: "Lab Reports",
    value: 12,
    icon: <ScienceIcon fontSize="large" />,
    color: "#9c27b0"
  },
  {
    title: "Monthly Revenue",
    value: "Rs 450,000",
    icon: <AttachMoneyIcon fontSize="large" />,
    color: "#d32f2f"
  }
];

const Overview = () => {
  return (
    <Box p={3}>

      {/* Title */}
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Hospital Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((item, index) => (
          <Grid size={{ xs: 12, md: 4, lg: 3 }} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8
                }
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2
                }}
              >
                <Box
                  sx={{
                    background: item.color,
                    color: "white",
                    p: 1.5,
                    borderRadius: 2
                  }}
                >
                  {item.icon}
                </Box>

                <Box>
                  <Typography color="text.secondary">
                    {item.title}
                  </Typography>

                  <Typography variant="h6" fontWeight="bold">
                    {item.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity Section */}
      <Box mt={6}>
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Recent Activity
            </Typography>

            <Typography color="text.secondary">
              • New patient registered
            </Typography>

            <Typography color="text.secondary">
              • Dr Ahmed added a new prescription
            </Typography>

            <Typography color="text.secondary">
              • Lab report uploaded
            </Typography>

            <Typography color="text.secondary">
              • Appointment scheduled
            </Typography>

          </CardContent>
        </Card>
      </Box>

    </Box>
  );
};

export default Overview;