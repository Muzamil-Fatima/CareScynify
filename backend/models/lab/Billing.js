const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  patientName: String,
  testName: String,
  amount: Number,
  status: {
    type: String,
    default: "Unpaid",
  },
});

module.exports = mongoose.model("Billing", billingSchema);
