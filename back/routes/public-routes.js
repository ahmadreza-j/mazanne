const { Router } = require("express");
const { getProvinces } = require("../controllers/province-controller");
const { getUnits } = require("../controllers/unit-controller");

const router = Router();

router.get("/get-provinces", getProvinces);
router.get("/get-units", getUnits);

module.exports = router;
