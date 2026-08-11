import { AccessToken } from "livekit-server-sdk";

export const generateRoomToken = async ({
  roomName,
  participantIdentity,
  participantName,
}) => {
  if (!roomName || !participantIdentity) {
    throw new Error("Room name and participant identity are required");
  }

  if (
    !process.env.LIVEKIT_API_KEY ||
    !process.env.LIVEKIT_API_SECRET
  ) {
    throw new Error("LiveKit credentials are not configured");
  }

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantIdentity,
      name: participantName,
      ttl: "2h",
    }
  );

  token.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  return await token.toJwt();
};