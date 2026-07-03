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
  const openPatientProfile = (patientId) => {
    navigate(`/doctor/patient/profile/${patientId}`);
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
      <div
        onDoubleClick={() => openPatientProfile(patient?._id)}
        className="flex items-center gap-3 w-full xl:w-[30%] min-w-0"
      >
        <div className="w-11 h-11 rounded-full overflow-hidden border flex items-center justify-center bg-violet-100 text-violet-700 font-bold text-sm cursor-pointer">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt={user?.name}
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

        <div>
          <h3 className="font-bold text-slate-900 cursor-pointer">
            {user?.name || "Unknown"}
          </h3>

          <p className="text-sm text-slate-500 truncate w-full cursor-pointer">
            {user?.email || "-"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:w-[45%] mt-5 xl:mt-0 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <FiClock className="text-slate-400" />

          <div className="min-w-0">
            <p className="font-semibold text-slate-900 cursor-pointer">
              {formatTime(item.appointmentTime)}
            </p>

            <p className="text-xs text-slate-400">Slot Interval</p>
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-medium text-slate-700 capitalize">
            {item.appointmentType}
          </p>

          <p className="text-xs text-slate-400">Modality</p>
        </div>

        <div className="flex items-center xl:justify-start">
          <StatusChip status={item.status} />
        </div>
      </div>

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
