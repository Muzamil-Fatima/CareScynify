import React, { useEffect, useState } from "react";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  useTracks,
  useRoomContext,
} from "@livekit/components-react";

import { Track } from "livekit-client";

import "@livekit/components-styles";

import VideoHeader from "./VideoHeader";
import ParticipantView from "./ParticipantView";
import ControlBar from "./ControlBar";

const VideoRoomContent = ({ onDisconnected }) => {
  const room = useRoomContext();

  const cameraTracks = useTracks([
    {
      source: Track.Source.Camera,
      withPlaceholder: true,
    },
  ]);

  // Get screen share tracks separately.
  const screenShareTracks = useTracks([
    {
      source: Track.Source.ScreenShare,
      withPlaceholder: false,
    },
  ]);

  // Consultation timer
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!room) {
      return;
    }

    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);

      setDuration(elapsedSeconds);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [room]);

  // Format seconds into MM:SS or HH:MM:SS
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0",
      )}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const participantMap = new Map();

  cameraTracks.forEach((trackRef) => {
    const participant = trackRef.participant;

    if (!participant) {
      return;
    }

    if (!participantMap.has(participant.identity)) {
      participantMap.set(participant.identity, {
        participant,
        cameraTrack: trackRef,
      });
    }
  });

  const participants = Array.from(participantMap.values());

  return (
    <div className="relative h-full w-full overflow-hidden bg-gray-950">
      {/* Video Header */}
      <VideoHeader
        participantName="Video Consultation"
        duration={formatDuration(duration)}
      />

      {/* Participants */}
      <div className="h-full w-full p-3 pt-20 pb-24 sm:p-4 sm:pt-20 sm:pb-24">
        {participants.length > 0 ? (
          <div
            className={`grid h-full w-full gap-3 ${
              participants.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {participants.map(({ participant, cameraTrack }) => (
              <ParticipantView
                key={participant.identity}
                participant={participant}
                cameraTrack={cameraTrack}
              />
            ))}
          </div>
        ) : screenShareTracks.length > 0 ? (
          <div className="grid h-full w-full grid-cols-1 gap-3">
            {screenShareTracks.map((trackRef) => (
              <ParticipantView
                key={`${trackRef.participant.identity}-screen`}
                participant={trackRef.participant}
                cameraTrack={trackRef}
                isScreenShare
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

              <p className="text-sm font-medium text-white">
                Waiting for participant...
              </p>

              <p className="mt-1 text-xs text-gray-400">
                The other participant will appear here when they join.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Audio Renderer */}
      <RoomAudioRenderer />

      {/* Custom Controls */}
      <ControlBar onLeave={onDisconnected} />
    </div>
  );
};

const VideoRoom = ({ token, serverUrl, onDisconnected }) => {
  if (!token || !serverUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

          <p className="text-sm text-gray-300">Connecting to consultation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-950">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect={true}
        audio={true}
        video={true}
        onDisconnected={onDisconnected}
        className="h-full w-full"
      >
        <VideoRoomContent onDisconnected={onDisconnected} />
      </LiveKitRoom>
    </div>
  );
};

export default VideoRoom;
