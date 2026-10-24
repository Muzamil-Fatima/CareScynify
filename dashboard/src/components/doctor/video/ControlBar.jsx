import React from "react";

import {
  useLocalParticipant,
  useRoomContext,
} from "@livekit/components-react";

import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import VideocamOffRoundedIcon from "@mui/icons-material/VideocamOffRounded";
import ScreenShareRoundedIcon from "@mui/icons-material/ScreenShareRounded";
import CallEndRoundedIcon from "@mui/icons-material/CallEndRounded";

const ControlBar = ({ onLeave }) => {
  const room = useRoomContext();

  const { localParticipant } = useLocalParticipant();

  const isMicrophoneEnabled =
    localParticipant?.isMicrophoneEnabled ?? false;

  const isCameraEnabled =
    localParticipant?.isCameraEnabled ?? false;

  const isScreenShareEnabled =
    localParticipant?.isScreenShareEnabled ?? false;

  const toggleMicrophone = async () => {
    if (!localParticipant) return;

    try {
      await localParticipant.setMicrophoneEnabled(
        !isMicrophoneEnabled
      );
    } catch (error) {
      console.error("Microphone error:", error);
    }
  };

  const toggleCamera = async () => {
    if (!localParticipant) return;

    try {
      await localParticipant.setCameraEnabled(
        !isCameraEnabled
      );
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  const toggleScreenShare = async () => {
    if (!localParticipant) return;

    try {
      await localParticipant.setScreenShareEnabled(
        !isScreenShareEnabled
      );
    } catch (error) {
      console.error("Screen sharing error:", error);
    }
  };

  const handleLeave = async () => {
    try {
      if (room) {
        await room.disconnect();
      }
    } catch (error) {
      console.error(
        "Error leaving video consultation:",
        error
      );
    } finally {
      if (onLeave) {
        onLeave();
      }
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center px-4 pb-5">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/70 px-3 py-3 shadow-2xl backdrop-blur-xl sm:gap-3 sm:px-4">
        {/* Microphone */}
        <button
          type="button"
          onClick={toggleMicrophone}
          title={
            isMicrophoneEnabled
              ? "Turn microphone off"
              : "Turn microphone on"
          }
          aria-label={
            isMicrophoneEnabled
              ? "Turn microphone off"
              : "Turn microphone on"
          }
          className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
            isMicrophoneEnabled
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-red-500/90 text-white hover:bg-red-500"
          }`}
        >
          {isMicrophoneEnabled ? (
            <MicRoundedIcon />
          ) : (
            <MicOffRoundedIcon />
          )}
        </button>

        {/* Camera */}
        <button
          type="button"
          onClick={toggleCamera}
          title={
            isCameraEnabled
              ? "Turn camera off"
              : "Turn camera on"
          }
          aria-label={
            isCameraEnabled
              ? "Turn camera off"
              : "Turn camera on"
          }
          className={`flex h-11 w-11 items-center justify-center rounded-full transition ${
            isCameraEnabled
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-red-500/90 text-white hover:bg-red-500"
          }`}
        >
          {isCameraEnabled ? (
            <VideocamRoundedIcon />
          ) : (
            <VideocamOffRoundedIcon />
          )}
        </button>

        {/* Screen Share */}
        <button
          type="button"
          onClick={toggleScreenShare}
          title={
            isScreenShareEnabled
              ? "Stop screen sharing"
              : "Share screen"
          }
          aria-label={
            isScreenShareEnabled
              ? "Stop screen sharing"
              : "Share screen"
          }
          className={`hidden h-11 w-11 items-center justify-center rounded-full transition sm:flex ${
            isScreenShareEnabled
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <ScreenShareRoundedIcon />
        </button>

        {/* Divider */}
        <div className="mx-1 hidden h-7 w-px bg-white/10 sm:block" />

        {/* Leave */}
        <button
          type="button"
          onClick={handleLeave}
          title="Leave consultation"
          aria-label="Leave consultation"
          className="flex h-11 w-14 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700 active:scale-95"
        >
          <CallEndRoundedIcon />
        </button>
      </div>
    </div>
  );
};

export default ControlBar;