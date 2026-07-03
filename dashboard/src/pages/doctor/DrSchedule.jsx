
import React, { useState, useEffect } from "react";
import useDoctorAppointments from "../../hooks/useDoctorAppointments";
import ScheduleHeader from "../../components/doctor/Schedule/ScheduleHeader";
import DateFilterCard from "../../components/doctor/Schedule/DateFilterCard";
import AppointmentList from "../../components/doctor/Schedule/AppointmentList";

const DrSchedule = () => {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [openMenu, setOpenMenu] = useState(null);

  const { appointments, loading, error, updateStatus, cancel } =
    useDoctorAppointments();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  if (loading) {
    return <div className="p-6">Loading appointments...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  const filteredAppointments = appointments
    .filter((appointment) => {
      if (!appointment.appointmentDate) return false;

      const appointmentDate = new Date(appointment.appointmentDate)
        .toISOString()
        .split("T")[0];

      return appointmentDate === date;
    })
    .sort((a, b) =>
      a.appointmentTime.localeCompare(b.appointmentTime)
    );

  return (
    <div className="w-full h-full px-1">
      <ScheduleHeader />

      <DateFilterCard date={date} setDate={setDate} />

      <h2 className="uppercase text-sm font-bold text-slate-500 mb-2 pl-1 tracking-wide">
        Appointments Queue System
      </h2>

      <AppointmentList
        appointments={filteredAppointments}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        updateStatus={updateStatus}
        cancel={cancel}
      />
    </div>
  );
};

export default DrSchedule;
