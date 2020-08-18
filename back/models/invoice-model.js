const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceItemsSchema = new Schema({
  productChildField: {
    type: mongoose.Types.ObjectId,
    ref: "ChildField",
    required: true,
  },
  productName: String,
  productCount: Number,
  // productCount: Number,
  productUnit: {
    productDesc: String,
    type: mongoose.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  productImg: String,
});

const invoiceSchema = new Schema(
  {
    clientInfo: {
      type: String,
      required: true,
    },
    provinces: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Province",
        required: true,
      },
    ],

    cities: [
      {
        type: mongoose.Types.ObjectId,
        ref: "City",
        required: true,
      },
    ],
    parentField: {
      type: mongoose.Types.ObjectId,
      ref: "ParentField",
      required: true,
    },
    field: {
      type: mongoose.Types.ObjectId,
      ref: "Field",
      required: true,
    },
    items: [invoiceItemsSchema],
    status: {
      // waiting, accepted, rejected, drafted
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Status",
    },

    location: {
      type: Object,
      required: false,
    },
    updateCount: {
      type: Number,
      // type: Number,
    },
    expireActivity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
