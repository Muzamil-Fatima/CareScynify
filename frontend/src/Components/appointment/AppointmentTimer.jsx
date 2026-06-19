import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

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

const AppointmentTimer = ({ date, time, status }) => {
  const [timer, setTimer] = useState("");

  useEffect(() => {
    if (status === "cancelled" || status === "completed") return;

    const update = () => {
      setTimer(getTimeLeft(date, time));
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [date, time, status]);

  if (status === "cancelled") {
    return (
      <div className="text-red-500 font-medium">
        Appointment Cancelled
      </div>
    );
  }

  return <div className="text-purple-600 font-medium">{timer}</div>;
};

export default AppointmentTimer;