import { useEffect } from "react";
import { useAppointmentContext } from "../context/AppointmentContext";
import { fetchAppointments } from "../services/appointmentService";

const useAppointments = () => {
  const { appointments, setAppointments } = useAppointmentContext();

  useEffect(() => {
    const load = async () => {
      const data = await fetchAppointments();
      setAppointments(data);
    };
    load();
  }, []);

  return { appointments, setAppointments };
};

export default useAppointments;