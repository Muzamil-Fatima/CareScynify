import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  LinearProgress,
  Button,
} from "@mui/material";

import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const ProfileStatusCard = ({ data }) => {

  const profileCompletion = data?.profileCompletion || 0;
  const statusItems = data?.statusItems || [];
  const iconMap = {
    verified: <VerifiedUserRoundedIcon />,
    security: <SecurityRoundedIcon />,
    credentials: <SchoolRoundedIcon />,
    badge: <BadgeRoundedIcon />,
  };
  return (
    <Card
      sx={{
        borderRadius: "22px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 10px 25px rgba(0,0,0,0.04)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box mb={2}>
          <Typography variant="h6" fontWeight={700}>
            Profile Status
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            Verification & compliance overview
          </Typography>
        </Box>

        {/* Progress */}
        <Box mb={3}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="body2" fontWeight={600}>
              Profile Completion
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {profileCompletion}%
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={profileCompletion}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#e2e8f0",
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                backgroundColor: profileCompletion > 80 ? "#16a34a" : "#f59e0b",
              },
            }}
          />
        </Box>

        {/* Status Items */}
        <Stack spacing={2}>
          {statusItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderRadius: "14px",
                backgroundColor: item.bg,
              }}
            >
              {/* Left */}
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                    backgroundColor: "#fff",
                  }}
                >
                  {iconMap[item.icon]}
                </Box>

                <Typography fontWeight={600} fontSize={14}>
                  {item.label}
                </Typography>
              </Box>

              {/* Status */}
              <Chip
                label={item.status}
                size="small"
                sx={{
                  fontWeight: 700,
                  color: item.color,
                  backgroundColor: "#fff",
                }}
              />
            </Box>
          ))}
        </Stack>

        {/* Footer */}
        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 700,
              backgroundColor: "#4f46e5",
              "&:hover": {
                backgroundColor: "#4338ca",
              },
            }}
          >
            Complete Profile Setup
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileStatusCard;
