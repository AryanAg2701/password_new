const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');

// mongo connect
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// pass url bodies
app.use(express.urlencoded({ extended: true }));

// handling static files in public
app.use(express.static('public'));

// setup session
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));

// import routes
const authroute = require('./routes/auth');
const homeroute = require('./routes/home');

// use the auth routes for auth
app.use('/auth', authroute);

// use the home routes for 'home
app.use('/home', homeroute);

// PORT
app.listen(3000, () => {
  console.log('http://localhost:3000');
});
