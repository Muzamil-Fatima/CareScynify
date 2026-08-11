import React, { useState } from "react";
import CallEndRoundedIcon from "@mui/icons-material/CallEndRounded";

const LeaveCallButton = ({
  onLeave,
  disabled = false,
}) => {
  const [leaving, setLeaving] = useState(false);

  const handleLeave = async () => {
    if (disabled || leaving) return;

    try {
      setLeaving(true);

      if (onLeave) {
        await onLeave();
      }
    } catch (error) {
      console.error("Error leaving consultation:", error);
      setLeaving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLeave}
      disabled={disabled || leaving}
      title="Leave consultation"
      aria-label="Leave consultation"
      className={`flex h-11 min-w-14 items-center justify-center rounded-full text-white transition-all duration-200 ${
        disabled || leaving
          ? "cursor-not-allowed bg-red-900/60"
          : "bg-red-600 hover:bg-red-700 active:scale-95"
      }`}
    >
      {leaving ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        <CallEndRoundedIcon />
      )}
    </button>
  );
};

export default LeaveCallButton;