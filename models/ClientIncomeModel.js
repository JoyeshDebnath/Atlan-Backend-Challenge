const mongoose = require("mongoose");
const validator = require("validator");
//model for Client Income Details ..
const clientIncomeSchema = new mongoose.Schema({
	clientName: {
		type: String,
		required: [true, "Please Provide the Client name!"],
		maxLength: [50, "Name has to be within 50 chharacters!"],
		minLength: [3, "Name has to be greater than 3 characters !"],
	},
	clientEmail: {
		type: String,
		required: [true, "Please Provide the Client Email!"],
		minLength: [5, "mail has to be greater than 5 characters"],
		maxLength: [70, "mail cannot be greater than 25 characters "],
		unique: [true, "Email already Exists!Pick Another One!"],
		validate: [validator.isEmail, "Please Enter a Valid Email!"],
	},
	clientIncomePerMonth: {
		type: Number,
		default: 0,
		required: [true, "Please Enter the Client Income(Per annum)!"],
	},
	clientSavingsPerMonth: {
		type: Number,
		default: 0,
		required: [true, "Please Enter the Clinet Savings Per annum"],
	},
	clientMobileNum: {
		type: Number,
		required: [true, "Please Provide the Client Phone number!"],
		unique: [true, "Phone number Already taken!"],
	},
	clientAddress: {
		street: {
			type: String,
			required: [true, "Please provide the street "],
		},
		city: {
			type: String,
			required: [true, "Please provide the city !"],
		},
		state: {
			type: String,
			required: [true, "Please provide the state !"],
		},
		country: {
			type: String,
			required: [true, "Please provide the country !"],
		},
		pinCode: {
			type: Number,
			required: [true, "Please provide the address Pin !"],
		},
	},
});

// clientIncomeSchema.path("clientMobileNum").validate(function validatePhone() {
// 	return this.clientMobileNum > 999999999;
// });

module.exports = mongoose.model("Clients", clientIncomeSchema);
