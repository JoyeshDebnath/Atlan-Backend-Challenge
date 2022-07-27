const translate = require("@vitalets/google-translate-api");

//controller for converting/translating the slangs ...
//pass the word (in english) and mention the desired language  in which we would like to get the slangs ..

const convertSlangs = async (req, res) => {
	try {
		var word = req.query.word;
		var language = req.query.lang;
		const response = await translate(word, { to: language });
		console.log(response.text);
		var data = {
			status: "Success",
			GivenWord: word,
			SlangLanguage: language,
			ConvertedSlang: response.text,
		};
		// send the response
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({
			status: "Failed",
			Msg: "Something Went Wrong!",
			Error: error,
		});
	}
};

module.exports = {
	convertSlangs,
};
