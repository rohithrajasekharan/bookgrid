const router = require('express').Router();
const Book = require('../models/book-model');
const mongoose = require('mongoose');

router.post('/post', (req, res) => {
  let title = req.body.title;
  let author = req.body.author;
  let completion = req.body.completion;
  let value = req.body.value;
  let rating = req.body.rating;
  let notes = req.body.notes;
  let userid = req.body.userid;
  let thumbnail = req.body.thumbnail;
  let newBook = new Book({
    title:title,
    author: author,
    completion: completion,
    value:value,
    rating: rating,
    notes:notes,
    userid: userid,
    thumbnail: thumbnail
  });
  Book.createBook(newBook, (err, book) => {
    res.send(book);
  });
});


router.get('/post/:id', (req, res) => {
  Book.getBookById(req.params.id, (err,book) => {
    res.json(book);
  });
});
router.post('/update', (req, res) => {
  Book.updateBookById(req.body, (err,book) => {
    res.send(book);
  });
});
router.delete('/post/:id', (req, res) => {
  Book.removeBookById(req.params.id, (err,book) => {
    res.json(book);
  });
});
module.exports = router;
