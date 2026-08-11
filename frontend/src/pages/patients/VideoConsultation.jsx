import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useVideoCall from "../../hooks/useVideoCall";
import VideoRoom from "../../components/patient/video/VideoRoom";

const VideoConsultation = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const {
    joinRoom,
    token,
    serverUrl,
    roomName,
    participantName,
    loading,
    error,
    resetVideoCall,
  } = useVideoCall();

  useEffect(() => {
    if (!appointmentId) {
      return;
    }

    joinRoom(appointmentId).catch(() => {
      // Error is already handled by useVideoCall.
    });

    return () => {
      resetVideoCall();
    };
  }, [appointmentId, joinRoom, resetVideoCall]);

  const handleDisconnected = () => {
    resetVideoCall();

    // Go back to appointments after leaving
    navigate(-1);
  };

  // Missing appointment ID
  if (!appointmentId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-white">
            Invalid consultation
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Appointment information is missing.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />

          <h2 className="mt-5 text-base font-semibold text-white">
            Joining consultation...
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Please wait while we connect you to the consultation.
          </p>
        </div>
      </div>
    );
  }

  // Backend error
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-6 text-center shadow-xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <span className="text-xl text-red-400">!</span>
          </div>

          <h2 className="mt-4 text-lg font-semibold text-white">
            Unable to join consultation
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-400">{error}</p>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-white/10"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={() => joinRoom(appointmentId)}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Token not available yet
  if (!token || !serverUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <p className="text-sm text-gray-400">Preparing consultation...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-950">
      <VideoRoom
        token={token}
        serverUrl={serverUrl}
        roomName={roomName}
        participantName={participantName}
        onDisconnected={handleDisconnected}
      />
    </div>
  );
};

export default VideoConsultation;
