import Doctor from "../../models/doctor/doctorModel.js";

import {
  detectIntent,
  extractSpecialty,
  extractDoctorName,
} from "../../utils/patientChatbot/chatbotIntent.js";

// ======================================================
// MAIN CHATBOT SERVICE
// ======================================================

export const processChatbotMessage = async ({ message, patientId }) => {
  const normalizedMessage = message.toLowerCase().trim();

  // ====================================================
  // 1. DETECT INTENT
  // ====================================================

  const intent = detectIntent(normalizedMessage);

  // ====================================================
  // 2. GREETING
  // ====================================================

  if (intent === "GREETING") {
    return {
      type: "message",
      message:
        "Hello! I am the CareScynify Patient Assistant. I can help you find doctors, check doctor availability, and find appointment slots. How can I help you?",
      options: [
        "Find a doctor",
        "Check doctor availability",
        "Book an appointment",
      ],
    };
  }

  // ====================================================
  // 3. HELP
  // ====================================================

  if (intent === "HELP") {
    return {
      type: "message",
      message:
        "I can help you find suitable doctors, show doctor information, check available appointment slots, and help you proceed with booking.",
      options: ["Find a doctor", "Check availability", "Book appointment"],
    };
  }

  // ====================================================
  // 4. FIND DOCTOR / CHECK AVAILABILITY
  // ====================================================

  if (intent === "FIND_DOCTOR" || intent === "CHECK_AVAILABILITY") {
    const specialty = extractSpecialty(normalizedMessage);

    // --------------------------------------------------
    // Specialty not detected
    // --------------------------------------------------

    if (!specialty) {
      return {
        type: "select_specialty",
        message: "Sure. Which type of doctor are you looking for?",
        options: [
          "General Physician",
          "Cardiologist",
          "Dermatologist",
          "Neurologist",
          "Gastroenterologist",
          "Orthopedic",
          "Gynecologist",
        ],
      };
    }

    // --------------------------------------------------
    // Find doctors from REAL DATABASE
    // --------------------------------------------------

    const doctors = await findDoctorsBySpecialty(specialty);

    // --------------------------------------------------
    // No doctor found
    // --------------------------------------------------

    if (!doctors.length) {
      return {
        type: "message",
        message: `I couldn't find any ${specialty} in CareScynify.`,
        options: ["Try another specialty", "Find a doctor"],
      };
    }

    // --------------------------------------------------
    // Doctors found
    // --------------------------------------------------

    return {
      type: "doctors",
      specialty,
      message: `I found ${doctors.length} ${specialty}(s) for you.`,
      doctors,
    };
  }

  // ====================================================
  // 5. SPECIFIC DOCTOR SEARCH
  // ====================================================

  if (intent === "DOCTOR_INFO") {
    const doctorName = extractDoctorName(normalizedMessage);

    if (!doctorName) {
      return {
        type: "message",
        message:
          "Please tell me the doctor's name so I can find their information.",
      };
    }

    const doctor = await findDoctorByName(doctorName);

    if (!doctor) {
      return {
        type: "message",
        message:
          "I couldn't find that doctor in CareScynify. Please check the doctor's name and try again.",
      };
    }

    return {
      type: "doctor",
      message: `Here is the information I found for Dr. ${doctor.name}.`,
      doctor,
    };
  }

  // ====================================================
  // 6. CHECK SLOTS
  // ====================================================

  if (intent === "CHECK_SLOTS") {
    return {
      type: "availability_required",
      message:
        "I can check the doctor's real-time appointment slots. Please select a doctor first.",
      action: "SELECT_DOCTOR",
    };
  }

  // ====================================================
  // 7. BOOK APPOINTMENT
  // ====================================================

  if (intent === "BOOK_APPOINTMENT") {
    return {
      type: "booking_required",
      message:
        "Sure. Please select a doctor and an available appointment slot first.",
      action: "SELECT_SLOT",
    };
  }

  // ====================================================
  // 8. FALLBACK
  // ====================================================

  return {
    type: "message",
    message:
      "I'm sorry, I didn't fully understand that. I can help you find a doctor, check availability, or find appointment slots.",
    options: ["Find a doctor", "Check availability", "Book appointment"],
  };
};

// ======================================================
// FIND DOCTORS BY SPECIALIZATION
// ======================================================

const findDoctorsBySpecialty = async (specialty) => {
  try {
    const doctors = await Doctor.find({
      specialization: {
        $regex: new RegExp(`^${specialty}$`, "i"),
      },

      status: "active",
    })
      .populate("userId", "name email avatar status role")
      .select(
        "drId userId specialization experience about qualifications workplaces",
      )
      .limit(10)
      .lean();

    return doctors.map((doctor) => {
      // ----------------------------------------------
      // Get only active/usable workplaces
      // ----------------------------------------------

      const workplaces = (doctor.workplaces || []).map((workplace) => ({
        id: workplace._id,

        name: workplace.name || "Workplace",

        location: workplace.location || "Location not specified",

        type: workplace.type || "clinic",

        consultationType: workplace.settings?.consultationType || null,

        appointmentFee: workplace.settings?.appointmentFee ?? 0,

        appointmentDuration: workplace.settings?.appointmentDuration || null,

        availability: workplace.availability || {},

        slots: workplace.slots || {},
      }));

      // ----------------------------------------------
      // Get fee from first workplace
      // ----------------------------------------------

      const firstWorkplace = workplaces[0];

      const consultationFee = firstWorkplace?.appointmentFee ?? 0;

      // ----------------------------------------------
      // Get avatar
      // ----------------------------------------------

      const profileImage = doctor.userId?.avatar?.url || null;

      // ----------------------------------------------
      // Return chatbot doctor object
      // ----------------------------------------------

      return {
        id: doctor._id,

        drId: doctor.drId,

        name: doctor.userId?.name || "Doctor",

        email: doctor.userId?.email || null,

        specialty: doctor.specialization || "General Physician",

        experience: doctor.experience || "Not specified",

        qualifications: doctor.qualifications || null,

        about: doctor.about || "",

        consultationFee,

        profileImage,

        workplaces,
      };
    });
  } catch (error) {
    console.error("findDoctorsBySpecialty Error:", error);

    throw error;
  }
};

// ======================================================
// FIND SPECIFIC DOCTOR BY NAME
// ======================================================

const findDoctorByName = async (doctorName) => {
  try {
    // ----------------------------------------------
    // Find doctors and populate User
    // ----------------------------------------------

    const doctors = await Doctor.find({
      status: "active",
    })
      .populate("userId", "name email avatar status role")
      .select(
        "drId userId specialization experience about qualifications workplaces",
      )
      .lean();

    // ----------------------------------------------
    // Search doctor name from User.name
    // ----------------------------------------------

    const normalizedDoctorName = doctorName.toLowerCase().trim();

    const doctor = doctors.find((item) =>
      item.userId?.name?.toLowerCase().includes(normalizedDoctorName),
    );

    // ----------------------------------------------
    // Doctor not found
    // ----------------------------------------------

    if (!doctor) {
      return null;
    }

    // ----------------------------------------------
    // Format workplaces
    // ----------------------------------------------

    const workplaces = (doctor.workplaces || []).map((workplace) => ({
      id: workplace._id,

      name: workplace.name || "Workplace",

      location: workplace.location || "Location not specified",

      type: workplace.type || "clinic",

      consultationType: workplace.settings?.consultationType || null,

      appointmentFee: workplace.settings?.appointmentFee ?? 0,

      appointmentDuration: workplace.settings?.appointmentDuration || null,

      availability: workplace.availability || {},

      slots: workplace.slots || {},
    }));

    // ----------------------------------------------
    // First workplace
    // ----------------------------------------------

    const firstWorkplace = workplaces[0];

    // ----------------------------------------------
    // Return doctor
    // ----------------------------------------------

    return {
      id: doctor._id,

      drId: doctor.drId,

      name: doctor.userId?.name || "Doctor",

      email: doctor.userId?.email || null,

      specialty: doctor.specialization || "General Physician",

      experience: doctor.experience || "Not specified",

      qualifications: doctor.qualifications || null,

      about: doctor.about || "",

      consultationFee: firstWorkplace?.appointmentFee ?? 0,

      profileImage: doctor.userId?.avatar?.url || null,

      workplaces,
    };
  } catch (error) {
    console.error("findDoctorByName Error:", error);

    throw error;
  }
};
