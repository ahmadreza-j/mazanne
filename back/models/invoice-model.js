const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceItemsSchema = new Schema({
  productCategory: Object,
  productCount: Number,
  productDesc: String,
  // productId: String,
  productImg: Object,
  productName: String,
  productUnit: Object,
});

const invoiceSchema = new Schema(
  {
    clientInfo: {
      type: Object,
      required: true,
    },
    provinces: {
      type: Array.of(Object),
      required: true,
    },
    cities: {
      type: Array.of(Object),
      required: true,
    },
    mainZone: {
      type: Object,
      required: true,
    },
    subZone: {
      type: Object,
      required: true,
    },
    items: [invoiceItemsSchema],
    status: {
      // waiting, accepted, rejected, drafted
      type: Object,
      default: { code: 1 , desc:"در انتظار تأیید ناظر"},
      required: true,
    },

    location: {
      type: Object,
      required: false,
    },
    updateCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
