import React, { useState } from "react";
import useDoctorAppointments from "../../../hooks/useDoctorAppointments";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DrBookAppointment from "../../../pages/doctor/DrBookAppointment"
const AppointmentActions = ({ setActiveTab, activeTab }) => {
  const { appointments } = useDoctorAppointments();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const pendingCount =
    appointments?.filter((item) => item.status === "pending").length || 0;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Pending Button */}
      <button
        onClick={() => setActiveTab("pending")}
        className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-sm ${
          activeTab === "pending"
            ? "bg-amber-700"
            : "bg-[#FF9500] hover:bg-amber-600"
        }`}
      >
        {/* Badge */}
        <span className="absolute -top-2 -left-2 bg-white text-amber-700 text-xs font-semibold min-w-6 h-6 px-1 flex items-center justify-center rounded-full shadow-md">
          {pendingCount}
        </span>
        {/* MUI Icon */}
        <AccessTimeIcon fontSize="small" />
        Pending Slots
      </button>

      {/* New Appointment Button */}
      <button
        onClick={() => setShowBookingModal(true)}
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-xl transition-all duration-150 hover:bg-purple-700 shadow-sm"
      >
        <span className="text-lg leading-none font-bold">+</span>
        <span>New Appointment</span>
      </button>
      {showBookingModal && (
        <DrBookAppointment
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default AppointmentActions;
