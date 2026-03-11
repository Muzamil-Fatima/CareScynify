import DoctorLayout from "../doctor/Layout";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const StatCard = ({ title, value, icon }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>

            <Typography variant="h5" fontWeight="bold">
              {value}
            </Typography>
          </Box>

          <Box color="primary.main">{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const DrDashboard = () => {
  return (
    <DoctorLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Today's Appointments"
            value="8"
            icon={<EventIcon fontSize="large" />}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Upcoming Appointments"
            value="24"
            icon={<CalendarMonthIcon fontSize="large" />}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Patients"
            value="120"
            icon={<PeopleIcon fontSize="large" />}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard
            title="Monthly Earnings"
            value="Rs 85,000"
            icon={<MonetizationOnIcon fontSize="large" />}
          />
        </Grid>
      </Grid>

      {/* Schedule Section */}

      <Box
        mt={5}
        p={4}
        sx={{
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Today's Schedule
        </Typography>

        <Typography color="text.secondary">
          No appointments yet
        </Typography>

        <Button variant="contained" sx={{ mt: 2 }}>
          Add Appointment
        </Button>
      </Box>
    </DoctorLayout>
  );
};

export default DrDashboard;