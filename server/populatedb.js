#! /usr/bin/env node
console.log('This script populates some texts and a user. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Note = require('./models/note');
var User = require('./models/user');



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var notes = [];
var users = [];



function createNote(text, tag, cb) {
  newNote = {text:text, tag:tag };
  newNote.lastUpdatedDate = (new Date().now()).toString();
  
  var note = new Note(newNote);
       
note.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Note: ' + note);
    notes.push(note)
    cb(null, note)
  }  );
}


function createNotes(cb) {
    async.series([
        function(callback) {
          createNote("CSE316",[], callback);
        },
        function(callback) {
          createNote("This is a note with a long line of text. Notice that the text will automatically wrap to the next line once it reaches the right side of the screen.",['Hi'], callback);
        },
    ],
        // optional callback
        cb);
}


async.series([
    createNotes
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Notes: '+notes);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




