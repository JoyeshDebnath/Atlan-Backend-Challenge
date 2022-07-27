//imports
const express = require("express");
const connectDB = require("./db/connect");

// imports
const app = express();

require("dotenv").config();

//middleware ..
app.use(express.json());

//Routes
// app.use("/api/v1/Collect");
const port = process.env.PORT || 8000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log("Connected To DB Succeess");
		app.listen(port, console.log(`Server is listening on PORT: ${port}`));
	} catch (err) {
		console.log(err.message);
	}
};

start();
