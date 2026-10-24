import React from "react";

import {
  AudioTrack,
  VideoTrack,
  useParticipantTracks,
} from "@livekit/components-react";

import { Track } from "livekit-client";

const ParticipantView = ({
  participant,
  cameraTrack,
  isScreenShare = false,
}) => {
  const tracks = useParticipantTracks(
    [
      {
        source: Track.Source.Microphone,
        withPlaceholder: false,
      },
    ],
    participant.identity
  );

  const microphoneTrack = tracks.find(
    (track) => track.source === Track.Source.Microphone
  );

  const participantName =
    participant?.name ||
    participant?.identity ||
    "Participant";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-900">
      {/* Camera / Screen Share */}
      {cameraTrack ? (
        <VideoTrack
          trackRef={cameraTrack}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-700">
              <span className="text-2xl font-semibold text-white">
                {participantName.charAt(0).toUpperCase()}
              </span>
            </div>

            <p className="text-sm font-medium text-white">
              {participantName}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {isScreenShare ? "Screen share unavailable" : "Camera is off"}
            </p>
          </div>
        </div>
      )}

      {/* Participant name */}
      <div className="absolute bottom-3 left-3 z-10">
        <div className="flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 backdrop-blur-md">
          <span className="max-w-45 truncate text-sm font-medium text-white">
            {participantName}
          </span>

          {!participant.isSpeaking && (
            <span className="text-xs text-gray-400">
              •
            </span>
          )}

          {participant.isSpeaking && (
            <span className="flex items-center gap-1 text-xs text-green-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              Speaking
            </span>
          )}
        </div>
      </div>

      {/* Microphone audio */}
      {microphoneTrack && (
        <AudioTrack trackRef={microphoneTrack} />
      )}
    </div>
  );
};

export default ParticipantView;