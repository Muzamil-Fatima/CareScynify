import { api } from "../axios";

// GET AVAILABLE SLOTS
export const getAvailableSlots = async (doctorId, workplaceId, date) => {
  const res = await api.get("/api/appointments/slots", {
    params: {
      doctorId,
      workplaceId,
      date,
    },
  });

  return res.data;
};

// DOCTOR BOOKS APPOINTMENT FOR PATIENT
export const doctorCreateAppointment = async (data) => {
  const res = await api.post("/api/appointments/doctor/create", data);

  return res.data;
};
