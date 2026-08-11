import { createContext, useContext } from "react";

const VideoCallContext = createContext(null);

export const useVideoCall = () => {
  const context = useContext(VideoCallContext);

  if (!context) {
    throw new Error("useVideoCall must be used inside VideoCallProvider");
  }

  return context;
};

export default VideoCallContext;
