const express = require('express');
const router = new express.Router();
const {Book, validateBook} = require('../models/books');

//POST: Create a new book
router.post('/api/books',async (req, res) => {
    const error = await validateBook(req.body);
    if(error.message) res.status(400).send(error.message);
    book = new Book({
        name:req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    });

    book
    .save().then(book => {
        res.send(book);
    })
    .catch((error) => {
        res.status(500).send("Book was not stored in db");
    });
});

//Get all books
router.get('/api/books', (req, res) => {
    Book.find().then((books) => res.send(books)).catch((error) => {
        res.status(500).send("something went wrong");
    });
});

//get a book by ID
router.get('/api/books/:bookId', async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    if(book) res.send(book);
    res.status(404).send("Book not found");
});

//modify the perticular book
router.put('/api/books/:bookId', async (req, res) => {
    const updatebook = await Book.findByIdAndUpdate(req.params.bookId, {
        name: req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    },
    {new:true});

    if(updatebook) res.send(updatebook);
    res.status(404).send("Book not found");
});

//delete a book base on id
router.delete('/api/books/:bookId', async (req, res) => {
    const deletebook = await Book.findByIdAndRemove(req.params.bookId);
    if(deletebook) res.send(deletebook);
    res.status(404).send("Book not found");
});

module.exports = router;

