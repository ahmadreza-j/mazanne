const Invoice = require("../models/invoice-model");
const Status = require("../models/status-model");
const HttpResponse = require("../models/http-response");

const createInvoiceObject = async (req) => {
  // console.log(req.files);
  const {
    productChildField,
    productName,
    productCount,
    productUnit,
    productDesc,
  } = req.body;

  const {
    clientInfo,
    provinces,
    cities,
    parentField,
    field,
    location,
    expireActivity,
  } = req.body;

  let items;
  if (typeof productChildField === "string") {
    items = [
      {
        productChildField: productChildField,
        productName: productName,
        productCount: Number(productCount),
        productUnit: productUnit,
        productDesc: productDesc,
        productImg: req.files[0] ? req.files[0].path : null,
      },
    ];
  } else {
    items = productChildField.map((el, i) => {
      return {
        productChildField: productChildField[i],
        productName: productName[i],
        productCount: Number(productCount[i]),
        productUnit: productUnit[i],
        productDesc: productDesc[i],
        productImg: req.files[i] ? req.files[i].path : null,
      };
    });
  }

  const waitingStatus = await Status.findOne({ code: "wa" });

  const invoiceObject = {
    clientInfo,
    provinces,
    cities,
    parentField,
    field,
    items,
    status: waitingStatus._id,
    location,
    updateCount: 1,
    expireActivity: Number(expireActivity),
  };

  return invoiceObject;
};

const createNewInvoice = async (req, res, next) => {
  const invoiceObject = await createInvoiceObject(req);

  const newInvoice = new Invoice(invoiceObject);

  try {
    const result = await newInvoice.save();
    const response = new HttpResponse(
      result,
      200,
      "درخواست با موفقیت ایجاد شد"
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const getInvoicesByClientId = async (req, res, next) => {
  const clientId = req.params.id;
  // const x = await Status.find()

  try {
    const result = await Invoice.find({ clientInfo: clientId })
      .populate("provinces")
      .populate("cities")
      .populate("status")
      .populate("parentField")
      .populate("field")
      .populate("items.productChildField")
      .populate("items.productUnit");

    const response = new HttpResponse(
      result,
      200,
      `تمام فاکتورهای مربوط به کاربر ${clientId} با موفقیت دریافت شد`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const getInvoiceById = async (req, res, next) => {
  const invoiceId = req.params.id;

  try {
    const result = await Invoice.findById(invoiceId)
      .populate("provinces")
      .populate("cities")
      .populate("status")
      .populate("parentField")
      .populate("field")
      .populate("items.productChildField")
      .populate("items.productUnit");
    const response = new HttpResponse(
      result,
      200,
      `فاکتور "${invoiceId}" با موفقیت دریافت شد.`
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createNewInvoice, getInvoicesByClientId, getInvoiceById };
