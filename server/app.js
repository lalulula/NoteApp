const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Note = require('./models/note');
const User = require('./models/user');
const {isLoggedIn, isAgent} = require('./middleware/auth');

const app = express();
const bodyParser = require('body-parser');
// const { ObjectId } = require('mongodb');
app.use(bodyParser.json());

const sessionSecret = 'make a secret string'; //used fot encrypting data

//Set up mongoose connection BASIC SETUP CODE
// var mongoDB = 'mongodb://localhost:27017/NoteApp'; //database URL
var mongoDB = 'mongodb+srv://YunahKim:yunah123@cluster0.hk7j3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const store = MongoStore.create({
    mongoUrl: mongoDB,
    secreet: sessionSecret,
    touchAfter: 24 * 60 * 60
})
// mongoose.set('useFindAndModify', false);

// Setup to use the express-session package
const sessionConfig = {
    store,
    name: 'session',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
        // later you would want to add: 'secure: true' once your website is hosted on HTTPS.
    }
}
app.use(session(sessionConfig));

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}
///////////////////////////////////////////For (Login/out)Sessions//////////////////////////////////////////////
// This is middleware that will run before every request
app.use((req, res, next) => {
    // We can set variables on the request, which we can then access in a future method
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    // Calling next() makes it go to the next function that will handle the request
    next();
});

app.post('/api/register', wrapAsync(async function (req, res) {
    const {password, Email, Name} = req.body;
    const user = new User({Email, password, Name})
    await user.save();
    req.session.userId = user._id;
    // console.log("session", req.session);
    res.json(user);
}));

app.post('/api/login', wrapAsync(async function (req, res) {
    const {password, Email} = req.body;
    const user = await User.findAndValidate(Email, password);
    if (user) {
        req.session.userId = user._id;
        // res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
    res.json(user);
}));

app.post('/api/logout', wrapAsync(async function (req, res) {
    req.session.userId = null;
    console.log("session.userId", req.session.userId);
    res.sendStatus(204);
}));

///////////////////////////////////////////Notes////////////////////////////////////////////////////
//getting notes
app.get('/api/notes',  wrapAsync(async function (req,res) {
    const notes = await Note.find({agent:req.session.userId});
    // console.log("notes:" , notes);
    res.json(notes ? notes : []);
}));

//creating a new note
app.post('/api/notes', isLoggedIn,  wrapAsync(async function (req,res) {
    console.log("Posted new note: " + JSON.stringify(req.body));
        const newNote = new Note({
            text: req.body.text,
            lastUpdatedDate: req.body.lastUpdatedDate,
            tags: req.body.tags,
            agent: req.session.userId
        })
        await newNote.save();
        res.json(newNote);
}))
//deleting a note with id
app.delete('/api/notes/:id',isLoggedIn,  async function (req,res){
    const id = req.params.id;
    const result = await Note.findByIdAndDelete(id);
    console.log("Deleted successfully: " + result);
    res.json(result);
})
//Updating a note
app.put('/api/notes/:id',isLoggedIn,  async function (req,res) {
    const id = req.params.id;
    const {text, lastUpdatedDate, tags, agent} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await Note.findByIdAndUpdate(id, {text, lastUpdatedDate, tags, agent});
    console.log("Added in server");
    res.sendStatus(204);
})

////////////////////////////////////////////USER///////////////////////////////////////////////////////
//getting user
app.get('/api/users', async function (req,res) {
    const users = await User.find({});
    // console.log("users:" , users);
    res.json(users);
});
//getting CURRENT user
app.get('/api/users/currentUser', async function (req,res) {
    const user = await User.findById(req.session.userId);
    res.json(user);
    // console.log('userId in session', req.session.userId);
    // console.log("founddUser", user);
    // if(user){
    //     res.json(user);
    // }
    // else{
    //     res.sendStatus(204);
    // }
});

//Updating a user
app.put('/api/users/:id', async function (req,res) {
    const id = req.params.id;
    const {Name, Email, Theme, profile_url} = req.body;
    console.log("PUT with id: " + id + ", body: " + JSON.stringify(req.body));
    await User.findByIdAndUpdate(id, {Name, Email, Theme, profile_url},
        {runValidators: true});
    res.sendStatus(204);
})

// This part is a temporary place to store the uploaded files
// In actual development we would not store it on the local server
const upload = multer({ dest: 'uploads/'})
app.post('/api/users/:id/file', upload.single('image'), wrapAsync(async function (req, res) {
    // You can see the file details here – it also gets automatically saved into the uploads folder
    // Again, this is an example of how this works but you would do something a little different in production.
    console.log("File uploaded of length: " + req.file.size);
    console.dir(req.file);
    res.json("File uploaded successfully");
}));

app.use((err, req, res, next) => {
    console.log("Error handling called");
    res.statusMessage = err.message;

    if (err.name === 'ValidationError') {
        res.status(400).end();
    } else {
        res.status(500).end();
    }
})

port = process.env.PORT || 5000;
app.listen(port, () => { console.log('server started on port ', port)});