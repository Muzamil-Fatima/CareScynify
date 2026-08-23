// ************
import Doctor from "../../models/doctor/doctorModel.js";
import Appointment from "../../models/appointmentModel.js";
import Review from "../../models/reviewModel.js";

// Helper: Date Range

const getDateRange = (period) => {
  const now = new Date();

  if (period === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);

    const end = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    return { start, end };
  }

  // Current Week: Monday → Sunday
  const start = new Date(now);
  const day = start.getDay();

  const diff = day === 0 ? 6 : day - 1;

  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// Helper: Profile Completion

const calculateProfileCompletion = (doctor) => {
  const fields = [
    Boolean(doctor.specialization),
    Boolean(doctor.treatableConditions?.length),
    Boolean(doctor.experience),
    Boolean(doctor.qualifications),
    Boolean(doctor.about),
    Boolean(doctor.licenseNo),
    Boolean(doctor.workplaces?.length),
    Boolean(doctor.education?.length),
    Boolean(doctor.experienceDetails?.length),
    Boolean(doctor.identityVerification?.cnicFront),
    Boolean(doctor.identityVerification?.cnicBack),
    Boolean(doctor.credentials?.length),
  ];

  const completed = fields.filter(Boolean).length;

  return Math.round((completed / fields.length) * 100);
};

// GET DOCTOR DASHBOARD

// GET DOCTOR DASHBOARD
export const getDoctorDashboard = async (req, res) => {
  try {
    // =========================================================
    // FIND DOCTOR
    // =========================================================

    const doctor = await Doctor.findOne({
      userId: req.user.id,
    }).populate("userId", "name avatar");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    // =========================================================
    // QUERY PARAMETERS
    // =========================================================

    const workplaceId = req.query.workplaceId || "all";
    const period = req.query.period === "month" ? "month" : "week";

    // =========================================================
    // APPOINTMENT FILTER
    // =========================================================

    const appointmentFilter = {
      doctorId: doctor._id,
    };

    if (workplaceId !== "all") {
      appointmentFilter.workplaceId = workplaceId;
    }

    // =========================================================
    // GET APPOINTMENTS
    // =========================================================

    const appointments = await Appointment.find(appointmentFilter).select(
      "patientId workplaceId appointmentDate appointmentTime status",
    );

    // =========================================================
    // TODAY
    // =========================================================

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todayAppointments = appointments.filter((appointment) => {
      if (appointment.status !== "confirmed") {
        return false;
      }

      const date = new Date(appointment.appointmentDate);

      return date >= startOfToday && date <= endOfToday;
    }).length;

    // =========================================================
    // COMPLETED APPOINTMENTS
    // =========================================================

    const completedAppointments = appointments.filter(
      (appointment) => appointment.status === "completed",
    );

    // =========================================================
    // PENDING APPOINTMENTS
    // =========================================================

    const pendingAppointments = appointments.filter((appointment) => {
      if (
        appointment.status !== "pending" &&
        appointment.status !== "confirmed"
      ) {
        return false;
      }

      const appointmentDate = new Date(appointment.appointmentDate);

      return appointmentDate > endOfToday;
    });

    // =========================================================
    // TOTAL UNIQUE PATIENTS
    // =========================================================

    const uniquePatients = new Set(
      appointments
        .map((appointment) => appointment.patientId?.toString())
        .filter(Boolean),
    );

    const totalPatients = uniquePatients.size;

    // =========================================================
    // WORKPLACES
    // =========================================================

    const workplaces = doctor.workplaces || [];

    const totalWorkplaces = workplaces.length;

    const onlineWorkplaces = workplaces.filter((workplace) => {
      const consultationType = workplace.settings?.consultationType;

      return (
        consultationType === "online" ||
        consultationType === "online_physical"
      );
    }).length;

    // =========================================================
    // APPOINTMENT FEE
    // =========================================================

    const getAppointmentFee = (appointment) => {
      const workplace = workplaces.find(
        (item) =>
          item._id?.toString() === appointment.workplaceId?.toString(),
      );

      return Number(workplace?.settings?.appointmentFee || 0);
    };

    // =========================================================
    // CURRENT MONTH REVENUE
    // =========================================================

    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0,
      0,
    );

    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    const monthlyRevenueAppointments = completedAppointments.filter(
      (appointment) => {
        const date = new Date(appointment.appointmentDate);

        return date >= startOfMonth && date <= endOfMonth;
      },
    );

    const monthlyRevenue = monthlyRevenueAppointments.reduce(
      (total, appointment) => {
        return total + getAppointmentFee(appointment);
      },
      0,
    );

    // =========================================================
    // REVIEWS
    // =========================================================

    const reviews = await Review.find({
      doctor: doctor._id,
    }).select("rating");

    const averageRating =
      reviews.length > 0
        ? Number(
            (
              reviews.reduce(
                (sum, review) => sum + Number(review.rating || 0),
                0,
              ) / reviews.length
            ).toFixed(1),
          )
        : 0;

    // =========================================================
    // DATE RANGE FOR CHARTS
    // =========================================================

    const getDateRange = (selectedPeriod) => {
      const currentDate = new Date();

      // -------------------------
      // MONTH
      // -------------------------

      if (selectedPeriod === "month") {
        const start = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
          0,
          0,
          0,
          0,
        );

        const end = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
          23,
          59,
          59,
          999,
        );

        return {
          start,
          end,
        };
      }

      // -------------------------
      // WEEK
      // Monday → Sunday
      // -------------------------

      const start = new Date(currentDate);

      const day = start.getDay();

      const diff = day === 0 ? 6 : day - 1;

      start.setDate(start.getDate() - diff);

      start.setHours(0, 0, 0, 0);

      const end = new Date(start);

      end.setDate(start.getDate() + 6);

      end.setHours(23, 59, 59, 999);

      return {
        start,
        end,
      };
    };

    const { start, end } = getDateRange(period);

    // =========================================================
    // CHART APPOINTMENTS
    // =========================================================

    const chartAppointments = appointments.filter((appointment) => {
      if (
        appointment.status !== "confirmed" &&
        appointment.status !== "completed"
      ) {
        return false;
      }

      const date = new Date(appointment.appointmentDate);

      return date >= start && date <= end;
    });

    // =========================================================
    // PATIENT FLOW TREND
    // =========================================================

    let patientTrend = [];

    // ---------------------------------------------------------
    // WEEK VIEW
    // ---------------------------------------------------------

    if (period === "week") {
      patientTrend = [
        {
          name: "Mon",
          patients: 0,
        },
        {
          name: "Tue",
          patients: 0,
        },
        {
          name: "Wed",
          patients: 0,
        },
        {
          name: "Thu",
          patients: 0,
        },
        {
          name: "Fri",
          patients: 0,
        },
        {
          name: "Sat",
          patients: 0,
        },
        {
          name: "Sun",
          patients: 0,
        },
      ];

      chartAppointments.forEach((appointment) => {
        const date = new Date(appointment.appointmentDate);

        // JS:
        // Sunday = 0
        // Monday = 1
        // ...
        // Saturday = 6
        //
        // Convert to:
        // Monday = 0
        // ...
        // Sunday = 6

        const dayIndex = (date.getDay() + 6) % 7;

        if (patientTrend[dayIndex]) {
          patientTrend[dayIndex].patients += 1;
        }
      });
    }

    // ---------------------------------------------------------
    // MONTH VIEW
    // ---------------------------------------------------------

    if (period === "month") {
      const daysInMonth = end.getDate();

      const weekCount = Math.ceil(daysInMonth / 7);

      patientTrend = Array.from(
        {
          length: weekCount,
        },
        (_, index) => ({
          name: `Week ${index + 1}`,
          patients: 0,
        }),
      );

      chartAppointments.forEach((appointment) => {
        const date = new Date(appointment.appointmentDate);

        const dayOfMonth = date.getDate();

        const weekIndex = Math.floor((dayOfMonth - 1) / 7);

        if (patientTrend[weekIndex]) {
          patientTrend[weekIndex].patients += 1;
        }
      });
    }

    const totalTrendPatients = patientTrend.reduce(
      (total, item) => total + item.patients,
      0,
    );

    const peakPatients =
      patientTrend.length > 0
        ? Math.max(...patientTrend.map((item) => item.patients))
        : 0;

    // =========================================================
    // REVENUE ANALYTICS
    // =========================================================

    let revenueData = [];

    // ---------------------------------------------------------
    // WEEK VIEW
    // ---------------------------------------------------------

    if (period === "week") {
      revenueData = [
        {
          name: "Mon",
          revenue: 0,
        },
        {
          name: "Tue",
          revenue: 0,
        },
        {
          name: "Wed",
          revenue: 0,
        },
        {
          name: "Thu",
          revenue: 0,
        },
        {
          name: "Fri",
          revenue: 0,
        },
        {
          name: "Sat",
          revenue: 0,
        },
        {
          name: "Sun",
          revenue: 0,
        },
      ];

      const revenueAppointments = appointments.filter((appointment) => {
        if (appointment.status !== "completed") {
          return false;
        }

        const date = new Date(appointment.appointmentDate);

        return date >= start && date <= end;
      });

      revenueAppointments.forEach((appointment) => {
        const date = new Date(appointment.appointmentDate);

        const dayIndex = (date.getDay() + 6) % 7;

        if (revenueData[dayIndex]) {
          revenueData[dayIndex].revenue += getAppointmentFee(appointment);
        }
      });
    }

    // ---------------------------------------------------------
    // MONTH VIEW
    // ---------------------------------------------------------

    if (period === "month") {
      const daysInMonth = end.getDate();

      const weekCount = Math.ceil(daysInMonth / 7);

      revenueData = Array.from(
        {
          length: weekCount,
        },
        (_, index) => ({
          name: `Week ${index + 1}`,
          revenue: 0,
        }),
      );

      const revenueAppointments = appointments.filter((appointment) => {
        if (appointment.status !== "completed") {
          return false;
        }

        const date = new Date(appointment.appointmentDate);

        return date >= start && date <= end;
      });

      revenueAppointments.forEach((appointment) => {
        const date = new Date(appointment.appointmentDate);

        const dayOfMonth = date.getDate();

        const weekIndex = Math.floor((dayOfMonth - 1) / 7);

        if (revenueData[weekIndex]) {
          revenueData[weekIndex].revenue += getAppointmentFee(appointment);
        }
      });
    }

    const totalRevenue = revenueData.reduce(
      (total, item) => total + Number(item.revenue || 0),
      0,
    );

    // Completed appointments for selected period
    const revenueAppointments = appointments.filter((appointment) => {
      if (appointment.status !== "completed") {
        return false;
      }

      const date = new Date(appointment.appointmentDate);

      return date >= start && date <= end;
    });

    // =========================================================
    // PROFILE STATUS
    // =========================================================

    const calculateProfileCompletion = (doctor) => {
      const fields = [
        Boolean(doctor.specialization),
        Boolean(doctor.treatableConditions?.length),
        Boolean(doctor.experience),
        Boolean(doctor.qualifications),
        Boolean(doctor.about),
        Boolean(doctor.licenseNo),
        Boolean(doctor.workplaces?.length),
        Boolean(doctor.education?.length),
        Boolean(doctor.experienceDetails?.length),
        Boolean(doctor.identityVerification?.cnicFront),
        Boolean(doctor.identityVerification?.cnicBack),
        Boolean(doctor.credentials?.length),
      ];

      const completed = fields.filter(Boolean).length;

      return Math.round((completed / fields.length) * 100);
    };

    const profileCompletion = calculateProfileCompletion(doctor);

    const identityVerification =
      doctor.identityVerification?.status || "Pending";

    const verifiedCredentials = doctor.credentials?.some(
      (credential) => credential.status === "Verified",
    );

    const medicalCredentials = verifiedCredentials ? "Approved" : "Pending";

    const profileBadge =
      doctor.status === "active" ? "Active" : "Inactive";

    // =========================================================
    // SELECTED WORKPLACE
    // =========================================================

    const selectedWorkplace =
      workplaceId === "all"
        ? null
        : workplaces.find(
            (workplace) =>
              workplace._id?.toString() === workplaceId.toString(),
          );

    // =========================================================
    // RESPONSE
    // =========================================================

    return res.status(200).json({
      success: true,

      data: {
        // =====================================================
        // DOCTOR
        // =====================================================

        doctor: {
          name: doctor.userId?.name || "Doctor",
          avatar: doctor.userId?.avatar || "",
        },

        // =====================================================
        // HERO
        // =====================================================

        hero: {
          doctorName: doctor.userId?.name || "Doctor",
          doctorAvatar: doctor.userId?.avatar || "",
          todayAppointments,
          workplaceId,
          workplaceName:
            workplaceId === "all"
              ? "All Workplaces"
              : selectedWorkplace?.name || "Workplace",
        },

        // =====================================================
        // STATS
        // =====================================================

        stats: {
          todayAppointments,
          totalPatients,
          monthlyRevenue,
          reviews: reviews.length,
          averageRating,
          totalWorkplaces,
          onlineWorkplaces,
          completedAppointments: completedAppointments.length,
          pendingAppointments: pendingAppointments.length,
        },

        // =====================================================
        // PATIENT FLOW
        // =====================================================

        patientTrend: {
          period,
          totalPatients: totalTrendPatients,
          peakPatients,
          data: patientTrend,
        },

        // =====================================================
        // REVENUE ANALYTICS
        // =====================================================

        revenue: {
          period,
          total: totalRevenue,
          completedAppointments: revenueAppointments.length,
          data: revenueData,
        },

        // =====================================================
        // PROFILE
        // =====================================================

        profile: {
          profileCompletion,

          statusItems: [
            {
              label: "Identity Verification",
              status: identityVerification,
              icon: "verified",
              color: "#16a34a",
              bg: "#ecfdf5",
            },

            {
              label: "Account Security",
              status: "Strong",
              icon: "security",
              color: "#4f46e5",
              bg: "#eef2ff",
            },

            {
              label: "Medical Credentials",
              status: medicalCredentials,
              icon: "credentials",
              color: "#0ea5e9",
              bg: "#e0f2fe",
            },

            {
              label: "Profile Badge",
              status: profileBadge,
              icon: "badge",
              color: "#f59e0b",
              bg: "#fffbeb",
            },
          ],
        },
      },
    });
  } catch (error) {
    console.error("GET DOCTOR DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load doctor dashboard",
      error: error.message,
    });
  }
};
