import React, { useEffect } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

import "@livekit/components-styles";

const VideoRoom = ({ token, serverUrl, onDisconnected }) => {
  useEffect(() => {
    if (!token || !serverUrl) {
      return;
    }

    return () => {
      // LiveKitRoom handles the connection cleanup.
    };
  }, [token, serverUrl]);

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
        <div className="h-full w-full">
          <VideoConference />
        </div>
      </LiveKitRoom>
    </div>
  );
};

export default VideoRoom;
