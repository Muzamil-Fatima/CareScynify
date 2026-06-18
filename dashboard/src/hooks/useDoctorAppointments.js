import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { socket } from "../socket/socket";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from "../api/appointmentApi";

const useDoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------- FETCH ----------------
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDoctorAppointments();

      const safeData = Array.isArray(data) ? data : [];

      setAppointments(safeData);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load appointments";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------------- SOCKET ----------------
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

  // ---------------- CONFIRM / COMPLETE ----------------
  const updateStatus = async (id, status) => {
    try {
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a)),
      );

      await updateAppointmentStatus(id, status);

      toast.success(`Appointment ${status}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Status update failed");

      // rollback if error
      fetchAppointments();
    }
  };

  // ---------------- CANCEL ----------------
  const cancel = async (id) => {
    try {
      await cancelAppointment(id);

      toast.success("Appointment cancelled");

      fetchAppointments();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Cancel failed");
    }
  };

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,

    // actions
    updateStatus, // confirm + complete
    cancel, // cancel with slot logic
  };
};

export default useDoctorAppointments;
