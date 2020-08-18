const { Router } = require("express");
const fileUpload = require("../middleware/file-upload");

const {
  createNewInvoice,
  getInvoicesByClientId,
  getInvoiceById,
} = require("../controllers/invoice-controller");

const router = Router();

router.post("/create-new-invoice", fileUpload.array("productImg"), createNewInvoice);
router.get("/get-invoices-by-client-id/:id", getInvoicesByClientId);
router.get("/get-invoice-by-id/:id", getInvoiceById);

module.exports = router;
