const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  latitude: String,
  longitude: String,
  label: String,
  provinceId: { type: mongoose.Types.ObjectId, ref: "Province" },
});

const provinceSchema = new Schema({
  label: String,
});

module.exports = {
  Province: mongoose.model("Province", provinceSchema),
  City: mongoose.model("City", citySchema),
  Imported_Provinces: mongoose.model(
    "Imported_Provinces",
    new Schema({}, { collection: "imported_provinces" })
  ),
};
