const { Router } = require("express");
const {
  createNewInvoice,
  getInvoicesByClientId,
} = require("../controllers/invoice-controller");

const router = Router();

router.post("/create-new-invoice", createNewInvoice);
router.get("/get-invoices-by-client-id/:id", getInvoicesByClientId);

module.exports = router;
