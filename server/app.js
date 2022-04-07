const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Set up mongoose connection BASIC SETUP CODE
var mongoDB = 'mongodb://localhost:27017/LibraryExample'; // insert your database URL here
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Using an async function to be able to use the "await" functionality below, which makes
// the find command run synchronously.
app.get('/api/authors', async function (req,res) {
    const authors = await Author.find({});
    // An example using select to only retrieve specific fields when finding authors. Remember, you want to avoid
    // returning unnecessary information.
    // const authors = await Author.find({}).select("family_name date_of_birth");
    res.json(authors);
});

app.get('/api/authors/:id', async function (req,res) {
    let id = req.params.id;
    const author = await Author.findById(id);
    if( author ) {
        res.json(author);
    } else {
        res.send("No author with id: " + id);
    }
});


app.post('/api/authors', async function (req,res) {
    console.log("Posted with body: " + JSON.stringify(req.body));

    try {
        const newAuthor = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        })
        await newAuthor.save();
        res.json(newAuthor);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400);
        res.send(error.message);
    }
})

app.get('/api/books', async function (req,res) {
    // Try changing this to filter based on a title, such as:   {title: /The Kingkiller Chronicle/i }
    // See Mongoose documents: https://mongoosejs.com/docs/queries.html for more information
    // const books = await Book.find({});
    const books = await Book.find({title: /The Kingkiller Chronicle/i});
    // const books = await Book.find({}).populate('author'); //author 내용을 다 보여줌
    res.json(books);
});

app.get('/api/bookinstances', async function (req,res) {
    // Notice here that this will not only fetch the book instances, but also the book they reference.
    const bookInstances = await BookInstance.find().populate('book')

    // If we wanted to only fetch some properties of the book instance (since sending unnecessary data is expensive),
    // you can also select what fields to populate. Uncomment this code to see how it works.
    // const bookInstances = await BookInstance.find().populate('book', "title isbn");

    res.json(bookInstances);
});

port = process.env.PORT || 3000;
app.listen(port, () => { console.log('server started!')});