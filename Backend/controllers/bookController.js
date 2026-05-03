const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
};

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};