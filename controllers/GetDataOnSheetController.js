const ClientInfo = require("../models/ClientIncomeModel");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const getDataSheet = async (req, res, next) => {
	try {
		const ClientData = await ClientInfo.find({});

		// console.log(ClientData);
		//creating a csv file to enter the Client data / information in that csv file ..
		const csvWriter = createCsvWriter({
			path: "public/Clients_Information.csv",
			header: [
				{ id: "_id", title: "_id" },
				{ id: "clientName", title: "clientName" },
				{ id: "clientEmail", title: "clientEmail" },
				{ id: "clientIncomePerMonth", title: "clientIncomePerMonth" },
				{ id: "clientSavingsPerMonth", title: "clientSavingsPerMonth" },
				{ id: "clientMobileNum", title: "clientMobileNum" },
				{ id: "clientAddress", title: "clientAddress" },
			],
		});
		// insert data into the csv file
		await csvWriter.writeRecords(ClientData);
		// send the success response
		return res.status(200).json({
			status: "Success",
			message: "Data inserted into the Csv file successfully!",
			ClientData,
		});
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			issue: "An error Occurred!",
			error: error.message,
		});
	}
};

module.exports = {
	getDataSheet,
};
