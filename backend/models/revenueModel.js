const revenueSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  appointment: { type: Schema.Types.ObjectId, ref: "Appointment" },
  amount: { type: Number, required: true }, // e.g., 12000
  status: { type: String, enum: ["Paid", "Pending"], default: "Paid" },
  paymentDate: { type: Date, default: Date.now },
});
