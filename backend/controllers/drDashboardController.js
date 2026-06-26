import Appointment from "../models/Appointment.model.js";
import Patient from "../models/Patient.model.js";
import Revenue from "../models/Revenue.model.js"; // Ya Billing model
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  format,
  subDays,
} from "date-fns";

/**
 * @desc    Get Doctor Dashboard Insights & Analytics
 * @route   GET /api/v1/doctor/dashboard
 * @access  Private (Doctor Only)
 */
export const getDoctorDashboardData = async (req, res) => {
  try {
    const doctorId = req.user._id; // Authenticated doctor ID middleware se
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

    // ----------------------------------------------------
    // 1. STAT CARDS CALCULATIONS
    // ----------------------------------------------------

    // Today's Appointments Count
    const todaysAppointmentsCount = await Appointment.countDocuments({
      doctor: doctorId,
      appointmentDate: { $gte: todayStart, $lte: todayEnd },
    });

    // Upcoming Checkups (Today ke baad ke scheduled appointments)
    const upcomingCheckupsCount = await Appointment.countDocuments({
      doctor: doctorId,
      appointmentDate: { $gt: todayEnd },
      status: "Scheduled",
    });

    // Total Unique Patients managed by this doctor
    const totalPatientsCount = await Patient.countDocuments({
      assignedDoctor: doctorId,
    });

    // Monthly Revenue Accumulation (Current Month)
    const currentMonthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    const revenueAggregate = await Revenue.aggregate([
      {
        $match: {
          doctor: doctorId,
          paymentDate: { $gte: currentMonthStart },
          status: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const monthlyRevenue = revenueAggregate[0]?.total || 0;

    // ----------------------------------------------------
    // 2. REVENUE FLOW CHART (Weekly Data: Mon - Sat)
    // ----------------------------------------------------
    const weeklyRevenueData = await Revenue.aggregate([
      {
        $match: {
          doctor: doctorId,
          paymentDate: { $gte: weekStart, $lte: weekEnd },
          status: "Paid",
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$paymentDate" }, // 1: Sunday, 2: Monday...
          amount: { $sum: "$amount" },
        },
      },
    ]);

    const daysMap = {
      2: "Mon",
      3: "Tue",
      4: "Wed",
      5: "Thu",
      6: "Fri",
      7: "Sat",
    };
    const earningsData = Object.keys(daysMap).map((dayNum) => {
      const found = weeklyRevenueData.find(
        (item) => item._id === parseInt(dayNum),
      );
      return {
        name: daysMap[dayNum],
        amount: found ? found.amount : 0,
      };
    });

    // ----------------------------------------------------
    // 3. PATIENT LOAD DENSITY (Time Slots Peak Hours)
    // ----------------------------------------------------
    const patientLoadAggregate = await Appointment.aggregate([
      {
        $match: {
          doctor: doctorId,
          appointmentDate: { $gte: todayStart, $lte: todayEnd },
        },
      },
      {
        $group: {
          _id: { $hour: "$appointmentDate" }, // Extracts hour (e.g., 9, 11, 13)
          checkins: { $sum: 1 },
        },
      },
    ]);

    const targetHours = [
      { hour: 9, label: "9 AM" },
      { hour: 11, label: "11 AM" },
      { hour: 13, label: "1 PM" },
      { hour: 15, label: "3 PM" },
      { hour: 17, label: "5 PM" },
    ];

    const patientFlowData = targetHours.map((slot) => {
      const found = patientLoadAggregate.find((item) => item._id === slot.hour);
      return {
        name: slot.label,
        checkins: found ? found.checkins : 0,
      };
    });

    // ----------------------------------------------------
    // 4. TODAY'S ACTIVE PATIENT QUEUE (Next 3 Hours Profile)
    // ----------------------------------------------------
    const threeHoursLater = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);

    const activeQueueRaw = await Appointment.find({
      doctor: doctorId,
      appointmentDate: { $gte: new Date(), $lte: threeHoursLater },
      status: "Scheduled",
    })
      .populate("patient", "firstName lastName customId description") // Populating patient profile
      .sort({ appointmentDate: 1 });

    const activeQueue = activeQueueRaw.map((app) => {
      const initials =
        `${app.patient?.firstName?.[0] || ""}${app.patient?.lastName?.[0] || ""}`.toUpperCase();
      return {
        id: app.patient?.customId || app._id,
        name: `${app.patient?.firstName} ${app.patient?.lastName}`,
        initials: initials || "PT",
        reason: app.reasonForVisit || "Routine Checkup",
        time: format(new Date(app.appointmentDate), "hh:mm a"),
        duration: `${app.durationInMinutes || 20}m`,
        type: app.appointmentType, // "Virtual" or "In-Person"
      };
    });

    // ----------------------------------------------------
    // RESPONSE PAYLOAD
    // ----------------------------------------------------
    // ----------------------------------------------------
    // RESPONSE PAYLOAD
    // ----------------------------------------------------
    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      stats: {
        todaysAppointments: String(todaysAppointmentsCount),
        upcomingCheckups: String(upcomingCheckupsCount),
        totalPatients: totalPatientsCount.toLocaleString("en-IN"),
        monthlyRevenue: `Rs ${(monthlyRevenue / 1000).toFixed(0)}K`,
      },
      earningsData,
      patientFlowData,
      activeQueue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate dashboard analytics",
      error: error.message,
    });
  }
};
