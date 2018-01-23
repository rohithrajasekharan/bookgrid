
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user-model');


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


passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  Users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
