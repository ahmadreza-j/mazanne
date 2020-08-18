const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expireActivitySchema = new Schema(
  {
    code: Number,
    label: String,
    value: Number,
  },
  { collection: "expireactivities" }
);

module.exports = mongoose.model("ExpireActivity", expireActivitySchema);