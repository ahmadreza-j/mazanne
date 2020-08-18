const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema(
  {
    code: String,
    label: String,
  },
  { collection: "status" }
);

module.exports = mongoose.model("Status", statusSchema);
