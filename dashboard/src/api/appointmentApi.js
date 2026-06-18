import { api } from "./axios";

export const getDoctorAppointments = async () => {
  const res = await api.get("/api/appointments/doctor");
  return res.data;
};

/* ---------------- DELETE ---------------- */

// delete appointment
export const deleteAppointment = async (id) => {
  const res = await api.delete(`/api/appointments/${id}`);
  return res.data;
};

// update status (doctor/admin)
export const updateAppointmentStatus = async (id, status) => {
  const res = await api.patch(`/api/appointments/${id}/status`, {
    status,
  });

  return res.data;
};