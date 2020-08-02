const Invoice = require("../models/invoice-model");
const HttpResponse = require("../models/http-response");

const createNewInvoice = async (req, res, next) => {
  const {
    clientInfo,
    provinces,
    cities,
    mainZone,
    subZone,
    items,
    location,
  } = req.body;

  const newInvoice = new Invoice({
    clientInfo,
    provinces,
    cities,
    mainZone,
    subZone,
    items,
    location,
  });

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
  }
};

const getInvoicesByClientId = async (req, res, next) => {
  const clientId = req.params.id;

  try {
    const result = await Invoice.find({ "clientInfo.id": clientId });
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

module.exports = { createNewInvoice, getInvoicesByClientId };
