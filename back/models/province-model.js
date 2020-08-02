const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  latitude: String,
  longitude: String,
  label: String,
});

const province = new Schema({
  label: String,
  cities: [citySchema],
});

module.exports = {
  Province: mongoose.model("Province", province),
  Imported_Provinces: mongoose.model(
    "Imported_Provinces",
    new Schema({}, { collection: "imported_provinces" })
  ),
};
