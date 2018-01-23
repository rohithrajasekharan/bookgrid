var mongoose = require('mongoose');

	// Book Schema
var BookSchema = mongoose.Schema({
	title: {
		type: String
	},
	author: {
		type: String
	},
	value: {
		type: Number
	},
	rating: {
		type: Number
	},
	completion: {
		type: Number
	},
	notes: {
		type: String
	},
	userid: {
		type: String
	},
	thumbnail: {
		type: String
	}
	//thumbnail only for books from google books api
});

const Book = module.exports = mongoose.model('Book',BookSchema);

//save book to the database
module.exports.createBook = (newBook, callback) => {
	        newBook.save(callback);
	}

//find book using the id given by mongodb
module.exports.getBookById = (id, callback) => {
  Book.findById(id, callback);
}

//delete book by id from the query
module.exports.removeBookById = (id, callback) => {
  Book.findByIdAndRemove(id, callback);
}

//update book details bookid(called after finding user id)
module.exports.updateBookById =  (data, callback) => {
	Book.findById(data.id, function (err, book) {
    book.title = data.values.title;
    book.author = data.values.author;
		book.value = data.values.value;
		book.completion = data.values.completion;
		book.rating = data.values.rating;
		book.notes = data.values.notes;
    book.save(callback);
});
}
