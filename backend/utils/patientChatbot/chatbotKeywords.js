// CHATBOT INTENTS

export const INTENT_KEYWORDS = {
  // GREETING

  GREETING: [
    "hi",
    "hii",
    "hiii",
    "hey",
    "hello",
    "helo",
    "hy",
    "hye",
    "salam",
    "salaam",
    "assalamualaikum",
    "assalamu alaikum",
    "aoa",
    "good morning",
    "good afternoon",
    "good evening",
    "good night",
  ],

  // HELP

  HELP: [
    "help",
    "help me",
    "i need help",
    "can you help",
    "what can you do",
    "what can u do",
    "how can you help",
    "how can u help",
    "what do you do",
    "what are your features",
    "what services do you provide",
    "show options",
    "options",
    "menu",
  ],

  // FIND DOCTOR

  FIND_DOCTOR: [
    "find doctor",
    "find a doctor",
    "find me a doctor",
    "show doctor",
    "show doctors",
    "show me doctors",
    "show me a doctor",
    "search doctor",
    "search for doctor",
    "search doctors",
    "doctor search",
    "need doctor",
    "i need a doctor",
    "i need doctor",
    "looking for doctor",
    "looking for a doctor",
    "want a doctor",
    "need specialist",
    "need a specialist",
    "looking for specialist",
    "specialist doctor",
    "find specialist",
    "recommend doctor",
    "recommend a doctor",
    "recommend me a doctor",
    "suggest doctor",
    "suggest a doctor",
    "doctor recommendation",
    "which doctor should i see",
    "which doctor should i visit",
    "what doctor should i see",
    "who should i see",
  ],

  // DOCTOR INFORMATION

  DOCTOR_INFO: [
    "doctor information",
    "doctor info",
    "doctor details",
    "details about doctor",
    "details of doctor",
    "doctor profile",
    "profile of doctor",
    "doctor's profile",
    "about doctor",
    "about the doctor",
    "tell me about doctor",
    "tell me about the doctor",
    "doctor experience",
    "doctor qualification",
    "doctor qualifications",
    "doctor fee",
    "doctor fees",
    "consultation fee",
    "how much doctor charges",
    "doctor charges",
    "where does doctor work",
    "doctor workplace",
    "doctor clinic",
  ],

  // CHECK AVAILABILITY

  CHECK_AVAILABILITY: [
    "available doctor",
    "available doctors",
    "doctor available",
    "is doctor available",
    "are doctors available",
    "doctor availability",
    "availability",
    "check availability",
    "check doctor availability",
    "when is doctor available",
    "when are doctors available",
    "doctor timing",
    "doctor timings",
    "doctor time",
    "doctor schedule",
    "doctor's schedule",
    "doctor working hours",
    "working hours",
    "clinic timing",
    "clinic timings",
    "when can i see doctor",
    "when can i see the doctor",
    "when can i visit doctor",
    "when can i meet doctor",
    "when is the doctor free",
    "when is doctor free",
  ],

  // CHECK SLOTS

  CHECK_SLOTS: [
    "available slot",
    "available slots",
    "free slot",
    "free slots",
    "appointment slot",
    "appointment slots",
    "check slot",
    "check slots",
    "check available slots",
    "show slot",
    "show slots",
    "show available slots",
    "show me slots",
    "show me available slots",
    "what slots are available",
    "which slots are available",
    "which slots are free",
    "what time slots are free",
    "free appointment",
    "free appointments",
    "open appointment",
    "open appointments",
    "any free appointment",
    "any available appointment",
    "is there any slot",
    "is there a free slot",
    "do you have any slots",
    "do you have free slots",
  ],

  // BOOK APPOINTMENT

  BOOK_APPOINTMENT: [
    "book appointment",
    "book an appointment",
    "book appointment with doctor",
    "book doctor appointment",
    "make appointment",
    "make an appointment",
    "schedule appointment",
    "schedule an appointment",
    "schedule doctor appointment",
    "i want to book",
    "i want to book appointment",
    "i want an appointment",
    "i need an appointment",
    "need appointment",
    "get appointment",
    "get an appointment",
    "reserve appointment",
    "reserve a slot",
    "book a slot",
    "book slot",
    "book this slot",
    "book this",
    "confirm appointment",
    "confirm booking",
    "appointment booking",
  ],
};

// MEDICAL SPECIALTIES

export const SPECIALTY_KEYWORDS = {
  // GENERAL PHYSICIAN

  "General Physician": [
    "general physician",
    "general doctor",
    "general medicine",
    "family doctor",
    "family physician",
    "gp",
    "physician",
    "primary care doctor",
    "primary doctor",
  ],

  // CARDIOLOGIST

  Cardiologist: [
    "cardiologist",
    "cardiology",
    "heart doctor",
    "heart specialist",
    "cardiac specialist",
    "cardiac doctor",
    "heart problem doctor",
    "heart problems doctor",
    "heart disease doctor",
  ],

  // DERMATOLOGIST

  Dermatologist: [
    "dermatologist",
    "dermatology",
    "skin doctor",
    "skin specialist",
    "skin problem doctor",
    "skin problems",
    "skin disease doctor",
    "acne doctor",
    "rash doctor",
    "pimple doctor",
    "pimples doctor",
  ],

  // NEUROLOGIST

  Neurologist: [
    "neurologist",
    "neurology",
    "brain doctor",
    "brain specialist",
    "nerve doctor",
    "nerve specialist",
    "nervous system doctor",
    "migraine doctor",
    "headache doctor",
    "severe headache doctor",
    "memory problem doctor",
    "seizure doctor",
  ],

  // GASTROENTEROLOGIST

  Gastroenterologist: [
    "gastroenterologist",
    "gastroenterology",
    "stomach doctor",
    "stomach specialist",
    "digestive doctor",
    "digestive system doctor",
    "digestion doctor",
    "gastric doctor",
    "stomach problem doctor",
    "stomach pain doctor",
    "acidity doctor",
  ],

  // ORTHOPEDIC

  Orthopedic: [
    "orthopedic",
    "orthopedist",
    "orthopedic doctor",
    "bone doctor",
    "bone specialist",
    "joint doctor",
    "joint specialist",
    "bones doctor",
    "back pain doctor",
    "knee doctor",
    "knee pain doctor",
    "shoulder doctor",
    "fracture doctor",
  ],

  // GYNECOLOGIST

  Gynecologist: [
    "gynecologist",
    "gynecology",
    "gynaecologist",
    "gynaecology",
    "women doctor",
    "women's doctor",
    "women specialist",
    "female doctor",
    "female health doctor",
  ],

  // PEDIATRICIAN

  Pediatrician: [
    "pediatrician",
    "pediatrics",
    "paediatrician",
    "paediatrics",
    "child doctor",
    "children doctor",
    "kids doctor",
    "kid doctor",
    "baby doctor",
    "child specialist",
    "children specialist",
  ],

  // DENTIST

  Dentist: [
    "dentist",
    "dental doctor",
    "dental specialist",
    "teeth doctor",
    "tooth doctor",
    "dental",
    "tooth problem doctor",
    "teeth problem doctor",
    "gum doctor",
  ],

  // OPHTHALMOLOGIST

  Ophthalmologist: [
    "ophthalmologist",
    "ophthalmology",
    "eye doctor",
    "eye specialist",
    "vision doctor",
    "eyes doctor",
    "eye problem doctor",
    "eyes problem doctor",
    "vision specialist",
  ],

  // ENT

  ENT: [
    "ent",
    "ent doctor",
    "ent specialist",
    "ear doctor",
    "ear specialist",
    "nose doctor",
    "nose specialist",
    "throat doctor",
    "throat specialist",
    "ear nose throat doctor",
    "ear nose throat specialist",
  ],
};

// TIME KEYWORDS

export const TIME_KEYWORDS = {
  MORNING: ["morning", "in the morning", "early morning", "before noon"],

  AFTERNOON: ["afternoon", "in the afternoon", "after lunch", "after noon"],

  EVENING: ["evening", "in the evening", "after 5", "after 6", "after 7"],

  NIGHT: ["night", "at night", "late night"],
};

// DAYS

export const DAY_KEYWORDS = {
  Mon: ["monday", "mon", "on monday"],

  Tue: ["tuesday", "tue", "on tuesday"],

  Wed: ["wednesday", "wed", "on wednesday"],

  Thu: ["thursday", "thu", "thur", "on thursday"],

  Fri: ["friday", "fri", "on friday"],

  Sat: ["saturday", "sat", "on saturday"],

  Sun: ["sunday", "sun", "on sunday"],
};

// DATE KEYWORDS

export const DATE_KEYWORDS = {
  TODAY: ["today", "right now", "for today"],

  TOMORROW: ["tomorrow", "for tomorrow"],

  NEXT_WEEK: ["next week", "next week appointment"],

  THIS_WEEK: ["this week", "during this week"],
};

// CONSULTATION TYPE

export const CONSULTATION_KEYWORDS = {
  ONLINE: [
    "online appointment",
    "online consultation",
    "online doctor",
    "virtual appointment",
    "virtual consultation",
    "video consultation",
    "video appointment",
    "remote appointment",
    "online",
    "virtual",
  ],

  PHYSICAL: [
    "physical appointment",
    "physical consultation",
    "clinic appointment",
    "visit clinic",
    "visit doctor",
    "in person",
    "in-person",
    "face to face",
    "physical",
  ],
};

// BOOKING CONFIRMATION

export const CONFIRMATION_KEYWORDS = [
  "yes",
  "yes please",
  "yeah",
  "yep",
  "sure",
  "sure please",
  "okay",
  "ok",
  "okay please",
  "confirm",
  "confirm it",
  "confirm appointment",
  "confirm booking",
  "book it",
  "book this",
  "book this slot",
  "do it",
  "proceed",
  "continue",
];

// CANCEL / STOP

export const CANCEL_KEYWORDS = [
  "cancel",
  "cancel it",
  "cancel appointment",
  "cancel booking",
  "stop",
  "stop booking",
  "no",
  "no thanks",
  "no thank you",
  "never mind",
  "nevermind",
  "forget it",
  "go back",
  "back",
  "exit",
];

// NAVIGATION / GENERAL ACTIONS

export const NAVIGATION_KEYWORDS = {
  BACK: ["back", "go back", "previous", "previous step"],

  START_OVER: ["start over", "restart", "start again", "reset", "begin again"],

  SHOW_MORE: [
    "show more",
    "more doctors",
    "more options",
    "show other doctors",
    "other doctors",
    "next doctors",
  ],
};

// LOCATION KEYWORDS

export const LOCATION_KEYWORDS = [
  "near me",
  "nearby",
  "close to me",
  "near me please",
  "in my area",
  "near my location",
  "nearby doctor",
  "nearby doctors",
  "doctor near me",
  "doctors near me",
];

// COMMON PATIENT REQUESTS

export const COMMON_REQUEST_KEYWORDS = {
  FIND_NEAREST: [
    "nearest doctor",
    "nearest doctors",
    "closest doctor",
    "closest doctors",
    "doctor closest to me",
    "doctor near me",
  ],

  FEE: [
    "fee",
    "fees",
    "price",
    "cost",
    "charges",
    "consultation fee",
    "how much",
    "how much does it cost",
  ],

  EXPERIENCE: [
    "experience",
    "years of experience",
    "experienced doctor",
    "senior doctor",
    "qualified doctor",
  ],

  WORKPLACE: [
    "where does doctor work",
    "where does the doctor work",
    "doctor clinic",
    "doctor hospital",
    "clinic location",
    "hospital location",
    "where is doctor",
    "doctor location",
  ],
};
