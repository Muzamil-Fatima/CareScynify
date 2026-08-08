import React, { useContext } from "react";
import DoctorContext from "../../../context/doctor/DoctorContext";

import { Box, Typography, Button, Avatar, Stack, Chip } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
const DashboardHero = ({ data }) => {
  const { profile, activeWorkplaceId, setActiveWorkplaceId } =
    useContext(DoctorContext);

  const doctorName = profile?.user?.name || "Doctor";
  const doctorAvatar = profile?.user?.avatar?.url || "";

  const todayAppointments = data?.todayAppointments || 0;
  const workplaces = profile?.doctor?.workplaces || [];

  const allWorkplaces = [{ _id: "all", name: "All Workplaces" }, ...workplaces];

  const currentIndex = allWorkplaces.findIndex(
    (w) => w._id === activeWorkplaceId,
  );

  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const currentWorkplace = allWorkplaces[safeIndex]?.name || "All Workplaces";

  const handleNext = () => {
    const nextIndex = (safeIndex + 1) % allWorkplaces.length;
    setActiveWorkplaceId(allWorkplaces[nextIndex]._id);
  };

  const handlePrev = () => {
    const prevIndex =
      (safeIndex - 1 + allWorkplaces.length) % allWorkplaces.length;
    setActiveWorkplaceId(allWorkplaces[prevIndex]._id);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #faf5ff 100%)",
        border: "1px solid #e9d5ff",
        borderRadius: "28px",
        p: { xs: 3, md: 4 },
        position: "relative",
        overflow: "hidden",
        boxShadow: "0px 10px 40px rgba(124,58,237,0.08)",
      }}
    >
      {/* Decorative Background Shapes */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(139,92,246,0.12)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(168,85,247,0.08)",
        }}
      />

      {/* Main Content */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={4}
        sx={{ position: "relative", zIndex: 2 }}
      >
        {/* Left Side */}
        <Stack spacing={2.5} flex={1}>
          <Stack direction="row" spacing={2.5} alignItems="center">
            <Avatar
              src={doctorAvatar}
              sx={{
                width: 72,
                height: 72,
                bgcolor: "#7c3aed",
                color: "#fff",
                border: "4px solid #fff",
                boxShadow: "0 8px 20px rgba(124,58,237,0.25)",
                fontWeight: 700,
                fontSize: 28,
              }}
            >
              {doctorName.charAt(0)}
            </Avatar>

            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: "#1e1b4b",
                  fontSize: { xs: "28px", md: "36px" },
                }}
              >
                {getGreeting()} 👋
              </Typography>

              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  color: "#4c1d95",
                  mt: 0.5,
                  fontSize: { xs: "20px", md: "24px" },
                }}
              >
                {doctorName}
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="body1"
            sx={{
              color: "#6b7280",
              maxWidth: "500px",
              lineHeight: 1.7,
            }}
          >
            Welcome back! Here's an overview of your clinic, appointments,
            patients and overall performance.
          </Typography>

          {allWorkplaces.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#fff",
                border: "1px solid #e9d5ff",
                borderRadius: "14px",
                px: 1,
                py: 0.7,
                width: "fit-content",
                boxShadow: "0 4px 12px rgba(124,58,237,0.06)",
              }}
            >
              <Button
                onClick={handlePrev}
                sx={{
                  minWidth: 36,
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  color: "#7c3aed",
                  "&:hover": {
                    bgcolor: "#f3e8ff",
                  },
                }}
              >
                <KeyboardArrowLeftRoundedIcon />
              </Button>

              <Typography
                sx={{
                  minWidth: 160,
                  textAlign: "center",
                  fontWeight: 700,
                  color: "#7c3aed",
                  fontSize: "0.9rem",
                }}
              >
                {currentWorkplace}
              </Typography>

              <Button
                onClick={handleNext}
                sx={{
                  minWidth: 36,
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  color: "#7c3aed",
                  "&:hover": {
                    bgcolor: "#f3e8ff",
                  },
                }}
              >
                <KeyboardArrowRightRoundedIcon />
              </Button>
            </Box>
          )}
        </Stack>

        {/* Right Side */}
        <Stack
          spacing={2}
          alignItems={{ xs: "stretch", lg: "flex-end" }}
          sx={{ alignSelf: "flex-start" }}
        >
          <Chip
            icon={<EventAvailableRoundedIcon />}
            label={`You have ${todayAppointments} appointments today`}
            sx={{
              bgcolor: "#fff",
              color: "#7c3aed",
              border: "1px solid #e9d5ff",
              fontWeight: 700,
              py: 2.5,

              "& .MuiChip-icon": {
                color: "#7c3aed",
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{
              bgcolor: "#7c3aed",
              color: "#fff",
              borderRadius: "14px",
              px: 3,
              py: 1.3,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#6d28d9",
                boxShadow: "0 8px 20px rgba(124,58,237,0.3)",
              },
            }}
          >
            New Appointment
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DashboardHero;
