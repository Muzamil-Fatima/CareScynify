import React from "react";
import {
  VideocamRounded,
  VideocamOffRounded,
} from "@mui/icons-material";

const CameraButton = ({
  enabled,
  onToggle,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      title={enabled ? "Turn camera off" : "Turn camera on"}
      aria-label={enabled ? "Turn camera off" : "Turn camera on"}
      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 ${
        disabled
          ? "cursor-not-allowed bg-white/5 text-gray-500"
          : enabled
          ? "bg-white/10 text-white hover:bg-white/20 active:scale-95"
          : "bg-red-500/90 text-white hover:bg-red-600 active:scale-95"
      }`}
    >
      {enabled ? (
        <VideocamRounded fontSize="small" />
      ) : (
        <VideocamOffRounded fontSize="small" />
      )}
    </button>
  );
};

export default CameraButton;