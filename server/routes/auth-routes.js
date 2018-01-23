const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user-model');
const Book = require('../models/book-model');

router.post('/register', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let newUser = new User({
    name: name,
    email: email,
    password: password
  });
  User.createUser(newUser, (err, user) => {
    passport.authenticate('local')(req, res, function () {
                res.send(user);
            })
  });
});
router.get('/user/:id', (req, res) => {
  User.getUserByMail(req.params.id, (err, user) => {
    res.send(user);
  })
})

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});


router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/');
});


router.get('/user', (req,res) => {
  res.send(req.user)
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.send(req.user);
    });

router.get('/logout',(req,res) => {
  req.logout();
  res.send(req.user)
}
    );

router.get('/books', (req, res) => {
  Book.find({userid: req.user._id}, (err, books) => {
    res.json(books);
  })
})

module.exports = router;
