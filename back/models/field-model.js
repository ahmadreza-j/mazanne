const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const childFieldSchema = new Schema({
  code: Number,
  label: String,
  fieldId: { type: mongoose.Types.ObjectId, ref: "Field" },
});

const fieldSchema = new Schema({
  code: Number,
  label: String,
  parentFieldId:{ type: mongoose.Types.ObjectId, ref: "ParentField" },
  unitsId: [{ type: mongoose.Types.ObjectId, ref: "Unit" }],
});

const parentfieldSchema = new Schema({
  code: Number,
  label: String,
});

// module.exports = mongoose.model("ParentField", parentfieldSchema);

module.exports = {
  ParentField: mongoose.model("ParentField", parentfieldSchema),
  Field: mongoose.model("Field", fieldSchema),
  ChildField: mongoose.model("ChildField", childFieldSchema),
};
