import { useState } from "react";
import ScheduleHeader from "./ScheduleHeader";
import StatsCards from "./StatsCards";
import ScheduleFilters from "./ScheduleFilters";
import AppointmentCard from "./AppointmentCard";
import ScheduleCalendar from "./ScheduleCalendar";

const DrSchedule = () => {
  const [date, setDate] = useState("");

  const appointments = [
    { id: 1, patient: "Ali Khan", time: "10:00 AM", status: "Confirmed" },
    { id: 2, patient: "Sara Ahmed", time: "11:30 AM", status: "Pending" },
    { id: 3, patient: "Ahmed Raza", time: "02:00 PM", status: "Completed" },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <ScheduleHeader />

      {/* STATS */}
      <StatsCards />

      {/* FILTERS */}
      <ScheduleFilters date={date} setDate={setDate} />

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* APPOINTMENTS */}
        <div className="lg:col-span-2 grid gap-4">
          {appointments.map((item) => (
            <AppointmentCard key={item.id} item={item} />
          ))}
        </div>

        {/* CALENDAR SIDE PANEL */}
        <ScheduleCalendar />

      </div>
    </div>
  );
};

export default DrSchedule;