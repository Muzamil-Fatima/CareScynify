import React, { useContext, useMemo, useState } from "react";
import DoctorContext from "../../context/doctor/DoctorContext";
import useDoctorAppointments from "../../hooks/useDoctorAppointments";
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

const RevenueChart = () => {
  const { profile, activeWorkplaceId } = useContext(DoctorContext);
  const [filter, setFilter] = useState("week");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { appointments } = useDoctorAppointments(activeWorkplaceId);
  const data = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const weeklyData = days.map((day) => ({
      name: day,
      revenue: 0,
    }));

    const today = new Date();

    const filteredAppointments = appointments.filter((appt) => {
      if (appt.status !== "completed") return false;

      const apptDate = new Date(appt.appointmentDate);

      if (filter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);

        return apptDate >= weekAgo && apptDate <= today;
      }

      if (filter === "month") {
        return (
          apptDate.getMonth() === today.getMonth() &&
          apptDate.getFullYear() === today.getFullYear()
        );
      }

      return true;
    });

    filteredAppointments.forEach((appt) => {
      const appointmentDay = new Date(appt.appointmentDate).getDay();

      const workplace = profile?.doctor?.workplaces?.find(
        (w) => w._id?.toString() === appt.workplaceId?.toString(),
      );

      const fee = workplace?.settings?.appointmentFee || 0;

      weeklyData[appointmentDay].revenue += fee;
    });

    return weeklyData;
  }, [appointments, profile, filter]);
  const completedAppointments = appointments.filter(
    (a) => a.status === "completed",
  ).length;
  const total = data.reduce((sum, d) => sum + d.revenue, 0);

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
              {filter === "week"
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
                  setFilter("week");
                  handleClose();
                }}
              >
                This Week
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setFilter("month");
                  handleClose();
                }}
              >
                This Month
              </MenuItem>

              <MenuItem
                onClick={() => {
                  const csvContent = data
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
              Total {filter} revenue
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
            <AreaChart data={data}>
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
