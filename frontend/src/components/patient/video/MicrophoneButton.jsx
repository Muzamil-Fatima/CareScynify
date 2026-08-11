import React from "react";
import {
  MicRounded,
  MicOffRounded,
} from "@mui/icons-material";

const MicrophoneButton = ({
  enabled,
  onToggle,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      title={
        enabled
          ? "Turn microphone off"
          : "Turn microphone on"
      }
      aria-label={
        enabled
          ? "Turn microphone off"
          : "Turn microphone on"
      }
      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed bg-white/5 text-gray-500"
          : enabled
          ? "bg-white/10 text-white hover:bg-white/20 active:scale-95"
          : "bg-red-500/90 text-white hover:bg-red-600 active:scale-95"
      }`}
    >
      {enabled ? (
        <MicRounded fontSize="small" />
      ) : (
        <MicOffRounded fontSize="small" />
      )}
    </button>
  );
};

export default MicrophoneButton;