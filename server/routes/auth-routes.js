//Routes modularized for authentication calls(prepend /auth)
const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user-model');
const Book = require('../models/book-model');

//save user details from the body of the request
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
//get user by objectid of mogodb
router.get('/user/:id', (req, res) => {
  User.getUserByMail(req.params.id, (err, user) => {
    res.send(user);
  })
})
//initial call without authentication code
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));
//redirect to the url specified with auth code
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

//initial call without authentication code
router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

//redirect to the url specified with auth code
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/');
});

//route to check if user is authenticated
router.get('/user', (req,res) => {
  res.send(req.user)
});
//handle login
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.send(req.user);
    });
//handle logout
router.get('/logout',(req,res) => {
  req.logout();
  res.send(req.user)
}
    );
//get all books of a particular user 
router.get('/books', (req, res) => {
  Book.find({userid: req.user._id}, (err, books) => {
    res.json(books);
  })
})

module.exports = router;
