import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVert";

const RevenueChart = ({ data, period, setPeriod }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const chartData = data?.data || [];
  const completedAppointments = data?.completedAppointments || 0;
  const total = data?.total || 0;
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
              Revenue Analytics
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              {period === "week"
                ? "Weekly earnings overview"
                : "Monthly earnings overview"}
            </Typography>
          </Box>

          <>
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
                  setPeriod("week");
                  handleClose();
                }}
              >
                This Week
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setPeriod("month");
                  handleClose();
                }}
              >
                This Month
              </MenuItem>

              <MenuItem
                onClick={() => {
                  const csvContent = chartData
                    .map((item) => `${item.name},${item.revenue}`)
                    .join("\n");

                  const blob = new Blob([`Day,Revenue\n${csvContent}`], {
                    type: "text/csv",
                  });

                  const url = window.URL.createObjectURL(blob);

                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "revenue-report.csv";
                  link.click();

                  window.URL.revokeObjectURL(url);

                  handleClose();
                }}
              >
                Export Data
              </MenuItem>
            </Menu>
          </>
        </Box>

        {/* Stats Row */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Rs {total.toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Total {period} revenue
            </Typography>
          </Box>

          <Chip
            icon={<TrendingUpRoundedIcon />}
            label={`${completedAppointments} completed`}
            sx={{
              bgcolor: "#dcfce7",
              color: "#16a34a",
              fontWeight: 600,
            }}
          />
        </Stack>

        {/* Chart */}
        <Box height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>

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

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                fill="url(#revColor)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
