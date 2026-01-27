import mongoose from "mongoose";
// define the schema
const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true },
  reasonForVisit: { type: String },
  status: { type: String, required: true },
  notes: { type: String },
});
const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
