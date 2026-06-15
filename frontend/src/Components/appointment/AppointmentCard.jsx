import React, { useEffect, useState } from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-hot-toast";

/* ---------------- TIME FORMATTER ---------------- */
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

/* ---------------- COUNTDOWN ---------------- */
const getTimeLeft = (date, time) => {
  if (!date || !time) return null;

  try {
    const baseDate = new Date(date);

    if (isNaN(baseDate.getTime())) return "Invalid date";

    let [hours, minutes] = time.split(":").map(Number);

    const appointment = new Date(baseDate);
    appointment.setUTCHours(hours, minutes, 0, 0);

    const diff = appointment.getTime() - Date.now();

    if (diff <= 0) return "Started";

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (h > 0) return `Starts in ${h}h ${m}m ${s}s`;

    return `Starts in ${m}m ${s}s`;
  } catch (err) {
    toast.error("Error calculating time left", err);
    return "Invalid time";
  }
};

const AppointmentCard = ({ item, onCancel }) => {
  const [timer, setTimer] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const doctor = item?.doctorId?.userId;

  useEffect(() => {
    // ❌ STOP TIMER if cancelled or completed
    if (item.status === "cancelled" || item.status === "completed") return;

    const update = () => {
      const t = getTimeLeft(item.appointmentDate, item.appointmentTime);
      setTimer(t);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [item]);

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

  const handleCancel = () => {
    onCancel(item._id);
    setOpenModal(false);
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
              item.status,
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

          {/* TIMER / STATUS MESSAGE */}
          {item.status === "cancelled" ? (
            <div className="text-red-500 font-medium">
              Appointment Cancelled
            </div>
          ) : (
            <div className="text-purple-600 font-medium">{timer}</div>
          )}
        </div>

        {/* CANCEL BUTTON */}
        <div className="flex justify-end">
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
      </div>

      {/* ---------------- MODAL ---------------- */}
      {openModal && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl p-6 w-80 space-y-4 shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800">
              Cancel Appointment?
            </h2>

            <p className="text-sm text-gray-600">
              Are you sure you want to cancel this appointment?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                No
              </button>

              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentCard;
