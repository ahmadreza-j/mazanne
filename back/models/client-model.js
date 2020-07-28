const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newInvoiceSchema = new Schema({
  timestamp: { type: Date, required: true },
  userInfo: {
    type: Schema.Types.Mixed,
    required: true,
  },
  provinces: {
    type: Array,
    required: true,
  },
  cities: {
    type: Array,
    required: true,
  },
  mainZone: {
    type: Schema.Types.Mixed,
    required: true,
  },
  subZone: {
    type: Schema.Types.Mixed,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  
  location: {
    type: Schema.Types.Mixed,
    required: false,
  },
});

module.exports = {
  NewInvoice: mongoose.model("NewInvoice", newInvoiceSchema),
};
