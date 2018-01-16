const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user-model');

passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
});

passport.use(new FacebookStrategy({
	    clientID: '863101123864257',
	    clientSecret: 'dd71afcd9cb72a2589e78316fe690ef5',
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
