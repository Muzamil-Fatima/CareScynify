const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  patientName: String,
  testName: String,
  date: String,
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Report", reportSchema);
