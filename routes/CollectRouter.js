const express = require("express");
const router = express.Router();
const { convertSlangs } = require("../controllers/CovertSlangsController");

router.route("/convertslang").get(convertSlangs);

module.exports = router;
