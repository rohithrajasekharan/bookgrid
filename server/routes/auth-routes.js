const router = require('express').Router();
const Book = require('../models/book-model');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user-model');
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
    res.send(user);
  });
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('You reached callback');
});

router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

	router.get('/facebook/redirect', 
	  passport.authenticate('facebook', { successRedirect: '/profile',
failureRedirect: '/' }));

module.exports = router;
