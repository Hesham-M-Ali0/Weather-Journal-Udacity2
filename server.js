// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require bodyParser
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;
const server = app.listen(port, listening)

// Callback to debug
function listening(){
    console.log("server is running");
    console.log(`Server running on port ${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendProjectData);

// Callback function to complete GET '/all'
function sendProjectData(req,res){
    res.send(projectData);
}

// Post Route
app.post('/addData', callBack);

function callBack(req,res){
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feelings = req.body.content;
    console.log(projectData);
}