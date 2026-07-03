export const formatTime = (time) => {
  if (!time) return "-";

  const date = new Date(`1970-01-01T${time}`);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};