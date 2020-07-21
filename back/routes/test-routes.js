const { Router } = require("express");
const { getTestName } = require("../controllers/test-controller");

const router = Router();

router.get("/:name", getTestName);

module.exports = router;
