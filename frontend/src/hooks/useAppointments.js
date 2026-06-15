import { useState, useEffect } from "react";
import {socket} from "../socket/socket.js";
import { toast } from "react-toastify";
import {
  getUserAppointments,
  createAppointment,
  cancelAppointment,
} from "../api/appointmentApi";

export const useAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
useEffect(() => {
  socket.on("slot-updated", () => {
    fetchAppointments(); // auto refresh when backend changes
  });

  return () => {
    socket.off("slot-updated");
  };
}, []);
  // GET ALL APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const data = await getUserAppointments();

      // handle array OR object 
      setAppointments(Array.isArray(data) ? data : data.appointments || []);

      return data;
    } catch (error) {
      console.error("Fetch appointments failed:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  // BOOK APPOINTMENT
  const bookAppointment = async ({
    doctorId,
    date,
    time,
    workplaceId,
    appointmentType,
  }) => {
    if (!doctorId || !date || !time || !workplaceId || !appointmentType) {
      toast.error("Missing required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await createAppointment({
        doctorId,
        workplaceId,
        date,
        time,
        appointmentType,
      });

      toast.success("Appointment booked successfully");

      //refresh list after booking
      await fetchAppointments();

      return res;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to book appointment"
      );
      throw error;
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