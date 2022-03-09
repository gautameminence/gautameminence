const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  address: {
    type: String,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const users = mongoose.model("user", userSchema);

module.exports = users;
