const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-model');
passport.use(
  new LocalStrategy(
  function(email, password, done) {
User.getUserByMail(email, function(err, user){
  if(err) throw err;
  if(!user){
    return done(null, false,  {message:'unknown User'});
  }
  User.comparePassword(password, user.password, function(err,isMatch){
    if(err) throw err;
    if(isMatch){
      return done(null, user);
    }else{
      return done(null, false, {message: 'Invalid password'});
    }
  })
})
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
