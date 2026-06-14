import { api } from "./axios";

// book appointment
export const bookAppointment = async ({
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

// get appointment by id
export const getAppointmentById = async (id) => {
  const res = await api.get(`/api/appointments/${id}`);
  return res.data;
};

// cancel appointment
export const cancelAppointment = async (id) => {
  const res = await api.patch(`/api/appointments/${id}/cancel`);
  return res.data;
};

// update appointment status (doctor only)
export const updateAppointmentStatus = async (id, status) => {
  const res = await api.patch(`/api/appointments/${id}/status`, { status });
  return res.data;
};

// delete appointment (admin only optional)
export const deleteAppointment = async (id) => {
  const res = await api.delete(`/api/appointments/${id}`);
  return res.data;
};

// get doctor appointments
export const getDoctorAppointments = async (doctorId) => {
  const res = await api.get(`/api/appointments/doctor/${doctorId}`);
  return res.data;
};
