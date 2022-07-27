//imports
const express = require("express");
const connectDB = require("./db/connect");
const CollectRouters = require("./routes/CollectRouter");
// imports
const app = express();

require("dotenv").config();

//middleware ..
app.use(express.json());

//Routes
app.use("/api/v1/collect", CollectRouters);
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
