const express = require("express");
const router = express.Router();
const { convertSlangs } = require("../controllers/CovertSlangsController");
//(task-1)get the slang
//demo: https://localhost:8080/collect/convertslang?word=Welcome&lang=nl
router.route("/convertslang").get(convertSlangs);

module.exports = router;
