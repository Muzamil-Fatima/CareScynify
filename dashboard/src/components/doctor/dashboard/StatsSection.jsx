import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";

const StatsSection = ({ data }) => {
  const stats = [
    {
      title: "Today's Appointments",
      value: data?.todayAppointments || 0,
      growth: `${data?.pendingAppointments || 0} upcoming`,
      icon: <EventAvailableRoundedIcon />,
      color: "#4f46e5",
      bg: "#eef2ff",
    },
    {
      title: "Total Patients",
      value: data?.totalPatients || 0,
      growth: `${data?.completedAppointments || 0} treated`,
      icon: <PeopleAltRoundedIcon />,
      color: "#059669",
      bg: "#ecfdf5",
    },
    {
      title: "Monthly Revenue",
      value: `Rs ${(data?.monthlyRevenue || 0).toLocaleString()}`,
      growth: `${data?.completedAppointments || 0} completed appointments`,
      icon: <AttachMoneyRoundedIcon />,
      color: "#ea580c",
      bg: "#fff7ed",
    },
    {
      title: "Patient Reviews",
      value: data?.reviewsCount || 0,
      growth: `${data?.averageRating || 0} ★ Average`,
      icon: <StarRoundedIcon />,
      color: "#eab308",
      bg: "#fefce8",
    },
    {
      title: "Workplaces",
      value: data?.totalWorkplaces || 0,
      growth: `${data?.onlineWorkplaces || 0} online available`,
      icon: <LocalHospitalRoundedIcon />,
      color: "#0891b2",
      bg: "#ecfeff",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: `repeat(${stats.length}, minmax(220px, 1fr))`,
          lg: `repeat(${stats.length}, 1fr)`,
        },
        gap: 2,
        overflowX: "auto",
        pb: 1,

        "&::-webkit-scrollbar": {
          height: 6,
        },

        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#cbd5e1",
          borderRadius: "10px",
        },
      }}
    >
      {stats.map((item, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: "18px",
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.04)",
            transition: "all .3s ease",
            minWidth: 0,

            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
            },
          }}
        >
          <CardContent
            sx={{
              p: { xs: 1.5, sm: 2 },
              display: "flex",
              alignItems: "center",
              gap: { xs: 1.2, md: 2 },

              "&:last-child": {
                pb: { xs: 1.5, sm: 2 },
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: { xs: 40, sm: 46, md: 52 },
                height: { xs: 40, sm: 46, md: 52 },
                minWidth: { xs: 40, sm: 46, md: 52 },
                borderRadius: "14px",
                backgroundColor: item.bg,
                color: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                "& svg": {
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.3rem",
                    md: "1.6rem",
                  },
                },
              }}
            >
              {item.icon}
            </Box>

            {/* Text */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: {
                    xs: "0.65rem",
                    sm: "0.75rem",
                    md: "0.85rem",
                    lg: "0.9rem",
                  },
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: "#0f172a",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mt: 0.4,
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                    md: "1.4rem",
                    lg: "1.6rem",
                  },
                }}
              >
                {item.value}
              </Typography>

              {item.growth && (
                <Typography
                  sx={{
                    color: "#10b981",
                    fontWeight: 600,
                    mt: 0.4,
                    fontSize: {
                      xs: "0.6rem",
                      sm: "0.7rem",
                      md: "0.8rem",
                    },
                  }}
                >
                  {item.growth} this month
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsSection;
