import { useState } from "react";

import AppointmentCard from "../../Components/appointment/AppointmentCard";
import { useAppointment } from "../../hooks/useAppointments";
import Search from "../../Components/SearchBox";

const Appointments = () => {
  const [active, setActive] = useState("all");

  const { appointments, loading, cancel } = useAppointment();

  const handleCancel = async (id) => {
    await cancel(id);
  };

  const baseAppointments = (appointments || []).filter(
    (a) => a?.status && a.status !== "reserved",
  );

  const filtered =
    active === "all"
      ? baseAppointments
      : baseAppointments.filter((a) => a.status === active);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Appointments</h1>
      </div>

      <Search />

      {/* FILTER TABS */}
      <div className="flex gap-2 flex-wrap pt-2">
        {["all", "pending", "confirmed", "cancelled", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setActive(status)}
            className={`px-3 py-1 rounded-lg text-sm border transition ${
              active === status
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400">No appointments found</p>
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
