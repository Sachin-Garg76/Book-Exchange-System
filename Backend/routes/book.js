const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

const auth = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
const upload = require("../middleware/upload");

router.post("/add", auth, upload.single("image"), async (req, res) => {
  try {
    // 🔍 DEBUG LOGS
    console.log("FILE 👉", req.file);
    console.log("BODY 👉", req.body);

    const newBook = new Book({
      bookName: req.body.bookName,
      author: req.body.author,
      condition: req.body.condition,
      description: req.body.description,
      image: req.file ? req.file.filename : "",
      user: req.user.id
    });

    await newBook.save();

    res.json({ message: "Book Added ✅", book: newBook });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("user", "email");
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ Get My Books
router.get("/my-books/:userId", async (req, res) => {
  try {
    const books = await Book.find({ user: req.params.userId });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;