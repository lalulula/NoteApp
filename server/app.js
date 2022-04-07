const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Set up mongoose connection BASIC SETUP CODE
var mongoDB = 'mongodb://localhost:27017/NoteApp'; // insert your database URL here
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


port = process.env.PORT || 6000;
app.listen(port, () => { console.log('Server started! Server running on port',port)});