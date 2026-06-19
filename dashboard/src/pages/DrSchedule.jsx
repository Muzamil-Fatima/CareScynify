import { useState } from "react";
import useDoctorAppointments from "../hooks/useDoctorAppointments";
import ScheduleHeader from "../components/drSchedules/ScheduleHeader";
import StatsCards from "../components/drSchedules/StatsCards";
import ScheduleFilters from "../components/drSchedules/ScheduleFilters";
import AppointmentCard from "../components/drSchedules/AppointmentCard";
import ScheduleCalendar from "../components/drSchedules/ScheduleCalendar";

const DrSchedule = () => {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("all");

  const { appointments, loading, error } = useDoctorAppointments();

  // SAFE DATA MAPPING
  const formattedAppointments = (appointments || []).map((item) => ({
    id: item._id,
    patient: item.patientId?.name || "Unknown",
    time: item.appointmentTime,
    status: item.status?.toLowerCase(),
    type:
      item.appointmentType === "online"
        ? "Online Consultation"
        : "In-Person Checkup",
  }));

  // FILTER LOGIC
  const filteredAppointments = formattedAppointments.filter((item) => {
    if (status === "all") return true;
    return item.status === status;
  });

  // LOADING / ERROR UI
  if (loading) return <p className="p-4">Loading appointments...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <ScheduleHeader />

      {/* STATS */}
      <StatsCards />

      {/* FILTERS */}
      <ScheduleFilters
        date={date}
        setDate={setDate}
        status={status}
        setStatus={setStatus}
      />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* APPOINTMENTS */}
        <div className="lg:col-span-2 grid gap-4">
          {filteredAppointments.map((item) => (
            <AppointmentCard key={item.id} item={item} />
          ))}
        </div>

        {/* CALENDAR */}
        <ScheduleCalendar />

      </div>
    </div>
  );
};

export default DrSchedule;