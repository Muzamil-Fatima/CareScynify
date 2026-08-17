// ==========================================
// CHATBOT RESPONSE HELPERS
// ==========================================


// ==========================================
// GENERIC MESSAGE
// ==========================================

export const messageResponse = (message, options = []) => {
  return {
    type: "message",
    message,
    options,
  };
};


// ==========================================
// WELCOME RESPONSE
// ==========================================

export const welcomeResponse = () => {
  return {
    type: "message",
    message:
      "Hello! I am the CareScynify Patient Assistant. I can help you find doctors, check their availability, and find appointment slots.",
    options: [
      "Find a doctor",
      "Check availability",
      "Book appointment",
    ],
  };
};


// ==========================================
// HELP RESPONSE
// ==========================================

export const helpResponse = () => {
  return {
    type: "message",
    message:
      "I can help you find suitable doctors, view doctor information, check available appointment slots, and proceed with appointment booking.",
    options: [
      "Find a doctor",
      "Check availability",
      "Book appointment",
    ],
  };
};


// ==========================================
// SPECIALTY REQUIRED
// ==========================================

export const specialtyRequiredResponse = () => {
  return {
    type: "select_specialty",
    message:
      "Sure. Which type of doctor are you looking for?",
    options: [
      "General Physician",
      "Cardiologist",
      "Dermatologist",
      "Neurologist",
      "Gastroenterologist",
      "Orthopedic",
      "Gynecologist",
      "Pediatrician",
      "Dentist",
      "Ophthalmologist",
      "ENT",
    ],
  };
};


// ==========================================
// DOCTOR LIST RESPONSE
// ==========================================

export const doctorsResponse = (
  doctors = [],
  specialty
) => {
  if (!doctors.length) {
    return {
      type: "message",
      message: `I couldn't find any ${specialty || "doctors"} in CareScynify.`,
      options: ["Find another doctor"],
    };
  }

  return {
    type: "doctors",
    message: `I found ${doctors.length} ${
      specialty || "doctor"
    }${doctors.length > 1 ? "s" : ""} for you.`,
    doctors,
  };
};


// ==========================================
// SINGLE DOCTOR RESPONSE
// ==========================================

export const doctorResponse = (doctor) => {
  if (!doctor) {
    return {
      type: "message",
      message:
        "I couldn't find that doctor in CareScynify.",
      options: ["Find a doctor"],
    };
  }

  return {
    type: "doctor",
    message: `Here is the information for Dr. ${doctor.name}.`,
    doctor,
    options: [
      "Check availability",
      "Find another doctor",
    ],
  };
};


// ==========================================
// AVAILABILITY RESPONSE
// ==========================================

export const availabilityResponse = (
  doctor,
  slots = []
) => {
  if (!doctor) {
    return {
      type: "message",
      message:
        "Please select a doctor first so I can check their availability.",
      action: "SELECT_DOCTOR",
    };
  }

  if (!slots.length) {
    return {
      type: "availability",
      message: `Dr. ${doctor.name} has no available appointment slots for the selected time.`,
      doctorId: doctor.id,
      slots: [],
      options: [
        "Check another date",
        "Find another doctor",
      ],
    };
  }

  return {
    type: "availability",
    message: `These appointment slots are currently available with Dr. ${doctor.name}:`,
    doctorId: doctor.id,
    slots,
  };
};


// ==========================================
// SLOT RESPONSE
// ==========================================

export const slotsResponse = (
  doctor,
  slots = [],
  date = null
) => {
  if (!slots.length) {
    return {
      type: "slots",
      message: `No free slots were found${
        date ? ` for ${date}` : ""
      }.`,
      slots: [],
      options: [
        "Try another date",
        "Find another doctor",
      ],
    };
  }

  return {
    type: "slots",
    message: `I found ${slots.length} available appointment ${
      slots.length === 1 ? "slot" : "slots"
    }${date ? ` for ${date}` : ""}.`,
    doctor: doctor
      ? {
          id: doctor.id,
          name: doctor.name,
        }
      : null,
    slots,
  };
};


// ==========================================
// BOOKING CONFIRMATION REQUIRED
// ==========================================

export const bookingConfirmationResponse = ({
  doctor,
  slot,
}) => {
  return {
    type: "booking_confirmation",
    message: `The selected slot is available with Dr. ${
      doctor?.name || "the doctor"
    }. Would you like to book this appointment?`,
    doctor,
    slot,
    options: [
      "Confirm booking",
      "Choose another slot",
    ],
  };
};


// ==========================================
// BOOKING SUCCESS
// ==========================================

export const bookingSuccessResponse = (
  appointment
) => {
  return {
    type: "booking_success",
    message:
      "Your appointment has been successfully booked.",
    appointment,
  };
};


// ==========================================
// BOOKING FAILED
// ==========================================

export const bookingFailedResponse = (
  message = "The appointment could not be booked."
) => {
  return {
    type: "booking_failed",
    message,
    options: [
      "Choose another slot",
      "Find another doctor",
    ],
  };
};


// ==========================================
// UNKNOWN MESSAGE
// ==========================================

export const unknownResponse = () => {
  return {
    type: "message",
    message:
      "I'm sorry, I didn't fully understand that. I can help you find a doctor, check availability, or find appointment slots.",
    options: [
      "Find a doctor",
      "Check availability",
      "Book appointment",
    ],
  };
};


// ==========================================
// ERROR RESPONSE
// ==========================================

export const errorResponse = () => {
  return {
    type: "message",
    message:
      "Sorry, I couldn't process your request right now. Please try again.",
  };
};