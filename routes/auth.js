const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// registration page
router.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

// handle registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  // if the user already exists
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.error('Error finding user:', err);
      res.status(500).send('Error registering user');
    } else if (user) {
      // if user already exists alert
      res.send('<script>alert("Account already in use!"); window.location.href = "/auth/register";</script>');
    } else {
      // hash password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Error registering user');
        } else {
          // create a new user
          const newUser = new User({ username, password: hash });
          newUser.save((err) => {
            if (err) {
              console.error('Error saving user:', err);
              res.status(500).send('Error registering user');
            } else {
              // set session and redirect to home
              req.session.username = username;
              res.redirect('/home');
            }
          });
        }
      });
    }
  });
});

//  login page
router.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// handle login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  //if the user exists
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.error('Error finding user:', err);
      res.status(500).send('Error logging in');
    } else if (!user) {
      // alert if user does not exist
      res.send('<script>alert("Username not found. Please register yourself!"); window.location.href = "/auth/register";</script>');
    } else {
      // compare password and stored password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).send('Error logging in');
        } else if (!result) {
          // alert if not match
          res.send('<script>alert("Wrong credentials!"); window.location.href = "/auth/login";</script>');
        } else {
          // set session and redirect to home
          req.session.username = username;
          res.redirect('/home');
        }
      });
    }
  });
});

// user logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).send('Error logging out');
    } else {
      res.redirect('/auth/login');
    }
  });
});

module.exports = router;
