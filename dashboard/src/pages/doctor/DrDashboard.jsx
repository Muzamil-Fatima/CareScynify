import React, { useEffect } from "react";
import DoctorLayout from "../doctor/Layout";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
  IconButton
} from "@mui/material";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import VideoCallIcon from "@mui/icons-material/VideoCall";

const earningsData = [
  { name: "Mon", amount: 12000 },
  { name: "Tue", amount: 19000 },
  { name: "Wed", amount: 15000 },
  { name: "Thu", amount: 22000 },
  { name: "Fri", amount: 85000 },
  { name: "Sat", amount: 30000 },
];

const patientFlowData = [
  { name: "9 AM", checkins: 4 },
  { name: "11 AM", checkins: 9 },
  { name: "1 PM", checkins: 6 },
  { name: "3 PM", checkins: 12 },
  { name: "5 PM", checkins: 7 },
];

const premiumCardStyle = {
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  boxShadow: "0px 1px 3px rgba(15, 23, 42, 0.03), 0px 10px 20px -5px rgba(15, 23, 42, 0.05)",
  overflow: "hidden"
};

const StatCard = ({ title, value, icon, percentage, iconColor, iconBg }) => {
  return (
    <Card sx={premiumCardStyle}>
      <CardContent sx={{ p: "20px !important" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" fontWeight="500" sx={{ color: "#64748b", fontSize: "13px" }}>
              {title}
            </Typography>
            <Typography variant="h5" fontWeight="700" sx={{ color: "#0f172a", mt: 0.5, mb: 0.5, letterSpacing: "-0.5px" }}>
              {value}
            </Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
              <ArrowUpwardIcon sx={{ fontSize: "14px", color: "#10b981" }} />
              <Typography variant="caption" fontWeight="600" sx={{ color: "#10b981" }}>
                {percentage} <span style={{ color: "#94a3b8", fontWeight: "400" }}>this week</span>
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "44px", height: "44px", borderRadius: "12px", 
            backgroundColor: iconBg, color: iconColor
          }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const DrDashboard = () => {
  // Direct effect injection to wipe out global scrollbars completely
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <DoctorLayout>
      {/* Scrollbar hidden master content frame container */}
      <Box sx={{ 
        overflowY: "auto", 
        overflowX: "hidden", 
        maxHeight: "calc(100vh - 40px)", 
        width: "100%",
        pr: 1,
        "&::-webkit-scrollbar": { display: "none" }, // Removes Webkit custom scroll bars
        msOverflowStyle: "none", // IE
        scrollbarWidth: "none" // Firefox
      }}>
        
        {/* Top Bar Header Area */}
        <Box display="flex" flex={1} flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={2} mb={4} mt={1}>
          <Box>
            <Typography variant="h4" fontWeight="700" sx={{ color: "#0f172a", letterSpacing: "-0.5px" }}>
              Dashboard Overview
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mt: 0.2 }}>
              Welcome back, Dr. Ali. Here is your clinic status updates tracker.
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            disableElevation
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              borderRadius: "10px", px: 2.5, py: 1.2, textTransform: "none", fontWeight: "600", fontSize: "14px",
              "&:hover": { backgroundColor: "#4338ca" }
            }}
          >
            New Appointment
          </Button>
        </Box>

        {/* Primary Analytics Row Grid (Strictly locked 4 blocks layout grid row matrix) */}
        <Grid container spacing={2.5} mb={3.5}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StatCard
              title="Today's Appointments"
              value="18"
              icon={<EventIcon sx={{ fontSize: "20px" }} />}
              percentage="+12%"
              iconColor="#4f46e5"
              iconBg="#eef2ff"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StatCard
              title="Upcoming Checkups"
              value="42"
              icon={<CalendarMonthIcon sx={{ fontSize: "20px" }} />}
              percentage="+8%"
              iconColor="#0284c7"
              iconBg="#f0f9ff"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StatCard
              title="Total Patients"
              value="1,420"
              icon={<PeopleIcon sx={{ fontSize: "20px" }} />}
              percentage="+24%"
              iconColor="#16a34a"
              iconBg="#f0fdf4"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <StatCard
              title="Monthly Revenue"
              value="Rs 185K"
              icon={<MonetizationOnIcon sx={{ fontSize: "20px" }} />}
              percentage="+18%"
              iconColor="#dc2626"
              iconBg="#fef2f2"
            />
          </Grid>
        </Grid>

        {/* Charts Modules Panel Layout */}
        <Grid container spacing={3} mb={3.5}>
          <Grid item xs={12} lg={8}>
            <Card sx={premiumCardStyle}>
              <CardContent sx={{ p: "24px !important" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600" sx={{ color: "#0f172a" }}>
                      Revenue Flow Chart
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      Weekly updates metric indicators
                    </Typography>
                  </Box>
                  <IconButton size="small"><MoreVertIcon sx={{ color: "#94a3b8" }} /></IconButton>
                </Box>
                <Box height={280}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={earningsData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="cleanRevenueGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.06}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", color: "#fff", border: "none" }} />
                      <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#cleanRevenueGlow)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={premiumCardStyle}>
              <CardContent sx={{ p: "24px !important" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600" sx={{ color: "#0f172a" }}>
                      Patient Load Density
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      Peak hours workload monitor
                    </Typography>
                  </Box>
                  <IconButton size="small"><MoreVertIcon sx={{ color: "#94a3b8" }} /></IconButton>
                </Box>
                <Box height={280}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={patientFlowData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="4" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} />
                      <Bar dataKey="checkins" fill="#0284c7" radius={[6, 6, 0, 0]} barSize={16} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Live Active Appointments Row Queue Feed */}
        <Grid container spacing={3} mb={2}>
          <Grid item xs={12}>
            <Card sx={premiumCardStyle}>
              <CardContent sx={{ p: "28px !important" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600" sx={{ color: "#0f172a" }}>
                      Today's Active Patient Queue
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>
                      Upcoming clinical checkups scheduler slots stack list.
                    </Typography>
                  </Box>
                  <Chip label="Next 3 Hours" size="small" sx={{ background: "#f1f5f9", color: "#334155", fontWeight: "600", borderRadius: "6px" }} />
                </Box>

                {/* Feed Item 1 */}
                <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} py={2} sx={{ borderBottom: "1px solid #f1f5f9" }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ width: 42, height: 42, bgcolor: "#e0e7ff", color: "#4f46e5", fontWeight: "600", fontSize: "14px" }}>ZS</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="600" sx={{ color: "#0f172a" }}>Zainab Siddiqui</Typography>
                      <Typography variant="caption" sx={{ color: "#64748b" }}>Chronic Hypertension Checkup • <span style={{ color: "#4f46e5", fontWeight: "500" }}>ID: #9042</span></Typography>
                    </Box>
                  </Box>
                  
                  <Box display="flex" alignItems="center" gap={{ xs: 2, sm: 4 }} mt={{ xs: 1.5, sm: 0 }} pl={{ xs: 7, sm: 0 }}>
                    <Box sx={{ minWidth: "100px" }}>
                      <Typography variant="body2" fontWeight="600" sx={{ color: "#0f172a" }}>10:30 AM</Typography>
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>Duration (25m)</Typography>
                    </Box>
                    <Button variant="contained" disableElevation size="small" startIcon={<VideoCallIcon />} sx={{ backgroundColor: "#4f46e5", color: "#fff", borderRadius: "8px", textTransform: "none", fontWeight: "600", px: 2, "&:hover": { backgroundColor: "#4338ca" } }}>
                      Start Call
                    </Button>
                  </Box>
                </Box>

                {/* Feed Item 2 */}
                <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} py={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ width: 42, height: 42, bgcolor: "#e0f2fe", color: "#0284c7", fontWeight: "600", fontSize: "14px" }}>MA</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="600" sx={{ color: "#0f172a" }}>Muhammad Ahmed</Typography>
                      <Typography variant="caption" sx={{ color: "#64748b" }}>Post-Op Clinical Lab Evaluation • <span style={{ color: "#0284c7", fontWeight: "500" }}>ID: #1182</span></Typography>
                    </Box>
                  </Box>
                  
                  <Box display="flex" alignItems="center" gap={{ xs: 2, sm: 4 }} mt={{ xs: 1.5, sm: 0 }} pl={{ xs: 7, sm: 0 }}>
                    <Box sx={{ minWidth: "100px" }}>
                      <Typography variant="body2" fontWeight="600" sx={{ color: "#0f172a" }}>11:15 AM</Typography>
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>In-Person Check</Typography>
                    </Box>
                    <Button variant="outlined" size="small" sx={{ borderColor: "#cbd5e1", color: "#475569", borderRadius: "8px", textTransform: "none", fontWeight: "600", px: 2, "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" } }}>
                      Check Records
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Box>
    </DoctorLayout>
  );
};

export default DrDashboard;