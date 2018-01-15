const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book-routes');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books', bookRoutes);

mongoose.connect('mongodb://rohithrajasekharan:4242@ds245687.mlab.com:45687/bookgrid', {
  useMongoClient: true
}, () => {
    console.log("connected to db");
});

app.listen(8080, () => {
  console.log('app listening on port 8080');
})
