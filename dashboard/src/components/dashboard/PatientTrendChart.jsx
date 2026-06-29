import React, { useContext, useMemo, useState } from "react";
import DoctorContext from "../../context/doctor/DoctorContext";
import useDoctorAppointments from "../../hooks/useDoctorAppointments";
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
const PatientTrendChart = () => {
  const { activeWorkplaceId } = useContext(DoctorContext);
  const [filter, setFilter] = useState("week");

  const { appointments } = useDoctorAppointments(activeWorkplaceId);
  const data = useMemo(() => {
    const slots = [
      { name: "9 AM", patients: 0 },
      { name: "11 AM", patients: 0 },
      { name: "1 PM", patients: 0 },
      { name: "3 PM", patients: 0 },
      { name: "5 PM", patients: 0 },
      { name: "7 PM", patients: 0 },
    ];

    const today = new Date();

    const filteredAppointments = appointments.filter((appt) => {
      if (appt.status !== "confirmed" && appt.status !== "completed")
        return false;

      const apptDate = new Date(appt.appointmentDate);

      // This Week
      if (filter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);

        return apptDate >= weekAgo && apptDate <= today;
      }

      // This Month
      if (filter === "month") {
        return (
          apptDate.getMonth() === today.getMonth() &&
          apptDate.getFullYear() === today.getFullYear()
        );
      }

      return true;
    });

    filteredAppointments.forEach((appt) => {
      const hour = Number(appt.appointmentTime?.split(":")[0]);

      if (hour >= 8 && hour < 10) slots[0].patients++;
      else if (hour >= 10 && hour < 12) slots[1].patients++;
      else if (hour >= 12 && hour < 14) slots[2].patients++;
      else if (hour >= 14 && hour < 16) slots[3].patients++;
      else if (hour >= 16 && hour < 18) slots[4].patients++;
      else if (hour >= 18 && hour < 20) slots[5].patients++;
    });

    return slots;
  }, [appointments, filter]);
  const handleExport = () => {
    const csvContent = data
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
  const totalPatients = data.reduce((sum, d) => sum + d.patients, 0);
  const peak = Math.max(...data.map((d) => d.patients));
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
            <BarChart data={data}>
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
