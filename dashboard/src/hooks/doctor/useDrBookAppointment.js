import { useState } from "react";
import { drBookAppointment  } from "../../api/doctor/drBookappointment";

export const useAppointment = () => {
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const bookAppointment = async (appointmentData) => {
    try {
      setBookingLoading(true);
      setBookingError("");

      const response = await drBookAppointment(appointmentData);

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to book appointment.";

      setBookingError(message);
      throw error;
    } finally {
      setBookingLoading(false);
    }
  };

  return {
    bookAppointment,
    bookingLoading,
    bookingError,
  };
};