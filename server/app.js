const express = require('express');
const mongoose = require('mongoose'); //Connecting to MongoDB
const Note = require('./models/note');
const User = require('./models/user');
const Tag = require('./models/tag');


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Set up mongoose connection BASIC SETUP CODE
var mongoDB = 'mongodb://localhost:27017/Note-App'; //database URL here
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;//get default connection
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



port = process.env.PORT || 3000;
app.listen(port, () => { console.log('server started!')});
