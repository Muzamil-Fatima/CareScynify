import React, { useState, useEffect } from "react";
import DoctorLayout from "../doctor/Layout";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  Avatar,
  IconButton
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const DrSchedule = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const appointments = [
    {
      id: 1,
      patient: "Ali Khan",
      email: "ali.khan@gmail.com",
      time: "10:00 AM",
      type: "Online Consultation",
      status: "Confirmed",
      initials: "AK",
      bgColor: "#eef2ff",
      color: "#4f46e5"
    },
    {
      id: 2,
      patient: "Sara Ahmed",
      email: "sara.a@outlook.com",
      time: "11:30 AM",
      type: "In-Person Checkup",
      status: "Pending",
      initials: "SA",
      bgColor: "#fdf4ff",
      color: "#d946ef"
    },
    {
      id: 3,
      patient: "Ahmed Raza",
      email: "raza.ahmed@live.com",
      time: "02:00 PM",
      type: "Follow-up Session",
      status: "Completed",
      initials: "AR",
      bgColor: "#f0fdf4",
      color: "#16a34a"
    },
  ];

  // Prevent parent scroll leaking
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  const getStatusChip = (status) => {
    const styles = {
      Confirmed: { bg: "#eef2ff", color: "#4f46e5" },
      Pending: { bg: "#fef3c7", color: "#d97706" },
      Completed: { bg: "#f0fdf4", color: "#16a34a" }
    };

    const currentStyle = styles[status] || styles.Pending;

    return (
      <Chip
        label={status}
        size="small"
        sx={{
          backgroundColor: currentStyle.bg,
          color: currentStyle.color,
          fontWeight: "600",
          borderRadius: "8px",
          fontSize: "12px"
        }}
      />
    );
  };

  return (
    <DoctorLayout>
      {/* Structural viewport layout wrapper to prevent side/bottom window bars */}
      <Box sx={{
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "calc(100vh - 40px)",
        width: "100%",
        pr: 0.5,
        "&::-webkit-scrollbar": { display: "none" },
        msOverflowStyle: "none",
        scrollbarWidth: "none"
      }}>

        {/* Page Top Bar Header */}
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={2} mb={4} mt={1}>
          <Box>
            <Typography variant="h4" fontWeight="700" sx={{ color: "#0f172a", letterSpacing: "-0.5px" }}>
              My Schedule
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", mt: 0.2 }}>
              Manage timeline shifts, consultation time configurations, and patient list slots.
            </Typography>
          </Box>
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#7c3aed", // Brand Premium Purple
              color: "#ffffff",
              borderRadius: "10px", px: 2.5, py: 1.2, textTransform: "none", fontWeight: "600", fontSize: "14px",
              "&:hover": { backgroundColor: "#6d28d9" }
            }}
          >
            Add Schedule Slot
          </Button>
        </Box>

        {/* Filter Toolbar Module Card */}
        <Card sx={{
          borderRadius: "16px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0px 1px 3px rgba(15, 23, 42, 0.03)",
          mb: 4
        }}>
          <CardContent sx={{ p: "20px !important", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <CalendarMonthOutlinedIcon sx={{ color: "#7c3aed" }} />
              <Typography variant="subtitle2" fontWeight="600" sx={{ color: "#334155" }}>
                Select Active Date Frame
              </Typography>
            </Box>
            <TextField
              type="date"
              size="small"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{
                width: "200px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  color: "#334155",
                  fontWeight: "500",
                  "& fieldset": { borderColor: "#cbd5e1" },
                  "&:hover fieldset": { borderColor: "#7c3aed" },
                  "&.Mui-focused fieldset": { borderColor: "#7c3aed" }
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Timeline Dynamic Feed Matrix Container */}
        <Typography variant="subtitle2" fontWeight="700" sx={{ color: "#64748b", textTransform: "uppercase", tracking: "0.5px", mb: 2, pl: 0.5 }}>
          Appointments Queue System
        </Typography>

        <Card sx={{
          borderRadius: "16px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0px 1px 3px rgba(15, 23, 42, 0.03), 0px 10px 20px -5px rgba(15, 23, 42, 0.05)",
          overflow: "hidden",
          mb: 3
        }}>
          <CardContent sx={{ p: "0px !important" }}>
            
            {appointments.map((item, index) => (
              <Box 
                key={item.id}
                display="flex" 
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="space-between" 
                alignItems={{ md: "center" }} 
                p={3} 
                sx={{ 
                  borderBottom: index !== appointments.length - 1 ? "1px solid #f1f5f9" : "none",
                  backgroundColor: "white",
                  transition: "background-color 0.2s ease",
                  "&:hover": { backgroundColor: "#fafafa" }
                }}
              >
                {/* Section A: Patient Master Identification Info block */}
                <Box display="flex" alignItems="center" gap={2.5} flex={1}>
                  <Avatar sx={{ 
                    width: 44, 
                    height: 44, 
                    bgcolor: item.bgColor, 
                    color: item.color, 
                    fontWeight: "700", 
                    fontSize: "14px",
                    border: `1px solid rgba(0,0,0,0.02)`
                  }}>
                    {item.initials}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="700" sx={{ color: "#0f172a" }}>
                      {item.patient}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", display: "block", mt: 0.2 }}>
                      {item.email}
                    </Typography>
                  </Box>
                </Box>

                {/* Section B: Time & Appointment Type Parameters */}
                <Box display="flex" alignItems="center" gap={4} flex={2} mt={{ xs: 2, md: 0 }} justifyContent={{ xs: "space-between", md: "flex-start" }}>
                  <Box display="flex" alignItems="center" gap={1} sx={{ minWidth: "120px" }}>
                    <AccessTimeOutlinedIcon sx={{ color: "#94a3b8", fontSize: "18px" }} />
                    <Box>
                      <Typography variant="body2" fontWeight="600" sx={{ color: "#0f172a" }}>
                        {item.time}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                        Slot Interval
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ minWidth: "160px" }}>
                    <Typography variant="body2" fontWeight="500" sx={{ color: "#334155" }}>
                      {item.type}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                      Modality
                    </Typography>
                  </Box>
                  
                  {/* Status Badging Row Placement */}
                  <Box sx={{ minWidth: "100px", textAlign: { xs: "right", md: "left" } }}>
                    {getStatusChip(item.status)}
                  </Box>
                </Box>

                {/* Section C: Adaptive Action Control Group Buttons */}
                <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1.5} mt={{ xs: 2.5, md: 0 }} pl={{ xs: 0, md: 2 }}>
                  {item.type === "Online Consultation" ? (
                    <Button 
                      variant="contained" 
                      disableElevation
                      size="small"
                      startIcon={<VideoCallOutlinedIcon />} 
                      sx={{ 
                        backgroundColor: "#7c3aed", 
                        color: "#fff", 
                        borderRadius: "8px", 
                        textTransform: "none", 
                        fontWeight: "600", 
                        px: 2, py: 0.8,
                        fontSize: "13px",
                        "&:hover": { backgroundColor: "#6d28d9" } 
                      }}
                    >
                      Join Room
                    </Button>
                  ) : (
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<CheckCircleOutlineIcon sx={{ fontSize: "16px !important" }} />} 
                      sx={{ 
                        borderColor: "#cbd5e1", 
                        color: "#475569", 
                        borderRadius: "8px", 
                        textTransform: "none", 
                        fontWeight: "600", 
                        px: 2, py: 0.8,
                        fontSize: "13px",
                        "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" } 
                      }}
                    >
                      Check In
                    </Button>
                  )}
                  <IconButton size="small" sx={{ color: "#94a3b8" }}>
                    <MoreVertOutlinedIcon />
                  </IconButton>
                </Box>

              </Box>
            ))}

          </CardContent>
        </Card>

      </Box>
    </DoctorLayout>
  );
};

export default DrSchedule;