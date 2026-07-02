import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiVideo,
  FiMoreVertical,
  FiCheckCircle,
  FiUser,
  FiXCircle,
} from "react-icons/fi";

const AppointmentActions = ({
  item,
  openMenu,
  setOpenMenu,
  updateStatus,
  cancel,
}) => {
  const navigate = useNavigate();
  const openPatientProfile = (patientId) => {
    navigate(`/doctor/patient/profile/${patientId}`);
  };
  return (
    <div
      className="
      flex items-center justify-end
      gap-2
      mt-4 xl:mt-0
      relative
      w-full xl:w-auto
      shrink-0
    "
    >
      {item.appointmentType === "online" ? (
        <button
          className="
          bg-violet-700 hover:bg-violet-800
          text-white rounded-lg
          px-4 py-2
          text-sm font-semibold
          flex items-center gap-2
          whitespace-nowrap
          shrink-0
          transition
        "
        >
          <FiVideo />
          Join Room
        </button>
      ) : (
        <button className="border border-slate-300 hover:bg-slate-50 rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 flex items-center gap-2 transition">
          <FiCheckCircle />
          Check In
        </button>
      )}

      <button
        onClick={() => setOpenMenu(openMenu === item._id ? null : item._id)}
        className="text-slate-400 hover:text-slate-600 p-2"
      >
        <FiMoreVertical size={18} />
      </button>

      {openMenu === item._id && (
        <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <button
            onClick={() => openPatientProfile(item.patientId?._id)}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-blue-50 text-left text-blue-700 cursor-pointer"
          >
            <FiUser />
            View Profile
          </button>

          <button
            onClick={async () => {
              await updateStatus(item._id, "confirmed");
              setOpenMenu(null);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-indigo-50 text-left text-indigo-700"
          >
            <FiCheckCircle />
            Confirm Appointment
          </button>

          <button
            onClick={async () => {
              await updateStatus(item._id, "completed");
              setOpenMenu(null);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-green-50 text-left text-green-700"
          >
            <FiCheckCircle />
            Mark Completed
          </button>

          <button
            onClick={async () => {
              await cancel(item._id);
              setOpenMenu(null);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-left text-red-700"
          >
            <FiXCircle />
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentActions;
