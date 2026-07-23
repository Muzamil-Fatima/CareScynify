import React, { useState } from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import AppointmentTimer from "./AppointmentTimer";
import CancelModal from "./CancelModal";
import ReviewModal from "./ReviewModal";

const formatTimeAMPM = (time) => {
  if (!time) return "";

  if (time.toLowerCase().includes("am") || time.toLowerCase().includes("pm")) {
    return time;
  }

  let [hours, minutes] = time.split(":").map(Number);

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
};

const AppointmentCard = ({ item, onCancel }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  
  const doctor = item?.doctorId?.userId;

  const handleCancel = () => {
    onCancel(item._id);
    setOpenModal(false);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 space-y-4">

        {/* DOCTOR INFO */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={
                doctor?.avatar ||
                "https://ui-avatars.com/api/?name=Doctor&background=0D8ABC&color=fff"
              }
              className="w-12 h-12 rounded-full object-cover"
              alt="doctor"
            />

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {doctor?.name || "Doctor"}
              </h2>

              <p className="text-sm text-gray-500">
                {item?.doctorId?.specialization || "Specialist"}
              </p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(
              item.status
            )}`}
          >
            {item.status}
          </span>
        </div>

        {/* INFO */}
        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center gap-2">
            <LocationOnIcon fontSize="small" />
            {item.workplace?.location || "Clinic"}
          </div>

          <div className="flex items-center gap-2">
            <EventAvailableIcon fontSize="small" />
            {new Date(item.appointmentDate).toDateString()} at{" "}
            <b>{formatTimeAMPM(item.appointmentTime)}</b>
          </div>

          <p>
            Mode: <b>{item.appointmentType}</b>
          </p>

          {/* TIMER */}
          <AppointmentTimer
            date={item.appointmentDate}
            time={item.appointmentTime}
            status={item.status}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between items-center">

          {/* CANCEL */}
          <div>
            {item.status !== "cancelled" && item.status !== "completed" && (
              <button
                onClick={() => setOpenModal(true)}
                className="flex items-center gap-1 text-red-600 hover:text-red-700"
              >
                <CancelIcon fontSize="small" />
                Cancel
              </button>
            )}
          </div>

          {/* REVIEW BUTTON (NEW) */}
          <div>
            {item.status === "completed" && (
              <button
                onClick={() => setOpenReview(true)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Write Review
              </button>
            )}
          </div>

        </div>
      </div>

      {/* CANCEL MODAL */}
      <CancelModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleCancel}
      />

      {/* REVIEW MODAL */}
      {openReview && (
        <ReviewModal
          appointment={item}
          onClose={() => setOpenReview(false)}
        />
      )}
    </>
  );
};

export default AppointmentCard;