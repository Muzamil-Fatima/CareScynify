import { api } from "./axios";

/* ---------------- SLOT SYSTEM ---------------- */

// get available slots
export const getAvailableSlots = async (doctorId, workplaceId, date) => {
  const res = await api.get("/api/appointments/slots", {
    params: { doctorId, workplaceId, date },
  });

  return res.data;
};
/* ---------------- APPOINTMENTS ---------------- */
export const reserveSlot = async (data) => {
  console.log("RESERVE SLOT:", data);

  const res = await api.post("/api/appointments/reserve", data);
  return res.data;
};

export const createAppointment = async (data) => {
  console.log("CREATE APPOINTMENT:", data);

  const res = await api.post("/api/appointments", data);
  return res.data;
};

// get user appointments
export const getUserAppointments = async () => {
  const res = await api.get("/api/appointments");
  return res.data;
};



// get single appointment
export const getAppointmentById = async (id) => {
  const res = await api.get(`/api/appointments/${id}`);
  return res.data;
};

/* ---------------- CANCEL ---------------- */
// cancel appointment
export const cancelAppointment = async (id) => {
  const res = await api.patch(`/api/appointments/${id}/cancel`);
  return res.data;
};

