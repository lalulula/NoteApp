const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Note = require('./models/note');
const User = require('./models/user');

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

app.post('/register', wrapAsync(async function (req, res) {
    const {password, email, name} = req.body;
    const user = new User({email, password, name})
    await user.save();
    req.session.userId = user._id;
    // Note: this is returning the entire user object to demo, which will include the hashed and salted password.
    // In practice, you wouldn't typically do this – a success status would suffice, or perhaps just the user id.
    res.json(user);
}));

app.post('/login', wrapAsync(async function (req, res) {
    const {password, email} = req.body;
    const user = await User.findAndValidate(email, password);
    if (user) {
        req.session.userId = user._id;
        res.sendStatus(204);
    } else {
        res.sendStatus(401);
    }
}));

app.post('/logout', wrapAsync(async function (req, res) {
    req.session.userId = null;
    res.sendStatus(204);
}));

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
        // res.json(session.userId);
    }
    else{
        res.sendStatus(204);
    }
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

// //deleting a user with id
// app.delete('/api/users/:id', async function (req,res){
//     const id = req.params.id;
//     const result = await User.findByIdAndDelete(id);
//     console.log("Deleted successfully: " + result);
//     res.json(result);
// })

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

port = process.env.PORT || 5000;
app.listen(port, () => { console.log('server started on port ', port)});