import mongoose from "mongoose";

import User from "../../models/user.js";
import Doctor from "../../models/doctor/doctorModel.js";
import Pharmacy from "../../models/pharmacy/pharmacyModel.js";
import Laboratory from "../../models/laboratory/labModel.js";
import Patient from "../../models/patientModel.js";

/**
 * Safely get a registered mongoose model.
 * This prevents the dashboard from crashing if
 * Appointment or Prescription model has not been imported yet.
 */
const getRegisteredModel = (modelName) => {
  return mongoose.models[modelName] || null;
};

/**
 * Get start of current month
 */
const getCurrentMonthStart = () => {
  const date = new Date();

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
  );
};

/**
 * Get start of previous month
 */
const getPreviousMonthStart = () => {
  const date = new Date();

  return new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    1,
  );
};

/**
 * Get percentage change between previous and current value
 */
const calculatePercentageChange = (current, previous) => {
  if (previous === 0) {
    if (current === 0) return 0;
    return 100;
  }

  return Number(
    (((current - previous) / previous) * 100).toFixed(1),
  );
};

/**
 * Format percentage
 */
const formatPercentage = (value) => {
  return `${value >= 0 ? "+" : ""}${value}%`;
};

/**
 * Get month range
 */
const getMonthRange = (monthsAgo = 0) => {
  const now = new Date();

  const start = new Date(
    now.getFullYear(),
    now.getMonth() - monthsAgo,
    1,
  );

  const end = new Date(
    now.getFullYear(),
    now.getMonth() - monthsAgo + 1,
    1,
  );

  return { start, end };
};

/**
 * Get month name
 */
const getMonthName = (date) => {
  return date.toLocaleString("en-US", {
    month: "short",
  });
};

/**
 * Count documents created in a specific period
 */
const countCreatedInPeriod = async (
  Model,
  start,
  end,
  extraFilter = {},
) => {
  if (!Model) return 0;

  return Model.countDocuments({
    ...extraFilter,
    createdAt: {
      $gte: start,
      $lt: end,
    },
  });
};

/**
 
 * ADMIN DASHBOARD
 
 */
export const getAdminDashboard = async (req, res) => {
  try {
    const Appointment = getRegisteredModel("Appointment");
    const Prescription = getRegisteredModel("Prescription");

    /**
     
     * 1. TOTAL COUNTS
     
     */

    const [
      totalUsers,
      totalDoctors,
      totalPatients,
      totalPharmacies,
      totalLaboratories,
      totalAppointments,
      totalPrescriptions,
    ] = await Promise.all([
      User.countDocuments({
        isDeleted: false,
      }),

      Doctor.countDocuments(),

      Patient.countDocuments(),

      Pharmacy.countDocuments(),

      Laboratory.countDocuments(),

      Appointment
        ? Appointment.countDocuments()
        : Promise.resolve(0),

      Prescription
        ? Prescription.countDocuments()
        : Promise.resolve(0),
    ]);

    /**
     
     * 2. PENDING VERIFICATIONS
     
     *
     * Doctor:
     * identityVerification.status = "Pending"
     *
     * Pharmacy:
     * verificationStatus = "pending"
     *
     * Laboratory:
     * verificationStatus = "pending"
     */

    const [
      pendingDoctors,
      pendingPharmacies,
      pendingLaboratories,
    ] = await Promise.all([
      Doctor.countDocuments({
        "identityVerification.status": "Pending",
      }),

      Pharmacy.countDocuments({
        verificationStatus: "pending",
      }),

      Laboratory.countDocuments({
        verificationStatus: "pending",
      }),
    ]);

    const totalPendingVerifications =
      pendingDoctors +
      pendingPharmacies +
      pendingLaboratories;

    /**
     
     * 3. CURRENT / PREVIOUS MONTH
     
     */

    const currentMonthStart = getCurrentMonthStart();
    const previousMonthStart = getPreviousMonthStart();
    const now = new Date();

    const [
      currentUsers,
      previousUsers,

      currentDoctors,
      previousDoctors,

      currentAppointments,
      previousAppointments,

      currentPendingDoctors,
      previousPendingDoctors,

      currentPendingPharmacies,
      previousPendingPharmacies,

      currentPendingLaboratories,
      previousPendingLaboratories,
    ] = await Promise.all([
      countCreatedInPeriod(
        User,
        currentMonthStart,
        now,
        { isDeleted: false },
      ),

      countCreatedInPeriod(
        User,
        previousMonthStart,
        currentMonthStart,
        { isDeleted: false },
      ),

      countCreatedInPeriod(
        Doctor,
        currentMonthStart,
        now,
      ),

      countCreatedInPeriod(
        Doctor,
        previousMonthStart,
        currentMonthStart,
      ),

      countCreatedInPeriod(
        Appointment,
        currentMonthStart,
        now,
      ),

      countCreatedInPeriod(
        Appointment,
        previousMonthStart,
        currentMonthStart,
      ),

      countCreatedInPeriod(
        Doctor,
        currentMonthStart,
        now,
        {
          "identityVerification.status": "Pending",
        },
      ),

      countCreatedInPeriod(
        Doctor,
        previousMonthStart,
        currentMonthStart,
        {
          "identityVerification.status": "Pending",
        },
      ),

      countCreatedInPeriod(
        Pharmacy,
        currentMonthStart,
        now,
        {
          verificationStatus: "pending",
        },
      ),

      countCreatedInPeriod(
        Pharmacy,
        previousMonthStart,
        currentMonthStart,
        {
          verificationStatus: "pending",
        },
      ),

      countCreatedInPeriod(
        Laboratory,
        currentMonthStart,
        now,
        {
          verificationStatus: "pending",
        },
      ),

      countCreatedInPeriod(
        Laboratory,
        previousMonthStart,
        currentMonthStart,
        {
          verificationStatus: "pending",
        },
      ),
    ]);

    const currentPending =
      currentPendingDoctors +
      currentPendingPharmacies +
      currentPendingLaboratories;

    const previousPending =
      previousPendingDoctors +
      previousPendingPharmacies +
      previousPendingLaboratories;

    /**
     
     * 4. ADMIN STATS CARDS
     
     */

    const stats = {
      totalUsers: {
        value: totalUsers,
        change: calculatePercentageChange(
          currentUsers,
          previousUsers,
        ),
      },

      totalDoctors: {
        value: totalDoctors,
        change: calculatePercentageChange(
          currentDoctors,
          previousDoctors,
        ),
      },

      appointments: {
        value: totalAppointments,
        change: calculatePercentageChange(
          currentAppointments,
          previousAppointments,
        ),
      },

      pendingVerifications: {
        value: totalPendingVerifications,
        change: calculatePercentageChange(
          currentPending,
          previousPending,
        ),
      },
    };

    /**
     
     * 5. REGISTRATION CHART
     
     *
     * Default = last 7 months
     */

    const requestedPeriod = Number(req.query.period) || 7;

    let registrationMonths = requestedPeriod;

    if (![7, 12].includes(registrationMonths)) {
      registrationMonths = 7;
    }

    const registrationData = [];

    for (
      let index = registrationMonths - 1;
      index >= 0;
      index--
    ) {
      const { start, end } = getMonthRange(index);

      const [
        patients,
        doctors,
        pharmacies,
        laboratories,
      ] = await Promise.all([
        countCreatedInPeriod(
          Patient,
          start,
          end,
        ),

        countCreatedInPeriod(
          Doctor,
          start,
          end,
        ),

        countCreatedInPeriod(
          Pharmacy,
          start,
          end,
        ),

        countCreatedInPeriod(
          Laboratory,
          start,
          end,
        ),
      ]);

      registrationData.push({
        month: getMonthName(start),
        patients,
        doctors,
        pharmacies,
        laboratories,
      });
    }

    /**
     
     * 6. PLATFORM DISTRIBUTION
     
     */

    const platformTotal =
      totalPatients +
      totalDoctors +
      totalPharmacies +
      totalLaboratories +
      totalAppointments +
      totalPrescriptions;

    const calculateDistribution = (value) => {
      if (platformTotal === 0) return 0;

      return Number(
        ((value / platformTotal) * 100).toFixed(1),
      );
    };

    const platformStats = [
      {
        title: "Patients",
        value: totalPatients,
        percentage: calculateDistribution(
          totalPatients,
        ),
      },

      {
        title: "Doctors",
        value: totalDoctors,
        percentage: calculateDistribution(
          totalDoctors,
        ),
      },

      {
        title: "Pharmacies",
        value: totalPharmacies,
        percentage: calculateDistribution(
          totalPharmacies,
        ),
      },

      {
        title: "Laboratories",
        value: totalLaboratories,
        percentage: calculateDistribution(
          totalLaboratories,
        ),
      },

      {
        title: "Appointments",
        value: totalAppointments,
        percentage: calculateDistribution(
          totalAppointments,
        ),
      },

      {
        title: "Prescriptions",
        value: totalPrescriptions,
        percentage: calculateDistribution(
          totalPrescriptions,
        ),
      },
    ];

    /**
     
     * 7. PLATFORM GROWTH
     
     *
     * Growth is calculated using users + services.
     */

    const currentPatients = await countCreatedInPeriod(
      Patient,
      currentMonthStart,
      now,
    );

    const previousPatients = await countCreatedInPeriod(
      Patient,
      previousMonthStart,
      currentMonthStart,
    );

    const currentPharmacies = await countCreatedInPeriod(
      Pharmacy,
      currentMonthStart,
      now,
    );

    const previousPharmacies = await countCreatedInPeriod(
      Pharmacy,
      previousMonthStart,
      currentMonthStart,
    );

    const currentLaboratories =
      await countCreatedInPeriod(
        Laboratory,
        currentMonthStart,
        now,
      );

    const previousLaboratories =
      await countCreatedInPeriod(
        Laboratory,
        previousMonthStart,
        currentMonthStart,
      );

    const currentPlatformRegistrations =
      currentPatients +
      currentDoctors +
      currentPharmacies +
      currentLaboratories;

    const previousPlatformRegistrations =
      previousPatients +
      previousDoctors +
      previousPharmacies +
      previousLaboratories;

    const platformGrowth = calculatePercentageChange(
      currentPlatformRegistrations,
      previousPlatformRegistrations,
    );

    /**
     
     * 8. RESPONSE
     
     */

    return res.status(200).json({
      success: true,

      message: "Admin dashboard data fetched successfully",

      data: {
        stats: {
          totalUsers: {
            value: stats.totalUsers.value,
            change: formatPercentage(
              stats.totalUsers.change,
            ),
            description: "vs last month",
          },

          totalDoctors: {
            value: stats.totalDoctors.value,
            change: formatPercentage(
              stats.totalDoctors.change,
            ),
            description: "vs last month",
          },

          appointments: {
            value: stats.appointments.value,
            change: formatPercentage(
              stats.appointments.change,
            ),
            description: "vs last month",
          },

          pendingVerifications: {
            value:
              stats.pendingVerifications.value,
            change: formatPercentage(
              stats.pendingVerifications.change,
            ),
            description: "vs last month",
          },
        },

        registrationOverview: {
          period: registrationMonths,
          data: registrationData,
        },

        pendingVerificationSummary: {
          total: totalPendingVerifications,
          doctors: pendingDoctors,
          pharmacies: pendingPharmacies,
          laboratories: pendingLaboratories,
        },

        platformDistribution: {
          total: platformTotal,
          data: platformStats,
        },

        platformGrowth: {
          value: platformGrowth,
          formatted: formatPercentage(
            platformGrowth,
          ),
          description:
            "Compared with the previous month",
        },
      },
    });
  } catch (error) {
    console.error(
      "Admin Dashboard Error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard data",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};