import { useCallback, useEffect, useState } from "react";
import { getDoctorPatientAppointments } from "../api/appointmentApi";

const usePatientAppointments = (patientId) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    try {
      console.log("Patient ID:", patientId);

      const data = await getDoctorPatientAppointments(patientId);

      console.log("Appointments:", data);

      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    if (patientId) {
      fetchAppointments();
    }
  }, [fetchAppointments, patientId]);

  return {
    appointments,
    loading,
    refetch: fetchAppointments,
  };
};

export default usePatientAppointments;
