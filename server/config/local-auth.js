//Authentication setup for email login

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user-model');
//Local Strategy setup

passport.use(
  new LocalStrategy({
    usernameField: 'email',
  },
  function(username, password, done) {
User.getUserByMail(username, function(err, user){
  if(err) throw err;
  if(!user){
    return done(null, false);
  }
  User.comparePassword(password, user.password, function(err,isMatch){
    if(err) throw err;
    if(isMatch){
      return done(null, user);
    }else{
      return done(null, false);
    }
  })
})
  }
));

//store user in the session (can be called from the app as one for all setup)

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  Users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
