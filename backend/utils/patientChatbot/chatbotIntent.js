import { INTENT_KEYWORDS, SPECIALTY_KEYWORDS } from "./chatbotKeywords.js";

// NORMALIZE TEXT

const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[?!.!,]/g, " ")
    .replace(/\s+/g, " ");
};

// CHECK KEYWORD MATCH

const containsKeyword = (text, keywords) => {
  return keywords.some((keyword) => {
    return text.includes(keyword.toLowerCase());
  });
};

// DETECT INTENT

export const detectIntent = (message) => {
  const text = normalizeText(message);

  if (!text) {
    return "UNKNOWN";
  }

  // ------------------------------
  // Greeting
  // ------------------------------

  if (containsKeyword(text, INTENT_KEYWORDS.GREETING)) {
    return "GREETING";
  }

  // ------------------------------
  // Help
  // ------------------------------

  if (containsKeyword(text, INTENT_KEYWORDS.HELP)) {
    return "HELP";
  }

  // ------------------------------
  // Booking
  // ------------------------------

  if (containsKeyword(text, INTENT_KEYWORDS.BOOK_APPOINTMENT)) {
    return "BOOK_APPOINTMENT";
  }

  // ------------------------------
  // Available Slots
  // ------------------------------

  if (containsKeyword(text, INTENT_KEYWORDS.CHECK_SLOTS)) {
    return "CHECK_SLOTS";
  }

  // ------------------------------
  // Doctor Availability
  // ------------------------------

  if (containsKeyword(text, INTENT_KEYWORDS.CHECK_AVAILABILITY)) {
    return "CHECK_AVAILABILITY";
  }

  // ------------------------------
  // Doctor Information
  // ------------------------------

  if (containsKeyword(text, INTENT_KEYWORDS.DOCTOR_INFO)) {
    return "DOCTOR_INFO";
  }

  // ------------------------------
  // Find Doctor
  // ------------------------------

  if (containsKeyword(text, INTENT_KEYWORDS.FIND_DOCTOR)) {
    return "FIND_DOCTOR";
  }

  // ------------------------------
  // If specialty mentioned,
  // assume user wants doctor
  // ------------------------------

  const specialty = extractSpecialty(text);

  if (specialty) {
    return "FIND_DOCTOR";
  }

  return "UNKNOWN";
};

// EXTRACT SPECIALTY

export const extractSpecialty = (message) => {
  const text = normalizeText(message);

  for (const [specialty, keywords] of Object.entries(SPECIALTY_KEYWORDS)) {
    if (containsKeyword(text, keywords)) {
      return specialty;
    }
  }

  return null;
};

// EXTRACT DOCTOR NAME

export const extractDoctorName = (message) => {
  const text = normalizeText(message);



  const patterns = [
    /dr\.?\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)*)/i,

    /doctor\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)*)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return null;
};
