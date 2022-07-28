const express = require("express");
const router = express.Router();
const { convertSlangs } = require("../controllers/CovertSlangsController");
const {
	ValidateNewClient,
} = require("../controllers/ValidateClientController");
//(task-1)get the slang
//demo: https://localhost:8080/collect/convertslang?word=Welcome&lang=nl
router.route("/convertslang").get(convertSlangs);
router.route("/validatenewclient").post(ValidateNewClient);
module.exports = router;
