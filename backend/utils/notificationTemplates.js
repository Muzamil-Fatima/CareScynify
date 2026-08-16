// utils/notificationTemplates.js

export const notificationTemplates = {
  
  // APPOINTMENTS
  

  // Patient books an appointment
  appointmentBooked: (appointment) => ({
    type: "APPOINTMENT_BOOKED",
    title: "Appointment Booked",
    message: `Your appointment with Dr. ${
      appointment.doctorName || "Doctor"
    } has been booked successfully.`,
  }),

  // Doctor receives a new appointment request
  newPatientAppointment: (appointment) => ({
    type: "APPOINTMENT_BOOKED",
    title: "New Appointment Request",
    message: `You have received a new appointment request from ${
      appointment.patientName || "a patient"
    }.`,
  }),

  // Doctor confirms appointment
  appointmentConfirmed: (appointment) => ({
    type: "APPOINTMENT_CONFIRMED",
    title: "Appointment Confirmed",
    message: `Your appointment with Dr. ${
      appointment.doctorName || "Doctor"
    } has been confirmed.`,
  }),

  appointmentCancelledByPatient: (appointment) => ({
    type: "APPOINTMENT_CANCELLED",
    title: "Appointment Cancelled",
    message: `${
      appointment.patientName || "A patient"
    } has cancelled the appointment.`,
  }),

  appointmentCancelledByDoctor: (appointment) => ({
    type: "APPOINTMENT_CANCELLED",
    title: "Appointment Cancelled",
    message: `Your appointment with Dr. ${
      appointment.doctorName || "Doctor"
    } has been cancelled.`,
  }),

  // Appointment completed
  appointmentCompleted: (appointment) => ({
    type: "SYSTEM",
    title: "Appointment Completed",
    message: `Your appointment with Dr. ${
      appointment.doctorName || "Doctor"
    } has been completed.`,
  }),

  // Appointment reminder
  appointmentReminder: (appointment) => ({
    type: "APPOINTMENT_REMINDER",
    title: "Appointment Reminder",
    message: `You have an upcoming appointment with Dr. ${
      appointment.doctorName || "Doctor"
    }.`,
  }),

  
  // VIDEO CONSULTATION
  

  // Video consultation is ready
  videoConsultationReady: (appointment) => ({
    type: "VIDEO_CONSULTATION",
    title: "Video Consultation Ready",
    message: `Your video consultation with Dr. ${
      appointment.doctorName || "Doctor"
    } is ready to join.`,
  }),

  // Doctor starts video consultation
  videoConsultationStarted: () => ({
    type: "VIDEO_CONSULTATION",
    title: "Consultation Started",
    message: "Your doctor has started the video consultation.",
  }),

  
  // LAB
  

  // Lab test booked
  labTestBooked: (test) => ({
    type: "LAB_TEST_BOOKED",
    title: "Lab Test Booked",
    message: `Your ${
      test.testName || "lab test"
    } has been booked successfully.`,
  }),

  // Lab test processing
  labTestProcessing: (test) => ({
    type: "LAB_TEST_PROCESSING",
    title: "Lab Test Processing",
    message: `Your ${
      test.testName || "lab test"
    } is currently being processed.`,
  }),

  // Lab report ready
  labReportReady: (test) => ({
    type: "LAB_REPORT_READY",
    title: "Lab Report Ready",
    message: `Your ${test.testName || "lab test"} report is now available.`,
  }),

  
  // PHARMACY
  

  // Pharmacy order placed
  orderPlaced: (order) => ({
    type: "PHARMACY_ORDER_PLACED",
    title: "Order Placed",
    message: `Your pharmacy order #${
      order.orderId || ""
    } has been placed successfully.`,
  }),

  // Pharmacy order updated
  orderUpdated: (order) => ({
    type: "PHARMACY_ORDER_UPDATED",
    title: "Order Updated",
    message: `Your pharmacy order #${order.orderId || ""} has been updated.`,
  }),

  // Pharmacy order delivered
  orderDelivered: (order) => ({
    type: "PHARMACY_ORDER_DELIVERED",
    title: "Order Delivered",
    message: `Your pharmacy order #${order.orderId || ""} has been delivered.`,
  }),

  
  // DOCTOR / REVIEWS
  

  // Patient leaves a review for doctor
  newPatientReview: (review) => ({
    type: "REVIEW_RECEIVED",
    title: "New Patient Review",
    message: `${
      review.patientName || "A patient"
    } has left a new review on your profile.`,
  }),

  
  // PRESCRIPTION
  

  prescriptionAdded: () => ({
    type: "PRESCRIPTION_ADDED",
    title: "Prescription Added",
    message: "A new prescription has been added to your medical records.",
  }),

  
  // SYSTEM
  

  emailVerified: () => ({
    type: "SYSTEM",
    title: "Email Verified",
    message: "Your email address has been verified successfully.",
  }),

  profileUpdated: () => ({
    type: "SYSTEM",
    title: "Profile Updated",
    message: "Your profile has been updated successfully.",
  }),

  passwordChanged: () => ({
    type: "SYSTEM",
    title: "Password Changed",
    message: "Your account password has been changed successfully.",
  }),

  welcome: (user) => ({
    type: "SYSTEM",
    title: "Welcome to CareScynify",
    message: `Welcome ${
      user.name || "User"
    }! Your CareScynify account has been created successfully.`,
  }),
};

export default notificationTemplates;
