import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { socket } from "../socket/socket";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} from "../api/appointmentApi";


const useDoctorAppointments = (activeWorkplaceId = "all") => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FILTERED DATA (WORKPLACE LOGIC)
  const filteredAppointments =
    activeWorkplaceId === "all"
      ? appointments
      : appointments.filter(
          (a) => a.workplaceId === activeWorkplaceId
        );

  // FETCH
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDoctorAppointments();
      setAppointments(Array.isArray(data) ? data : []);
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

  // SOCKET
  useEffect(() => {
    fetchAppointments();

    socket.on("slot-updated", fetchAppointments);

    return () => {
      socket.off("slot-updated", fetchAppointments);
    };
  }, [fetchAppointments]);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status } : a
        )
      );

      await updateAppointmentStatus(id, status);
      toast.success(`Appointment ${status}`);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Status update failed"
      );
      fetchAppointments();
    }
  };

  // CANCEL
  const cancel = async (id) => {
    try {
      await cancelAppointment(id);
      toast.success("Appointment cancelled");
      fetchAppointments();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Cancel failed"
      );
    }
  };

  return {
    appointments: filteredAppointments,
    loading,
    error,
    refetch: fetchAppointments,
    updateStatus,
    cancel,
  };
};

export default useDoctorAppointments;