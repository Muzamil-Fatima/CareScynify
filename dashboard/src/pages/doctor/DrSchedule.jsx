import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

const DrSchedule = () => {
  const [date, setDate] = useState("");

  const appointments = [
    {
      id: 1,
      patient: "Ali Khan",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Sara Ahmed",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Ahmed Raza",
      time: "02:00 PM",
      status: "Completed",
    },
  ];

  return (
    <Box p={3}>
      {/* Page Header */}

      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          My Schedule
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />}>
          Add Schedule Slot
        </Button>
      </Grid>

      {/* Date Filter */}

      <Box mt={3} mb={3}>
        <TextField
          type="date"
          label="Select Date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Box>

      {/* Appointment Cards */}

      <Grid container spacing={3}>
        {appointments.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>

                <Typography variant="h6">
                  {item.patient}
                </Typography>

                <Typography color="text.secondary">
                  Time: {item.time}
                </Typography>

                <Box mt={2}>
                  <Chip
                    label={item.status}
                    color={
                      item.status === "Confirmed"
                        ? "success"
                        : item.status === "Pending"
                        ? "warning"
                        : "primary"
                    }
                  />
                </Box>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DrSchedule;