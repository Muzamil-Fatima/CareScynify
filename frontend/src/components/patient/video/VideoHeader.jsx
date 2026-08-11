import React from "react";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const VideoHeader = ({
  participantName = "Video Consultation",
  roomName,
  duration = "00:00",
}) => {
  return (
    <header className="absolute left-0 right-0 top-0 z-20">
      <div className="flex items-center justify-between bg-linear-to-b from-black/70 via-black/40 to-transparent px-4 py-4 sm:px-6">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
    
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/90 shadow-lg">
            <VideocamRoundedIcon className="text-white" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-white sm:text-base">
              {participantName}
            </h1>

            <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-300">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Connected
              </span>

              {roomName && (
                <>
                  <span className="text-gray-500">•</span>

                  <span className="hidden max-w-45 truncate sm:block">
                    {roomName}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Secure consultation */}
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md sm:flex">
            <ShieldOutlinedIcon
              className="text-green-400"
              style={{ fontSize: 17 }}
            />

            <span className="text-xs font-medium text-gray-200">
              Secure consultation
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md">
            <AccessTimeRoundedIcon
              className="text-gray-300"
              style={{ fontSize: 17 }}
            />

            <span className="font-mono text-xs font-medium text-white">
              {duration}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VideoHeader;