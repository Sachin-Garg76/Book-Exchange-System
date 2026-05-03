const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const Book = require("../models/Book");
const auth = require("../middleware/authMiddleware");

// 🔹 Send Request
router.post("/request", auth, async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ msg: "Book not found" });

    const newRequest = new Request({
      book: bookId,
      sender: req.user.id,
      receiver: book.user
    });

    await newRequest.save();

    res.json({ msg: "Request Sent ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Get Requests (received)
router.get("/received", auth, async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.user.id })
      .populate("book")
      .populate("sender", "name email");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Update Request (accept/reject)
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;