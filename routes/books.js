const express = require('express');
const router = new express.Router();
const Book = require('../models/books');

//POST: Create a new book
router.post('/api/books',(req, res) => {
    console.log('xyz', req.body);
    book = new Book({
        name:req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge0
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

module.exports = router;

