// 3️⃣ Hospital Model

// 💡 THIS is what you’re missing

// Hospital
// - name
// - address
// - owner
// - subscriptionPlan

// Why?

// One platform → many hospitals

// Billing

// Access control
import mongoose from "mongoose";
// define the schema
const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  hospitalAddress: { type: String, required: true },
  hospitalOwner: { type: String, required: true },
  subscriptionPlan: { type: String, required: true },
});
const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
