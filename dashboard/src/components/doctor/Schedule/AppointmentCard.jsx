import React from "react";
import { FiClock } from "react-icons/fi";
import { formatTime } from "./utils";
import StatusChip from "./StatusChip";
import AppointmentActions from "./AppointmentActions";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({
  item,
  index,
  total,
  openMenu,
  setOpenMenu,
  updateStatus,
  cancel,
}) => {
  const navigate = useNavigate();
  const patient = item.patientId;
  const user = patient?.userId;

  const openPatientProfile = (appointment) => {
    navigate(
      `/doctor/patient/profile/${appointment.patientId._id}/${appointment._id}`,
    );
  };

  return (
    <div
      className={`
        flex flex-col xl:flex-row
        xl:items-center
        justify-between
        gap-5
        p-5 lg:p-6
        transition
        hover:bg-gray-50
        ${index !== total - 1 ? "border-b border-slate-100" : ""}
      `}
    >
      {/* Patient */}
      <div
        onDoubleClick={() => openPatientProfile(item)}
        className="flex items-center gap-3 w-full xl:w-[30%] min-w-0"
      >
        <div className="w-11 h-11 shrink-0 rounded-full overflow-hidden border flex items-center justify-center bg-violet-100 text-violet-700 font-bold text-sm cursor-pointer">
          {user?.avatar?.url ? (
            <img
              src={user.avatar?.url}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            user?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900 truncate cursor-pointer">
            {user?.name || "Unknown"}
          </h3>

          <p className="text-sm text-slate-500 truncate cursor-pointer">
            +{user?.phone || "-"}
          </p>
        </div>
      </div>

      {/* Appointment Information */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 w-full xl:w-[55%] mt-5 xl:mt-0 min-w-0">
        {/* Time */}
        <div className="flex items-center gap-2 min-w-0">
          <FiClock className="text-slate-400 shrink-0" />

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900 truncate">
              {formatTime(item.appointmentTime)}
            </p>

            <p className="text-xs text-slate-400 truncate">Slot Interval</p>
          </div>
        </div>

        {/* Modality */}
        <div className="min-w-0">
          <p className="font-medium text-slate-700 capitalize truncate">
            {item.appointmentType || "-"}
          </p>

          <p className="text-xs text-slate-400 truncate">Modality</p>
        </div>

        {/* Place */}
        <div className="min-w-0">
          <p
            className="font-medium text-slate-700 truncate"
            title={item.workplaceName}
          >
            {item.workplaceName || "Not specified"}
          </p>

          <p
            className="text-xs text-slate-400 truncate"
            title={item.workplaceLocation}
          >
            {item.workplaceLocation || "Location not specified"}
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center xl:justify-start min-w-0">
          <StatusChip status={item.status} />
        </div>
      </div>

      {/* Actions */}
      <AppointmentActions
        item={item}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        updateStatus={updateStatus}
        cancel={cancel}
      />
    </div>
  );
};

export default AppointmentCard;
