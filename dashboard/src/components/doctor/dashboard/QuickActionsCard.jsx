import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospital";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import RateReviewRoundedIcon from "@mui/icons-material/RateReview";

const actions = [
  {
    title: "Add Patient",
    icon: <PersonAddAltRoundedIcon />,
    color: "#16a34a",
    bg: "#ecfdf5",
  },
  {
    title: "Create Appointment",
    icon: <EventNoteRoundedIcon />,
    color: "#4f46e5",
    bg: "#eef2ff",
  },
  {
    title: "Manage Workplace",
    icon: <LocalHospitalRoundedIcon />,
    color: "#0ea5e9",
    bg: "#e0f2fe",
  },
  {
    title: "View Appointments",
    icon: <AddRoundedIcon />,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    title: "Patient Reviews",
    icon: <RateReviewRoundedIcon />,
    color: "#7c3aed",
    bg: "#f3e8ff",
  },
];

const QuickActionsCard = () => {
  const handleClick = (title) => {
    console.log(`${title} clicked`);
  };

  return (
    <Card
      sx={{
        borderRadius: "22px",
        border: "1px solid #e2e8f0",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.04), 0 10px 25px rgba(0,0,0,0.04)",
        width: "100%",
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, md: 3 },
        }}
      >
        {/* Header */}
        <Box mb={3}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#0f172a",
              fontSize: {
                xs: "1.1rem",
                sm: "1.25rem",
                md: "1.4rem",
              },
            }}
          >
            Quick Actions
          </Typography>

          <Typography
            sx={{
              color: "#64748b",
              mt: 0.5,
              fontSize: {
                xs: "0.8rem",
                sm: "0.9rem",
                md: "0.95rem",
              },
            }}
          >
            Fast access to important tasks
          </Typography>
        </Box>

        {/* Actions Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fit, minmax(140px, 1fr))",
              sm: "repeat(auto-fit, minmax(160px, 1fr))",
              lg: "repeat(5, 1fr)",
            },
            gap: 2,
            width: "100%",
          }}
        >
          {actions.map((action, index) => (
            <Box
              key={index}
              onClick={() => handleClick(action.title)}
              sx={{
                p: { xs: 1.5, md: 2 },
                borderRadius: "16px",
                backgroundColor: action.bg,
                cursor: "pointer",
                transition: "all .3s ease",
                border: "1px solid transparent",
                width: "100%",
                minHeight: { xs: 100, md: 120 },

                display: "flex",
                alignItems: "center",

                "&:hover": {
                  transform: "translateY(-4px)",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Stack spacing={1.5}>
                <Box
                  sx={{
                    width: { xs: 40, md: 48 },
                    height: { xs: 40, md: 48 },
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: action.color,
                    backgroundColor: "#fff",

                    "& svg": {
                      fontSize: {
                        xs: "1.2rem",
                        md: "1.5rem",
                      },
                    },
                  }}
                >
                  {action.icon}
                </Box>

                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#0f172a",
                    fontSize: {
                      xs: "0.8rem",
                      sm: "0.9rem",
                      md: "1rem",
                    },
                    lineHeight: 1.3,
                  }}
                >
                  {action.title}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;