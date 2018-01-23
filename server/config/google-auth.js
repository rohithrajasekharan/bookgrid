const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy({
      callbackURL: '/auth/google/redirect',
      clientID: '597194758455-g6u8cs0vn352dn5shr0sfqgo6un07khe.apps.googleusercontent.com' ,
      clientSecret: 'ixF1Xeggm_00Z572Zl5G9qlh'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
          console.log(profile);
            if(currentUser){
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    avatar : profile.photos[0].value,
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);
