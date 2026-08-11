import Appointment from "../../models/appointmentModel.js";
import DoctorPatient from "../../models/doctor/doctorAddPatientModel.js";
import Doctor from "../../models/doctor/doctorModel.js";
import Review from "../../models/reviewModel.js";

export const globalSearch = async (req, res) => {
  try {
    // GET LOGGED-IN DOCTOR

    const doctor = await Doctor.findOne({
      userId: req.userId,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found.",
      });
    }

    const doctorId = doctor._id;

    // QUERY PARAMETERS

    const { q = "", page = 1, limit = 10, type = "all" } = req.query;

    // VALIDATE SEARCH TYPE

    const allowedTypes = ["all", "appointments", "patients", "reviews"];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid search type",
      });
    }

    // SEARCH QUERY

    const search = String(q).trim();

    // EMPTY SEARCH

    if (!search) {
      return res.status(200).json({
        success: true,
        query: "",
        results: [],
        pagination: {
          page: Number(page) || 1,
          limit: Number(limit) || 10,
          total: 0,
          totalPages: 0,
        },
      });
    }

    // PAGINATION

    const pageNumber = Math.max(Number(page) || 1, 1);

    const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 50);

    const skip = (pageNumber - 1) * limitNumber;

    // REGEX

    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(escapedSearch, "i");

    // RESULTS

    const results = [];

    // 1. APPOINTMENTS

    if (type === "all" || type === "appointments") {
      const appointments = await Appointment.find({
        doctorId: doctor._id,
      })
        .populate({
          path: "patientId",
          populate: {
            path: "userId",
            select: "name email phone avatar",
          },
        })
        .lean();

      // TEMPORARY DEBUG
      // console.log(
      //   " GLOBAL SEARCH ",
      // );
      // console.log(
      //   "req.userId:",
      //   req.userId,
      // );
      // console.log(
      //   "doctor._id:",
      //   doctor._id.toString(),
      // );
      // console.log(
      //   "search:",
      //   search,
      // );
      // console.log(
      //   "appointments found:",
      //   appointments.length,
      // );

      // console.log(
      //   "appointments:",
      //   JSON.stringify(
      //     appointments,
      //     null,
      //     2,
      //   ),
      // );

      // MATCH APPOINTMENTS

      const matchedAppointments = appointments.filter((appointment) => {
        const patient = appointment?.patientId;

        const user = patient?.userId;

        const appointmentDate = appointment?.appointmentDate
          ? new Date(appointment.appointmentDate).toLocaleDateString()
          : "";

        return (
          regex.test(user?.name || "") ||
          regex.test(user?.email || "") ||
          regex.test(user?.phone || "") ||
          regex.test(patient?.patientCode || "") ||
          regex.test(appointment?.status || "") ||
          regex.test(appointment?.appointmentType || "") ||
          regex.test(appointment?.appointmentTime || "") ||
          regex.test(appointmentDate)
        );
      });

      // ADD APPOINTMENT RESULTS

      matchedAppointments.forEach((appointment) => {
        const patient = appointment?.patientId;

        const user = patient?.userId;

        results.push({
          type: "appointment",

          id: appointment?._id,

          title: user?.name || "Unknown Patient",

          subtitle:
            user?.email || user?.phone || patient?.patientCode || "No contact",

          status: appointment?.status,

          data: appointment,
        });
      });
    }

    // 2. DOCTOR PATIENTS

    if (type === "all" || type === "patients") {
      const doctorPatients = await DoctorPatient.find({
        doctorId: doctor._id,
      })
        .populate({
          path: "patientId",
          populate: {
            path: "userId",
            select: "name email phone avatar",
          },
        })
        .lean();

      console.log("doctor patients found:", doctorPatients.length);

      const matchedPatients = doctorPatients.filter((doctorPatient) => {
        const patient = doctorPatient?.patientId;

        const user = patient?.userId;

        const name = user?.name || "";

        const email = user?.email || "";

        const phone = user?.phone || "";

        const patientCode = patient?.patientCode || "";

        return (
          regex.test(name) ||
          regex.test(email) ||
          regex.test(phone) ||
          regex.test(patientCode)
        );
      });

      matchedPatients.forEach((doctorPatient) => {
        const patient = doctorPatient?.patientId;

        const user = patient?.userId;

        if (!patient?._id) {
          return;
        }

        results.push({
          type: "patient",

          id: patient._id,

          title: user?.name || "Unknown Patient",

          subtitle:
            user?.email || user?.phone || patient?.patientCode || "No contact",

          status: doctorPatient?.status,

          data: {
            ...doctorPatient,
          },
        });
      });
    }

    // 3. REVIEWS

    if (type === "all" || type === "reviews") {
      const reviews = await Review.find({
        doctor: doctor._id,
      })
        .populate({
          path: "patient",
          select: "name email phone avatar",
        })
        .lean();

      const matchedReviews = reviews.filter((review) => {
        const user = review?.patient;

        return (
          regex.test(user?.name || "") ||
          regex.test(user?.email || "") ||
          regex.test(user?.phone || "") ||
          regex.test(review?.comment || "") ||
          regex.test(String(review?.rating ?? ""))
        );
      });

      matchedReviews.forEach((review) => {
        const user = review?.patient;

        results.push({
          type: "review",

          id: review?._id,

          title: user?.name || "Unknown Patient",

          subtitle: review?.comment || `${review?.rating || 0} star rating`,

          status: review?.rating,

          data: review,
        });
      });
    }

    // SORT RESULTS

    results.sort((a, b) => {
      const aDate = new Date(
        a?.data?.createdAt || a?.data?.appointmentDate || 0,
      ).getTime();

      const bDate = new Date(
        b?.data?.createdAt || b?.data?.appointmentDate || 0,
      ).getTime();

      return bDate - aDate;
    });

    // TOTAL

    const total = results.length;

    const totalPages = total > 0 ? Math.ceil(total / limitNumber) : 0;

    // PAGINATION

    const paginatedResults = results.slice(skip, skip + limitNumber);

    // RESPONSE

    return res.status(200).json({
      success: true,
      query: search,
      results: paginatedResults,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Global search error:", error);

    return res.status(500).json({
      success: false,
      message: "Global search failed",
      error: error.message,
    });
  }
};
