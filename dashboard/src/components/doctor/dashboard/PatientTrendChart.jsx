import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const PatientTrendChart = ({ data }) => {
  const chartData = data?.data || [];
  const handleExport = () => {
    const csvContent = chartData
      .map((item) => `${item.name},${item.patients}`)
      .join("\n");

    const blob = new Blob([`Time Slot,Patients\n${csvContent}`], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "patient-trend.csv";
    link.click();

    window.URL.revokeObjectURL(url);
  };
  const totalPatients = data?.totalPatients || 0;
  const peak = data?.peak || 0;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      sx={{
        borderRadius: "22px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 10px 25px rgba(0,0,0,0.04)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Patient Flow Trend
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Daily clinic traffic overview
            </Typography>
          </Box>

          <IconButton onClick={handleOpen}>
            <MoreVertRoundedIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              This Week
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              This Month
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleExport();
                handleClose();
              }}
            >
              Export Data
            </MenuItem>
          </Menu>
        </Box>

        {/* Stats */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {totalPatients}
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Total today patients
            </Typography>
          </Box>

          <Chip
            icon={<TrendingUpRoundedIcon />}
            label={`Peak: ${peak} patients`}
            sx={{
              bgcolor: "#dbeafe",
              color: "#1d4ed8",
              fontWeight: 600,
            }}
          />
        </Stack>

        {/* Chart */}
        <Box height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="patients"
                fill="#7c3aed"
                radius={[8, 8, 0, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PatientTrendChart;
