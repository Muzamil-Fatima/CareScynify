import { useState, useEffect } from "react";
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
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetchAppointments();

    const handleUpdate = () => {
      fetchAppointments();
    };

    socket.on("slot-updated", handleUpdate);

    return () => {
      socket.off("slot-updated", handleUpdate);
    };
  }, []);
  // GET ALL APPOINTMENTS
  const fetchAppointments = async () => {
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
  };

  // BOOK APPOINTMENT
  const bookAppointment = async (data) => {
    try {
      setLoading(true);

      // STEP 1: reserve slot
      await reserveSlot(data);

      // STEP 2: confirm appointment
      const res = await createAppointment(data);

      toast.success("Appointment booked successfully");

      await fetchAppointments();

      return res;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Booking failed");
      throw err;
    } finally {
      setLoading(false);
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
    bookAppointment,
    cancel,
    refetch: fetchAppointments,
  };
};
