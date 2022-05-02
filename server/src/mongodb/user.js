const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userTemplate = new Schema({
  _id: String,
  username: String,
  password: String,
  documents: Array,
  theme: Object
});

var User = mongoose.model('user-data', userTemplate);
module.exports = User;