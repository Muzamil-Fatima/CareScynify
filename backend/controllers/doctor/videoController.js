import { AccessToken } from "livekit-server-sdk";
import Appointment from "../../models/appointmentModel.js";
import Doctor from "../../models/doctor/doctorModel.js";
import Patient from "../../models/patientModel.js";

export const joinVideoConsultation = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const userId = req.userId;

    // 1. Find appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // 2. Only online appointments can use video
    if (appointment.appointmentType !== "online") {
      return res.status(400).json({
        success: false,
        message: "This appointment is not an online consultation",
      });
    }

    // 3. Check patient
    const isPatient =
      appointment.userId?.toString() === userId.toString();

    // 4. Find doctor belonging to logged-in user
    const doctor = await Doctor.findOne({
      userId: userId,
    }).select("_id");

    const isDoctor =
      doctor &&
      appointment.doctorId?.toString() === doctor._id.toString();

    // 5. Authorization
    if (!isDoctor && !isPatient) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to join this consultation",
      });
    }

    // 6. Room
    const roomName = `appointment_${appointment._id}`;

    // 7. Participant identity
    const participantIdentity = userId.toString();

    const participantName = isDoctor ? "Doctor" : "Patient";

    // 8. LiveKit token
    const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: participantIdentity,
        name: participantName,
        ttl: "2h",
      }
    );

    // 9. Permissions
    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const jwt = await token.toJwt();

    // 10. Response
    return res.status(200).json({
      success: true,
      token: jwt,
      serverUrl: process.env.LIVEKIT_URL,
      roomName,
      participantIdentity,
      participantName,
    });
  } catch (error) {
    console.error("Join video consultation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to join video consultation",
      error: error.message,
    });
  }
};