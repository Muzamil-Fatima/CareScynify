import { useState} from "react";

import AppointmentTabs from "../Components/appointment/AppointmentTabs";
import AppointmentCard from "../Components/appointment/AppointmentCard";
import { useAppointment } from "../hooks/useAppointments";

const Appointments = () => {
  const [active, setActive] = useState("all");

  const { appointments, loading, cancel} = useAppointment();

  const handleCancel = async (id) => {
    await cancel(id);
  };

  const filtered =
    active === "all"
      ? appointments
      : appointments.filter((a) => a.appointmentType === active);

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Appointments</h1>
      </div>

      {/* TABS */}
      <AppointmentTabs active={active} setActive={setActive} />

      {/* CONTENT */}
      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <AppointmentCard
              key={item._id}
              item={item}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;