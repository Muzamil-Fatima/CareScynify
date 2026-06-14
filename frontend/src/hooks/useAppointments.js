import { useState } from "react";
import { bookAppointment } from "../api/appointmentApi";
import { toast } from "react-toastify";

export const useAppointment = () => {
  const [loading, setLoading] = useState(false);

  const handleBookAppointment = async ({ doctorId, date, time, workplaceId }) => {
    if (!doctorId || !date || !time) {
      toast.error("Missing required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await bookAppointment({
        doctorId,
        workplaceId,
        date,
        time,
      });

      toast.success("Appointment booked successfully");

      return res;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to book appointment",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    bookAppointment: handleBookAppointment,
    loading,
  };
};
