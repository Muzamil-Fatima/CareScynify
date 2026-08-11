import { useCallback, useState } from "react";

import {
  getAvailableSlots,
  doctorCreateAppointment,
} from "../../api/doctor/drBookappointment";

export const useAppointment = () => {
  // BOOKING STATE

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // SLOTS STATE

  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");

  // GET AVAILABLE SLOTS

  const fetchAvailableSlots = useCallback(
    async (doctorId, workplaceId, date) => {
      if (!doctorId || !workplaceId || !date) {
        // console.log("Missing slot parameters:", {
        //   doctorId,
        //   workplaceId,
        //   date,
        // });

        setSlots([]);
        return [];
      }

      try {
        setSlotsLoading(true);
        setSlotsError("");

        // console.log("Fetching slots:", {
        //   doctorId,
        //   workplaceId,
        //   date,
        // });

        const response = await getAvailableSlots(doctorId, workplaceId, date);

        // console.log("Available slots API response:", response);

        const availableSlots = Array.isArray(response)
          ? response
          : Array.isArray(response?.slots)
            ? response.slots
            : [];

        // console.log("Processed slots:", availableSlots);

        setSlots(availableSlots);

        return availableSlots;
      } catch (error) {
        console.error(
          "Fetch Available Slots Error:",
          error?.response?.data || error,
        );

        const message =
          error?.response?.data?.message || "Failed to fetch available slots.";

        setSlotsError(message);
        setSlots([]);

        throw error;
      } finally {
        setSlotsLoading(false);
      }
    },
    [],
  );

  // DOCTOR BOOK APPOINTMENT

  const bookAppointment = useCallback(async (appointmentData) => {
    try {
      setBookingLoading(true);
      setBookingError("");

      console.log("Doctor creating appointment:", appointmentData);

      const response = await doctorCreateAppointment(appointmentData);

      // console.log("Doctor appointment created:", response);

      return response;
    } catch (error) {
      console.error(
        "Doctor Book Appointment Error:",
        error?.response?.data || error,
      );

      const message =
        error?.response?.data?.message || "Failed to book appointment.";

      setBookingError(message);

      throw error;
    } finally {
      setBookingLoading(false);
    }
  }, []);

  // RETURN

  return {
    // Doctor booking
    bookAppointment,
    bookingLoading,

    // Slots
    fetchAvailableSlots,
    slots,
    slotsLoading,
    slotsError,

    // Errors
    bookingError,
    setBookingError,
  };
};
