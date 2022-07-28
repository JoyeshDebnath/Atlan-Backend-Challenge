const Client = require("../models/ClientIncomeModel");
// const ErrorHander = require("../middlewares/ErrorHandler");
//controller for client s
const ValidateNewClient = async (req, res, next) => {
	try {
		const {
			clientName,
			clientEmail,
			clientIncomePerMonth,
			clientSavingsPerMonth,
			clientMobileNum,
			clientAddress,
		} = req.body;

		//income validation ..
		if (clientIncomePerMonth <= clientSavingsPerMonth) {
			return res.status(500).json({
				status: "Failed",
				issue: "Client Income-savings Validation failed!",
				message: "Client monthly Savings Exceeds Client Months Income!",
			});
		}
		if (clientMobileNum.toString().length !== 10) {
			return res.status(500).json({
				status: "Failed",
				issue: "Invalid Mobile Number Provided!",
				message: "Please Provide a valid Mobile number !",
			});
		}
		//enter the details in db after validating the inputs..
		const newClient = await Client.create({
			clientName,
			clientEmail,
			clientIncomePerMonth,
			clientSavingsPerMonth,
			clientMobileNum,
			clientAddress,
		});

		res.status(201).json({
			status: "Success",
			message: "Client  successfully created!",
			newClient,
		});
	} catch (error) {
		if (error.name === "ValidationError") {
			return res.status(500).json({
				status: "Failed",
				message: "Something Went Wrong!",
				issue: Object.values(error.errors).map((val) => val.message),
			});
		} else {
			return res.status(500).json({
				status: "Failed",
				message:
					"Something Went Wrong!(Either Email Or Mobile number is duplicate !)",
				issue: error.message,
			});
		}
	}
};

module.exports = {
	ValidateNewClient,
};
