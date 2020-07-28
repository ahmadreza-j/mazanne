const { Router } = require("express");
const { createNewInvoice } = require("../controllers/client-controller");

const router = Router();

router.post("/create-new-invoice", createNewInvoice);

module.exports = router;