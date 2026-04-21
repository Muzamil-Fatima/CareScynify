export const fetchAppointments = async () => {
  const res = await fetch("/api/appointment");
  return res.json();
};