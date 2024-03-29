const express = require('express');
let axios = require('axios');
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json());

let SEC_TOKEN = '';
let PORT = 5000;

app.use('/',(req,res)=>{
	axios.get('http://localhost:5001/chat',{
		params : {
			question : req.body.question,
			sec_token : SEC_TOKEN
		}
	}).then(function(response) {
		console.log(response);
		if(String(response.data.response).includes("CLS")) {
			return res.status(200).json({response:"I'm sorry, I did not understand that query. Please try rephrasing it."});
		}
		return res.status(200).send(response.data);
	}).catch(function(err) {
		console.log(err);
		return res.status(500).json({message : "Internal Server Error"});
	});
});

app.listen(PORT,()=>{
	SEC_TOKEN = process.argv[2];
	console.log("BERT-API-NODE-SCRIPT Initialized");
	console.log("App Listening @ https://localhost:" + PORT);
});