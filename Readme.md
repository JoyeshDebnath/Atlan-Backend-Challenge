
![ATLAN BACKEND CHALLENGE](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTidJNX83xsuPK0IgiMcAengqR7GkHOj94nsv2_jA6uKQ&s)


# Atlan Backend Challenge🚀

In this Doc I am going to share all the approaches and solutions as well as thought process I came across while solving this challenge . Lets begin ..☀

```I have provided all the hosted api routes/endpoints of each tasks in the respective task sections of the doc```

## Table Of Contents

 - [Folder Structure](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Installation Guide](https://github.com/matiassingers/awesome-readme)
 - [Task1 ](#Task-1)
-  [Task 2](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Task 3](https://github.com/matiassingers/awesome-readme)
 - [Task 4](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
-  [Tech Stack](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
-  [Dockerising](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
-  [Deployment Gide](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
-  [Dependencies](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
-  [Scalability And Performance Management](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)



## Installation Guide

Clone This repo and follow the commands 

```bash
  npm install 
  npm start
  run the application locally using npm start
```


    
## 📝 Task 1 

> Problem Statement : 
⦁ ```One of our clients wanted to search for slangs (in local language) for an answer to a text question on the basis of cities (which was the answer to a different MCQ question)```

```After analysing the statement I am assuming that I have to build a middleware or controller to take a word and convert it into a local slang (local language)```
 To solve this I have  came across two approches.. 

### 📢Approach 1 (Collection based ) 

- Build a Collection of Words having all the words in english (like a dictionary ) 

- Build subsequent collections of dictionaries in other languages (Slangs )
- We will map the words and slangs with the help of reference ID of slangs 
I tried to give a illustration of the thought process below . 

```Note : To create such type of Database the number of records could be very high and hence throughput will not be as required.```


![task1 SS of db base dapproach ]()

### 📢Approach 2 (3rd Party API based ) 

- I have used [Google translate api](https://www.npmjs.com/package/google-translate-api) in this approach.

- I have designed the route in a way that user  will have to provide the word (The word to be converted ) and the language of the slang in query string

The Code of the approach is illustrated below ..👇


```js
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

```
#### 💻API reference for Task 1(Convert slangs )
`REQUEST TYPE: GET`

Endpoint:
```http
  https://dry-taiga-43481.herokuapp.com/api/v1/collect/convertslang?word={enter the word here}&lang={enter the language code here}
```

| Query Strings | Description                |
| :-------- | :------------------------- |
| `word` | the word you want to convert  |
| `lang` |  the language in which you want to convert the word |

```for lang query we need to provide the codes like es fro Espaniol , nl for Danish etc Please refer the API doc link provided above for codes  ```
### 🎯Task 1 result and outputs 


_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

## 🔗Task 2 👓 

> Problem Statement : 
⦁ ```	A market research agency wanted to validate responses coming in against a set of business rules (eg. monthly savings cannot be more than monthly income) and send the response back to the data collector to fix it when the rules generate a flag ```

>>```After analysing the statement I am assuming that I have to build a  middleware/ controller to take data response from the client and then validate the details provided such as income , email etc and send the appropriate response to Collect to perform business logic. ```
 
 To solve this I have  came across the following  approch.. 

### 🔗Approach ( Validation of Model,etc) 

I have handled this testcase in a two step process as described below..

-  Firstly I have creted a ClientInfo model for our clients having all the neccessary fields .

- while creating the Client Schema I have set up few rules which will help in the validation at entry point. For example I have set up Email validation and other validation like phone number and email ids cant be duplicate etc ..  
- In second step while Sending the Post request I have setup validation for Income (ie monthly savings cant exceed monthly income), mobile number validation (ie it has to be valid 10 length number) etc. 
- I have used try catch blocks to handle the errors occurring during validation so that correct response is sent to the Collect totake neccessary actions .
- I will be fetching the data of the new client from the request body and running through the validations . Depending upon the validation result  required information will be sent to the Collect .  
#### 🎯Below is the Screenshot of my Schema model 
![task2 SS of client model code]()
#### 🎯Below is the Screenshot of the  client Model having data of all validated clients in Collect 

![task2 ss of the client model ]()

#### 💻Below is the Code of validation middleware ..



```js
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
				message: "Client monthly Savings Exceeds Client Monthly Income!",
			});
		}
		// Phone number Validation
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
		// send response
		res.status(201).json({
			status: "Success",
			message: "Client  successfully created!",
			newClient,
		});
	} catch (error) {
		// validation error handling
		if (error.name === "ValidationError") {
			return res.status(500).json({
				status: "Failed",
				message: "Something Went Wrong!",
				issue: Object.values(error.errors).map((val) => val.message),
			});
		} else {
			// other error handling (such as duplicate inputs ..)
			return res.status(500).json({
				status: "Failed",
				message:
					"Something Went Wrong!(Either Email Or Mobile number is duplicate !)",
				issue: error.message,
			});
		}
	}
};
```

#### 🖥API reference for Task 2( Client validation  )

`REQUEST TYPE: POST`

Endpoint:
```http
    https://dry-taiga-43481.herokuapp.com/api/v1/collect/validatenewclient
```
| Request body| Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `clientName`      | `string` | **Required**.Name of the client  |
| `clientEmail`      | `string` | **Required**. Email id of the client |
| `clientMobileNum`      | `Number` | **Required**. Phone number of the client |
| `clientIncomePerMonth`      | `Number` | **Required**. Income Per month |
| `clientSavingsPerMonth`      | `Number` | **Required**. Savings per month  |
| `clientAddress`      | `Object` | **Required**. Address details of the client having the nested fields `city`, `street` , `country` , `pin` |




### 📝Task 2 result and DEMO 🎞

![task2 video of the  working  of validation  ]()

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


## 🔗Task 3   

> Problem Statement : 

⦁	```A very common need for organizations is wanting all their data onto Google Sheets, wherein they could connect their CRM, and also generate graphs and charts offered by Sheets out of the box. In such cases, each response to the form becomes a row in the sheet, and questions in the form become columns```

```After analysing the statement I am assuming that I have to build a middleware or controller to utilise the  data of the clients recieved in task2 and export in a sheet /csv etc so that in future it can be utilized by the Atlan team for data analysis or displaying graphs , insights etc . ```
 To solve this I have  came across two approches.. 

### Approach 
The approach I used to solve this particular problem statement is discussed below: 

- First of all I  had to access / read all the data from the Client model i used in task  2  

- I have used a npm package named `csv-writer` to write data in a local csv file 
- I read the data from the model created local csv file and created rows heading  in csv file  using the collections keys.And the records of the csv file are the values of the keys . 


![ss of the csv file  ]()

 

The Code of the approach is illustrated below ..👇


```js
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


```
#### 🖥 API reference for Task 3(getting data on csv)
`REQUEST TYPE: GET`

Endpoint:
```http
  https://dry-taiga-43481.herokuapp.com/api/v1/collect/getcsv
```




### 🎯Task 3 result and Demo 

![task3 video of the  working  of validation  ]()
![task3 image of the  working  of postman and csv file   ]()



_________________________________________________________________________________________________________


## 🔗Task 4 

> Problem Statement : 
⦁ ```⦁	A recent client partner wanted us to send an SMS to the customer whose details are collected in the response as soon as the ingestion was complete reliably. The content of the SMS consists of details of the customer, which were a part of the answers in the response. This customer was supposed to use this as a “receipt” for them having participated in the exercise.```

>>```After analysing the statement I am assuming that I have to build a  middleware/ controller  to send  customer reciept via sms to his number  after he is successfully registered in our system. The content of the sms will contain his details and information  which he filled up during registering ..```
 
 To solve this I have  came across the following  approch.. 

### 🎯Approach  

I have handled this testcase in ystematic  process as described below..

-  Firstly  I accepted the  user ID of the Customer (which I am assuming will be provided while sending request to the backend  ) passed through request params 

- I have used [Twilio ](https://www.npmjs.com/package/twilio) package for creating client object and sending sms to the client (sms having all his details ) fetched from the database .
- The phone number Of the reciepent I extract from the Databse .
- I have also put some validations , such as if the ID requested is valid or not etc . to make it error safe.   
  
###  🕹Below is the reference to the middleware Code I wrote for Handling the task 3 👇
```js
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

```

#### 💻API reference for Task 4( sending SMS  )

`REQUEST TYPE: POST`

🔗Endpoint:
```http
    https://dry-taiga-43481.herokuapp.com/api/v1/collect/sendsms/{USER ID}
```
| PARAMS| Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `USER ID`      | `OBJECT ID` | **Required**.ID of the validated customer . the fetched data will help to send sms to his number   |

 ```📢NOTE: I have used the free version of twilio so task 4 is valid for a few numbers only for the free service .  So there are a few sets of numbers which can be tested against One Such number of testing purpose is 8584979439```

  ```If you want to test against your number then you need to create account in twilio and register your number providing your SSR key and password 👲```





### 🖥Task 4 result and DEMO 

![task4 video of the  working  of validation ie postman  ]()
![task4 screenshot of the sent sms  ]()



## 🔗Tech Stacks
 
>-  ```NODE JS```
>- ```EXPRESS JS```
>-  ```MONGO DB```
>-  ```MONGOOSE```
>-  ```DOCKER``` 

## 🎯Dependencies

>- ```@vitalets/google-translate-api": "^8.0.0```
>- ```csv-writer": "^1.6.0```
>-	```dotenv": "^16.0.1```
>-	```express": "^4.18.1```
>- ```express-async-errors": "^3.1.1```
>- ```mongoose": "^6.5.0```
>- ```nodemon": "^2.0.19```
>- ```twilio": "^3.80.0```
>- ```validator": "^13.7.0```

## 🎯Dockerising 

```If we  develop anything that needs to ‘live’ somewhere besides our local machine, we know that getting an application up and running on a different machine is no simple task``` 
```There are countless considerations to be had, from the very basics of “how do I get my environment variables set” to which runtimes I’ll need and which dependencies those will rely on, not to mention the need to automate the process. It’s simply not feasible for software teams to rely on a manual deploy process anymore.```

```A number of technologies have sought to solve this problem of differing environments, automation, and deployment configuration, but the most well-known and perhaps most notable attempt in recent years is Docker.```

I have also dockerised This application and below are the process how I achieved it . 👇
>- To dockerize  this project run

```bash
  docker compose up --build

```
### Docker Demo


## 🚁 Dployment 

```I have deployed this project on heroku . The live links of each indivual tasks are provided in their respective sections above ```


>- To Deploy  the  project run the command s serially 

```bash

  heroku login -i
  heroku container:login
  heroku create
  docker build -t registry.heroku.com/dry-taiga-43481/web .
  docker push registry.heroku.com/dry-taiga-43481/web
  heroku container:release web -a guarded-tundra-84415
  heroku container:release web -a dry-taiga-43481 
  heroku open -a dry-taiga-43481 

```


## 🧷Scalability And Performance Management 

While working on this challenge I have paid special attention to make this application error safe ie 
the application should not hang or break if something goes wrong !
I achieved it by following try catch blocks , writing the error handling codes in catch blocks . 
Also I have tried to tackle  this issue  with the help of Async error handling middlewares I have used in my project . 

```I have used Mongodb as a database which does play a very important role in increasing the performance of this application . the reason is dicussed below:```

>- Schema less − MongoDB is a document database in which one collection holds different documents. Number of fields, content and size of the document can differ from one document to another
>- Uses internal memory for storing the (windowed) working set, enabling faster access of data.
>- Auto-Sharding

```Further I have used Dockerised the application . The advantages are discussed below :```
>- Consistency is a key benefit of Docker wherein developers run an application in a consistent environment right from design and development to production and maintenance.
>- Speed and agility is another key benefit of Docker. It allows you to instantly create containers for every process and deploy them in seconds.
>- Efficiently Management of Multi-Cloud Environments
>- Docker environments are highly secure. 

## Created with ❤ by

- [@Joyesh](https://github.com/JoyeshDebnath)


## Thank you Team Atlan For checking out my Project ❤❤