import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  key: { type: String, unique: true }, // e.g. "LAB-26"
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
