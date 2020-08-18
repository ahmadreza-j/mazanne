const { Router } = require("express");
const {
  createProvincesCollection,
  createCitiesCollection,
  deleteConvertedProvincesCollection,
} = require("../controllers/province-controller");
const {
  createNewUnit,
  editUnit,
  deleteUnit,
} = require("../controllers/unit-controller");
const {
  createNewParentField,
  editParentField,
  deleteParentField,
  addFieldToParent,
  addChildToField,
  addUnitToField,
  // deleteParentFieldCollection,
} = require("../controllers/field-controller");
const router = Router();

router.get(
  "/create-new-converted-provinces-collection",
  createProvincesCollection
);
router.get("/create-new-converted-cities-collection", createCitiesCollection);
router.get(
  "/delete-converted-provinces-collection",
  deleteConvertedProvincesCollection
);

router.post("/create-new-unit", createNewUnit);
router.put("/edit-unit/:id", editUnit);
router.delete("/delete-unit/:id", deleteUnit);

router.post("/create-new-parent-field", createNewParentField);
router.put("/edit-parent-field/:id", editParentField);
router.delete("/delete-parent-field/:id", deleteParentField);
router.post("/add-field-to-parent", addFieldToParent);
router.post("/add-child-to-field", addChildToField);
router.post("/add-unit-to-field", addUnitToField);
// router.delete("/delete-parent-field-collection", deleteParentFieldCollection);

module.exports = router;
