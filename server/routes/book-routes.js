const router = require('express').Router();
const Book = require('../models/book-model');
const mongoose = require('mongoose');

router.post('/post', (req, res) => {
  let title = req.body.title;
  let categories = req.body.categories;
  let content = req.body.content;
  let newBook = new Book({
    title:title,
    categories:categories,
    content:content
  });
  Book.createBook(newBook, (err, book) => {
    res.send(book);
  });
});

router.get('/post', (req, res) => {
  Book.find({}, (err,books) => {
    res.json(books);
  });
});

router.get('/post/:id', (req, res) => {
  Book.getBookById(req.params.id, (err,book) => {
    res.json(book);
  });
});
router.delete('/post/:id', (req, res) => {
  Book.removeBookById(req.params.id, (err,book) => {
    res.json(book);
  });
});
module.exports = router;
