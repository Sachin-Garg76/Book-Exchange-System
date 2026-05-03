const express = require("express");
const router = express.Router();
const Exchange = require("../models/Exchange");
const Book = require("../models/Book");
const auth = require("../middleware/authMiddleware"); // ✅ ADD

// ✅ Send Exchange Request (FIXED)
router.post("/request", auth, async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // ❌ apni book pe request na bheje
    if (book.user.toString() === req.user.id) {
      return res.status(400).json({ msg: "You can't request your own book" });
    }

    // ❌ duplicate request check
    const alreadyRequested = await Exchange.findOne({
      book: bookId,
      requester: req.user.id
    });

    if (alreadyRequested) {
      return res.status(400).json({ msg: "Already requested" });
    }

    // ✅ create request
    const newExchange = new Exchange({
      book: book._id,
      owner: book.user,        // 👈 auto
      requester: req.user.id   // 👈 auto
    });

    await newExchange.save();

    res.json({ msg: "Request Sent ✅", exchange: newExchange });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ Get requests received (LOGIN USER ke liye)
router.get("/received", auth, async (req, res) => {
  try {
    const requests = await Exchange.find({ owner: req.user.id })
      .populate("book")
      .populate("requester", "name email");

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Accept Request
router.put("/accept/:id", auth, async (req, res) => {
  try {
    const updated = await Exchange.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );

    res.json({ msg: "Accepted ✅", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Reject Request
router.put("/reject/:id", auth, async (req, res) => {
  try {
    const updated = await Exchange.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.json({ msg: "Rejected ❌", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;