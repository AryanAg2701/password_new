const express = require('express');
const router = express.Router();

// handle root route
router.get('/', (req, res) => {
  // check if the user is not logged in
  if (!req.session.username) {
    // redirect to login page if so
    res.redirect('/auth/login');
  } else {
    // if user just registered
    if (req.query.registered) {
      req.session.registered = true;
    }
    // home page
    res.sendFile(__dirname + '/public/home.html', {
      username: req.session.username, 
      registered: req.session.registered
    });
  }
});

module.exports = router;
