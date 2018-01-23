//Authentication setup for facebook
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user-model');
var config = require('../config');

//store user in the session (can be called from the app as one for all setup)
passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
});
//Facebook Strategy setup
passport.use(new FacebookStrategy({
	    clientID: config.fbclientID,
	    clientSecret: config.fbclientSecret,
	    callbackURL: '/auth/facebook/redirect'
	  },
	  (accessToken, refreshToken, profile, done) => {
	    	process.nextTick(() => {
	    		User.findOne({'facebookId': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				let newUser = new User();
	    				newUser.facebookId = profile.id;
	    				newUser.name = profile.displayName;
	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
                  else {
                    console.log(newUser);
                  }
	    					return done(null, newUser);
	    				})
	    			}
	    		});
	    	});
	    }

	));
