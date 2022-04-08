const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Set up mongoose connection BASIC SETUP CODE
var mongoDB = 'mongodb://localhost:27017/NoteApp'; //database URL
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}
///////////////////////////////////////////Notes////////////////////////////////////////////////////
//getting notes
app.get('/api/notes', wrapAsync(async function (req,res) {
    const notes = await Note.find({});
    console.log("notes:" , notes);
    res.json(notes);
}));
//getting notes with specific id
app.get('/api/notes/:id', async function (req,res) {
    let id = req.params.id; 
    const note = await Note.findById(id);
    if( note ) {
        res.json(note);
    } else {
        res.send("No note with id: " + id);
    }
});

//creating a new note
app.post('/api/notes', wrapAsync(async function (req,res) {
    console.log("Posted new note: " + JSON.stringify(req.body));
        const newNote = new Note({
            text: req.body.text,
            lastUpdatedDate: req.body.lastUpdatedDate,
            tags: req.body.tags
        })
        await newNote.save();
        res.json(newNote);
}))
//Updating a note
app.put('/api/notes/:id', async function (req,res) {
    const id = req.params.id;
    const {text, lastUpdatedDate, tags} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await User.findByIdAndUpdate(id, {text, lastUpdatedDate, tags},
        {runValidators: true});
    res.sendStatus(204);
})
//deleting a note with id
app.delete('/api/notes/:id', async function (req,res){
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
})
////////////////////////////////////////////USER///////////////////////////////////////////////////////
//getting user
app.get('/api/users', async function (req,res) {
    const user = await User.find({});
    res.json(user);
});
//getting user with specific id
app.get('/api/users/:id', async function (req,res) {
    let id = req.params.id;
    const user = await User.findById(id);
    if( user ) {
        res.json(user);
    } else {
        res.send("No user with id: " + id);
    }
});

//creating a new user
app.post('/api/users', async function (req,res) {
    console.log("Posted new user: " + JSON.stringify(req.body));

    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            theme: req.body.theme
        })
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400);
        res.send(error.message);
    }
})
//Updating a user
app.put('/api/users/:id', async function (req,res) {
    const id = req.params.id;
    const {name, email, theme} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await User.findByIdAndUpdate(id, {name, email, theme},
        {runValidators: true});
    res.sendStatus(204);
})
//deleting a user with id
app.delete('/api/users/:id', async function (req,res){
    const id = req.params.id;
    const result = await Author.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
})

port = process.env.PORT || 5000;
app.listen(port, () => { console.log('server started on port ', port)});