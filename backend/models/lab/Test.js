const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

module.exports = mongoose.model("Test", testSchema);
