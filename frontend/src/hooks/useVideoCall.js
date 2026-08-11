import { useCallback, useState } from "react";
import { joinVideoConsultation } from "../api/videoApi";

const useVideoCall = () => {
  const [token, setToken] = useState(null);
  const [serverUrl, setServerUrl] = useState(null);
  const [roomName, setRoomName] = useState(null);

  const [participantIdentity, setParticipantIdentity] = useState(null);

  const [participantName, setParticipantName] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const joinRoom = useCallback(async (appointmentId) => {
    try {
      setLoading(true);
      setError(null);

      const data = await joinVideoConsultation(appointmentId);

      setToken(data.token);
      setServerUrl(data.serverUrl);
      setRoomName(data.roomName);

      setParticipantIdentity(data.participantIdentity);
      setParticipantName(data.participantName);

      return data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to join video consultation";

      setError(message);

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetVideoCall = useCallback(() => {
    setToken(null);
    setServerUrl(null);
    setRoomName(null);
    setParticipantIdentity(null);
    setParticipantName(null);

    setLoading(false);
    setError(null);
  }, []);

  return {
    joinRoom,

    token,
    serverUrl,
    roomName,
    participantIdentity,
    participantName,

    loading,
    error,

    resetVideoCall,
  };
};

export default useVideoCall;
