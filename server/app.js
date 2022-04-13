const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');
const User = require('./models/user');

const app = express();
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
app.use(bodyParser.json());

//Set up mongoose connection BASIC SETUP CODE
// var mongoDB = 'mongodb://localhost:27017/NoteApp'; //database URL
var mongoDB = 'mongodb+srv://YunahKim:yunah123@cluster0.hk7j3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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
    res.json(notes ? notes : []);
}));

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
//deleting a note with id
app.delete('/api/notes/:id', async function (req,res){
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
})
//Updating a note
app.put('/api/notes/:id', async function (req,res) {
    const id = req.params.id;
    const {text, lastUpdatedDate, tags} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await Note.findByIdAndUpdate(id, {text, lastUpdatedDate, tags});
    console.log("Added in server");
    res.sendStatus(204);
})

////////////////////////////////////////////USER///////////////////////////////////////////////////////
//getting user
app.get('/api/users', async function (req,res) {
    const users = await User.find({});
    console.log("users:" , users);
    res.json(users);
});
//getting CURRENT user
app.get('/api/users/currentUser', async function (req,res) {
    const users = await User.find({});
    if(users.length >= 1){
        res.json(users[0]);
    }
    else if(users.length == 0){
        res.json([{Name: "Yunah", Email:"yunah.kim@gmail.com",Theme:"Dark"}])
    }
    else{
        res.sendStatus(204);
    }
});

//Updating a user
app.put('/api/users/:id', async function (req,res) {
    const id = req.params.id;
    const {Name, Email, Theme} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await User.findByIdAndUpdate(id, {Name, Email, Theme},
        {runValidators: true});
    res.sendStatus(204);
})

//creating a new user
app.post('/api/users', async function (req,res) {
    console.log("Posted new user: " + JSON.stringify(req.body));
    try {
        const newUser = new User({
            Name: req.body.Name,
            Email: req.body.Email,
            Theme: req.body.Theme
        })
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400);
        res.send(error.message);
    }
})

//deleting a user with id
app.delete('/api/users/:id', async function (req,res){
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
})

// //getting user with specific id
// app.get('/api/users/:id', async function (req,res) {
//     let id = req.params.id;
//     const user = await User.findById(id);
//     if( user ) {
//         res.json(user);
//     } else {
//         res.send("No user with id: " + id);
//     }
// });

port = process.env.PORT || 5000;
app.listen(port, () => { console.log('server started on port ', port)});