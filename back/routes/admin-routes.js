const { Router } = require("express");
const {
  createNewConvertedProvincesCollection,
  deleteConvertedProvincesCollection,
} = require("../controllers/province-controller");
const {
  createNewUnit,
  getUnits,
  editUnit,
  deleteUnit,
} = require("../controllers/unit-controller");
const router = Router();

router.get(
  "/create-new-converted-provinces-collection",
  createNewConvertedProvincesCollection
);
router.get(
  "/delete-converted-provinces-collection",
  deleteConvertedProvincesCollection
);

router.post("/create-new-unit", createNewUnit);
router.get("/fetch-units", getUnits);
router.put("/edit-unit/:id", editUnit);
router.delete("/delete-unit/:id", deleteUnit);

module.exports = router;
