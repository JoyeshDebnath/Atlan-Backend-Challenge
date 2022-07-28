const express = require("express");
const router = express.Router();
const { convertSlangs } = require("../controllers/CovertSlangsController");
const {
	ValidateNewClient,
} = require("../controllers/ValidateClientController");
const { getDataSheet } = require("../controllers/GetDataOnSheetController");
const { SendSMStoCustomer } = require("../controllers/SendSmsController");

//(task-1)get the slang
//demo: https://localhost:8080/collect/convertslang?word=Welcome&lang=nl
router.route("/convertslang").get(convertSlangs);
// task2-(validate the client while entering data such as income validation , mobile number validation , email validation ..)
router.route("/validatenewclient").post(ValidateNewClient);
//(task3): export dtabase data into a sheet ..
router.route("/getcsv").get(getDataSheet);
//( task4 ):accept the id of the customer and then search for the customer and then if succssful send the recipt in form of sms

router.route("/sendsms/:id").post(SendSMStoCustomer);

module.exports = router;
