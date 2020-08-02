const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
  label: String,
  code: Number,
});

module.exports = mongoose.model("Unit", unitSchema);
