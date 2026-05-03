const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  condition: String,
  description: String,
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Book", bookSchema);