import { useState, useEffect, useCallback } from "react";
import { socket } from "../socket/socket.js";
import { toast } from "react-toastify";
import {
  getUserAppointments,
  createAppointment,
  cancelAppointment,
  reserveSlot,
} from "../api/appointmentApi";

export const useAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [reserveLoading, setReserveLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // GET ALL APPOINTMENTS
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getUserAppointments();

      const list =
        res?.appointments ||
        res?.data?.appointments ||
        (Array.isArray(res) ? res : []);

      const sorted = [...list].sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate),
      );

      setAppointments(sorted);

      return sorted;
    } catch (error) {
      console.error("Fetch appointments failed:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAppointments();

    const handleUpdate = () => {
      fetchAppointments();
    };

    socket.on("slot-updated", handleUpdate);

    return () => {
      socket.off("slot-updated", handleUpdate);
    };
  }, [fetchAppointments]);
  const reserveAppointment = async (data) => {
    try {
      setReserveLoading(true);

      const res = await reserveSlot(data);

      return res;
    } finally {
      setReserveLoading(false);
    }
  };
  // BOOK APPOINTMENT
  const bookAppointment = async (data) => {
    try {
      setBookingLoading(true);

      // STEP 2: confirm appointment
      const res = await createAppointment(data);

      toast.success("Appointment booked successfully");

      await fetchAppointments();

      return res;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
      throw err;
    } finally {
      setBookingLoading(false);
    }
  };

  // CANCEL APPOINTMENT
  const cancel = async (id) => {
    try {
      await cancelAppointment(id);

      toast.success("Appointment cancelled");

      //refresh list after cancel
      await fetchAppointments();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Cancel failed");
    }
  };

  return {
    appointments,
    loading,
    bookingLoading,
    reserveLoading,
    reserveAppointment,
    bookAppointment,
    cancel,
    refetch: fetchAppointments,
  };
};
