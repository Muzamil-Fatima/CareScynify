
import mongoose from "mongoose";
// define the schema
const clinicSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  clinicName: { type: String, required: true },
  clinicLocation: { type: String, required: true },
  clinicTimings: { type: String, required: true },
});
const Clinic = mongoose.model("Clinic", clinicSchema);
export default Clinic;
