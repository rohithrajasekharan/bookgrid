var mongoose = require('mongoose');

	// Book Schema
var BookSchema = mongoose.Schema({
	title: {
		type: String
	},
	categories: {
		type: String
	},
	content: {
		type: String
	}
});

var Book = module.exports = mongoose.model('Book', BookSchema);

//save book to the database
module.exports.createBook = (newUser, callback) => {
	        newUser.save(callback);
	}

//find book using the id given by mongodb
module.exports.getBookById = (id, callback) => {
  Book.findById(id, callback);
}

//delete book by id from the query
module.exports.removeBookById = (id, callback) => {
  Book.findByIdAndRemove(id, callback);
}
