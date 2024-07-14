const mongoose = require('mongoose');

// define a schema user with username and password
const schema = new mongoose.Schema({
  username: String,
  password: String
});

// create model from schema
const User = mongoose.model('User', schema);

// export model
module.exports = User;
