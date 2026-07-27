const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  adminName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Setting", settingSchema);
