const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: String,
  body: String,
  image: String,
  likes: Number,
});

module.exports = mongoose.model("Message", MessageSchema);
