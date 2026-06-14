import { api } from "./axios";

/* ---------------- SLOT SYSTEM ---------------- */

// get available slots
export const getAvailableSlots = async (doctorId, workplaceId, date) => {
  const res = await api.get("/api/appointments/slots", {
    params: { doctorId, workplaceId, date },
  });

  return res.data;
};

// reserve slot (temporary hold)
export const reserveSlot = async ({
  doctorId,
  workplaceId,
  date,
  time,
}) => {
  const res = await api.post("/api/appointments/reserve", {
    doctorId,
    workplaceId,
    date,
    time,
  });

  return res.data;
};

/* ---------------- APPOINTMENTS ---------------- */

// create/confirm appointment
export const createAppointment = async ({
  doctorId,
  workplaceId,
  date,
  time,
}) => {
  const res = await api.post("/api/appointments", {
    doctorId,
    workplaceId,
    date,
    time,
  });

  return res.data;
};

// get user appointments
export const getUserAppointments = async () => {
  const res = await api.get("/api/appointments");
  return res.data;
};

// get doctor appointments
export const getDoctorAppointments = async (doctorId) => {
  const res = await api.get(`/api/appointments/doctor/${doctorId}`);
  return res.data;
};

// get single appointment
export const getAppointmentById = async (id) => {
  const res = await api.get(`/api/appointments/${id}`);
  return res.data;
};

/* ---------------- UPDATE / CANCEL ---------------- */

// update status (doctor/admin)
export const updateAppointmentStatus = async (id, status) => {
  const res = await api.patch(`/api/appointments/${id}/status`, {
    status,
  });

  return res.data;
};

// cancel appointment
export const cancelAppointment = async (id) => {
  const res = await api.patch(`/api/appointments/${id}/cancel`);
  return res.data;
};

/* ---------------- DELETE ---------------- */

// delete appointment
export const deleteAppointment = async (id) => {
  const res = await api.delete(`/api/appointments/${id}`);
  return res.data;
};