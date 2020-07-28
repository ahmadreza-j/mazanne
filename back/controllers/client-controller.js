const { NewInvoice } = require("../models/client-model");

const createNewInvoice = async (req, res, next) => {
  const {
    userInfo,
    provinces,
    cities,
    mainZone,
    subZone,
    items,
    location,
    timestamp,
  } = req.body;

  console.log(req.body)

  const newInvoice = new NewInvoice({
    userInfo,
    provinces,
    cities,
    mainZone,
    subZone,
    items,
    location,
    timestamp,
  });

  try {
    const result = await newInvoice.save();
    console.log("new invoice created");
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewInvoice,
};
