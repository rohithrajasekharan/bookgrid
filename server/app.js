
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bookRoutes = require('./routes/book-routes');
const authRoutes = require('./routes/auth-routes');
const googleAuth = require('./config/google-auth');
const facebookAuth = require('./config/facebook-auth');
const localAuth = require('./config/local-auth');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080;
var config = require('./config');

app.use(cors());//cross-origin data sharing(b/w domains or here ports)
app.use(cookieParser());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.keys]
}));//store cookies to determine browser sessions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//extract and attach on reqest
//oauth session
app.use(passport.initialize());
app.use(passport.session());

//routes we defined and prepend a default route
app.use('/books', bookRoutes);
app.use('/auth', authRoutes);

//since mongoose promise is depracated
mongoose.Promise = global.Promise;

mongoose.connect(config.dbUrl, {
  useMongoClient: true
}, () => {
    console.log("connected to db");
});//connect app to db

app.listen(PORT, () => {
  console.log('app listening on port 8080');
})//serve app on PORT
