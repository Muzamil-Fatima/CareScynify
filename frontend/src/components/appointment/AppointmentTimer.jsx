import { useEffect, useState } from "react";

const getTimeLeft = (date, time) => {
  if (!date || !time) return "";

  try {
    const dateString =
      typeof date === "string"
        ? date.split("T")[0]
        : new Date(date).toISOString().split("T")[0];

    const [year, month, day] = dateString.split("-").map(Number);

    const [hours, minutes] = time.split(":").map(Number);

    if (
      !year ||
      !month ||
      !day ||
      Number.isNaN(hours) ||
      Number.isNaN(minutes)
    ) {
      return "Invalid time";
    }

    // Use local browser time
    const appointment = new Date(year, month - 1, day, hours, minutes, 0, 0);

    if (Number.isNaN(appointment.getTime())) {
      return "Invalid time";
    }

    const diff = appointment.getTime() - Date.now();

    if (diff <= 0) {
      return "Started";
    }

    const totalSeconds = Math.floor(diff / 1000);

    const hoursLeft = Math.floor(totalSeconds / 3600);

    const minutesLeft = Math.floor((totalSeconds % 3600) / 60);

    const secondsLeft = totalSeconds % 60;

    if (hoursLeft > 0) {
      return `Starts in ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    }

    if (minutesLeft > 0) {
      return `Starts in ${minutesLeft}m ${secondsLeft}s`;
    }

    return `Starts in ${secondsLeft}s`;
  } catch (error) {
    console.error("Error calculating appointment time:", error);

    return "Invalid time";
  }
};

const AppointmentTimer = ({ date, time, status }) => {
  const [timer, setTimer] = useState(() =>
    status === "cancelled" || status === "completed"
      ? ""
      : getTimeLeft(date, time),
  );

  useEffect(() => {
    if (status === "cancelled" || status === "completed") {
      return;
    }

    const interval = setInterval(() => {
      setTimer(getTimeLeft(date, time));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date, time, status]);

  if (status === "cancelled") {
    return (
      <div className="font-medium text-red-500">Appointment Cancelled</div>
    );
  }

  if (status === "completed") {
    return (
      <div className="font-medium text-blue-600">Appointment Completed</div>
    );
  }

  if (timer === "Started") {
    return (
      <div className="font-medium text-green-600">Appointment Started</div>
    );
  }

  return <div className="font-medium text-purple-600">{timer}</div>;
};

export default AppointmentTimer;
