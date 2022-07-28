const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const ClientInfo = require("../models/ClientIncomeModel");
// const client = require("twilio")(accountSid, authToken);
const SendSMStoCustomer = async (req, res) => {
	try {
		//accept the customer id from params
		const { id: UserId } = req.params;
		//serach in db for the customer..
		const reqClient = await ClientInfo.findOne({ _id: UserId });
		console.log("My data,", reqClient);
		// if the customer could not be found .
		if (!reqClient) {
			return res.status(404).json({
				status: "Failed",
				response: "The user with given ID does not exists!",
			});
		} else {
			//if the customer was found then the receipt in form of sms
			const client = new twilio(accountSid, authToken);
			var Customer_Reciept = ` Your Details :\n 
        email id :${reqClient.clientEmail}\n 
        name : ${reqClient.clientName}\n 
        Income per Month: ${reqClient.clientIncomePerMonth}\n
        Savings per Month: ${reqClient.clientSavingsPerMonth}\n
        contact Number : ${reqClient.clientMobileNum}\n
        Thanks for your response !Have a nice day!`;
			await client.messages.create({
				body: Customer_Reciept,
				to: `+${91}${reqClient.clientMobileNum}`,
				from: "+19897189499",
			});

			res.status(200).json({
				status: "Success",
				message: "Message Sent Successfully!",
			});
		}
	} catch (error) {
		return res.status(500).json({
			status: "Failed!",
			message: "Something Went Wrong!",
			issue: error.message,
		});
	}
};

module.exports = {
	SendSMStoCustomer,
};
