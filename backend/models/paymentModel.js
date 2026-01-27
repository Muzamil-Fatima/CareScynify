// 2️⃣ Payment Model
// Payment
// - appointmentId
// - amount
// - status
import mongoose from "mongoose";
// define the schema
const paymentSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
});
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
