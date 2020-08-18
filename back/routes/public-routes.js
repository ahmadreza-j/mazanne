const { Router } = require("express");
const {
  getProvinces,
  getCities,
} = require("../controllers/province-controller");
const { getUnits } = require("../controllers/unit-controller");
const { getExpireActivities } = require("../controllers/expire-activity-controller");
const {
  getAllChildFields,
  getAllParentFields,
  getAllFields,
} = require("../controllers/field-controller");

const router = Router();

router.get("/get-provinces", getProvinces);
router.get("/get-cities/:type", getCities);
router.get("/get-all-parent-fields", getAllParentFields);
router.get("/get-all-fields/:type", getAllFields);
router.get("/get-all-child-fields/:type", getAllChildFields);
router.get("/get-units", getUnits);
router.get("/get-expire-activities", getExpireActivities);

module.exports = router;
