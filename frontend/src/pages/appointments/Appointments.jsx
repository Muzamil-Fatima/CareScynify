import { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import AppointmentTabs from "../../Components/appointment/AppointmentTabs";
import AppointmentCard from "../../Components/appointment/AppointmentCard";
import { appointmentData } from "../../data/appointmentData";

const Appointments = () => {
  const [appointments, setAppointments] = useState(appointmentData);
  const [active, setActive] = useState("all");

  // cancel
  const handleCancel = (id) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "cancelled" } : a
    );
    setAppointments(updated);
  };

  // filter
  const filtered =
    active === "all"
      ? appointments
      : appointments.filter((a) => a.type === active);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Appointments
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your healthcare bookings
          </p>
        </div>

        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl">
          <AddCircleOutlineOutlinedIcon />
          Book Appointment
        </button>
      </div>

      {/* Tabs */}
      <AppointmentTabs active={active} setActive={setActive} />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <AppointmentCard
            key={item.id}
            item={item}
            onCancel={handleCancel}
          />
        ))}
      </div>

    </div>
  );
};

export default Appointments;