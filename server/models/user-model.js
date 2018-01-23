var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

	// User Schema
var UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		sparse: true
	},
  password: {
		type: String
	},
  googleId: {
    type: String
  },
	facebookId: {
    type: String
  },
	avatar: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByMail = function(email, callback) {
  var query = {email: email};
  User.findOne(query, callback);
}
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}
module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
}
